import {readFile} from 'fs/promises';
import Handlebars from 'handlebars';
import {resolve} from 'path';

import {PinoLogger} from '@lib/utils';
import {getEnvVariable} from '@lib/utils/env';

import type {AppContext} from '../types';
import type {
	EmailTemplateDataByTemplateName,
	IEmailService,
} from './email.service.types';
import {SendgridAdapter} from './sendgrid-adapter';

Handlebars.registerHelper('eq', (a: any, b: any) => a === b);

const subjectsByTemplateName: Record<
	keyof EmailTemplateDataByTemplateName,
	Record<string, string>
> = {
	'login-code': {
		en: 'Your Login Code',
		de: 'Ihr Anmeldecode',
		fr: 'Votre code de connexion',
		nl: 'Uw inlogcode',
	},
	'password-reset': {
		en: 'Password Reset Request',
		de: 'Passwort-Zurücksetzung',
		fr: 'Demande de réinitialisation du mot de passe',
		nl: 'Wachtwoord reset aanvraag',
	},
	'preventive-block': {
		en: 'Account Temporarily Suspended',
		de: 'Konto vorübergehend gesperrt',
		fr: 'Compte temporairement suspendu',
		nl: 'Account tijdelijk geblokkeerd',
	},
	'login-notification': {
		en: 'New Login',
		de: 'Neuer Login',
		fr: 'Nouvelle connexion',
		nl: 'Nieuwe login',
	},
	'password-changed': {
		en: 'Password Changed',
		de: 'Passwort geändert',
		fr: 'Mot de passe changé',
		nl: 'Wachtwoord gewijzigd',
	},
	'invite-user': {
		en: 'You have been invited to join',
		de: 'Sie wurden eingeladen, beizutreten',
		fr: 'Vous avez été invité à rejoindre',
		nl: 'U bent uitgenodigd om lid te worden van',
	},
};

class EmailService implements IEmailService {
	private readonly logger: PinoLogger;

	private sendgrid: SendgridAdapter;

	private simpleTemplateCache: Record<string, Handlebars.TemplateDelegate> = {};

	constructor(private readonly context: AppContext) {
		this.logger = context.logger.getChildLogger(
			{
				name: 'email-service',
			},
			{}
		);
		const key = getEnvVariable(
			'SENDGRID_API_KEY',
			'SENDGRID_API_KEY is not set'
		);
		console.log(`Sendgrid API Key: ${key}`);

		this.sendgrid = new SendgridAdapter(
			getEnvVariable('SENDGRID_API_KEY', 'SENDGRID_API_KEY is not set')
			// this.logger
		);
	}

	private async getTemplateFile(templateName: string) {
		try {
			const __dirname = import.meta.dirname;

			return await readFile(
				resolve(__dirname, 'templates', `${templateName}.html`),
				'utf-8'
			);
		} catch (error) {
			this.logger.error(
				`Error reading template file ${templateName}: ${error}`
			);
			throw new Error(`Template file ${templateName} not found`);
		}
	}

	private compileTemplate(template: string) {
		return Handlebars.compile(template);
	}

	private async getTemplate(templateName: string) {
		if (this.simpleTemplateCache[templateName]) {
			return this.simpleTemplateCache[templateName];
		}

		const templateFile = await this.getTemplateFile(templateName);
		const compiledTemplate = this.compileTemplate(templateFile);
		this.simpleTemplateCache[templateName] = compiledTemplate;

		return compiledTemplate;
	}

	async sendEmail<Name extends keyof EmailTemplateDataByTemplateName>(options: {
		to: string[];
		subject?: string;
		template: Name;
		data: EmailTemplateDataByTemplateName[Name];
		cc?: string[];
		bcc?: string[];
		replyTo?: string;
	}): Promise<void> {
		try {
			const template = await this.getTemplate(options.template);

			const htmlContent = template(options.data);

			this.logger.info(
				`Sending email to ${options.to.join(', ')} using template ${options.template}`
			);

			const language = options.data.language || 'en';
			const subject = (options.subject ||
				subjectsByTemplateName[options.template][language] ||
				subjectsByTemplateName[options.template]['en']) as string;

			console.log(`Email subject: ${subject}`);

			await this.sendgrid.sendEmail(options.to, subject, htmlContent);
		} catch (error) {
			this.logger.error(`Failed to send email: ${error}`);
			throw new Error(`Failed to send email: ${error}`);
		}
	}
}

export {EmailService};
