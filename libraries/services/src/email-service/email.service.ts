import {PinoLogger} from '@lib/utils';

import type {AppContext} from '../types';
import type {IEmailService} from './email.service.types';

// TODO: Implement email service

class EmailService implements IEmailService {
	private readonly logger: PinoLogger;

	constructor(private readonly context: AppContext) {
		this.logger = context.logger.getChildLogger(
			{
				name: 'email-service',
			},
			{}
		);
	}

	async sendEmail(options: {
		to: string[];
		subject: string;
		template: string;
		data: Record<string, unknown>;
		cc?: string[];
		bcc?: string[];
		replyTo?: string;
	}): Promise<void> {
		this.logger.info(
			`Sending email to ${options.to.join(', ')} using template ${options.template}`
		);
	}
}

export {EmailService};
