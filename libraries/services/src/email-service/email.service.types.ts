interface EmailTemplateData {
	language: string;
	username: string;
}

interface LoginCodeTemplateData extends EmailTemplateData {
	code: string;
	loginLink: string;
}

interface PreventiveBlockTemplateData extends EmailTemplateData {
	supportEmail: string;
	adminEmail: string;
}

interface LoginNotificationTemplateData extends EmailTemplateData {
	loginTime: string;
}

interface PasswordResetTemplateData extends EmailTemplateData {
	resetLink: string;
}

interface PasswordChangedTemplateData extends EmailTemplateData {
	changeTime: string;
}

interface InviteUserTemplateData extends EmailTemplateData {
	inviterName: string;
	inviteLink: string;
	password?: string;
}

type EmailTemplateDataByTemplateName = {
	'login-code': LoginCodeTemplateData;
	'preventive-block': PreventiveBlockTemplateData;
	'login-notification': LoginNotificationTemplateData;
	'password-reset': PasswordResetTemplateData;
	'password-changed': PasswordChangedTemplateData;
	'invite-user': InviteUserTemplateData;
};

interface IEmailService {
	sendEmail<Name extends keyof EmailTemplateDataByTemplateName>(options: {
		to: string[];
		subject?: string;
		template: Name;
		data: EmailTemplateDataByTemplateName[Name];
		cc?: string[];
		bcc?: string[];
		replyTo?: string;
	}): Promise<void>;
}

export type {
	IEmailService,
	EmailTemplateDataByTemplateName,
	LoginCodeTemplateData,
	EmailTemplateData,
};
