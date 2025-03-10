interface IEmailService {
	sendEmail(options: {
		to: string[];
		subject: string;
		template: string;
		data: Record<string, unknown>;
		cc?: string[];
		bcc?: string[];
		replyTo?: string;
	}): Promise<void>;
}

export type {IEmailService};
