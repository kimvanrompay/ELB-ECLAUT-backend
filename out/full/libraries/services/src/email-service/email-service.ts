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

class StdOutEmailService implements IEmailService {
	async sendEmail(options: {
		to: string[];
		subject: string;
		template: string;
		data: Record<string, unknown>;
		cc?: string[];
		bcc?: string[];
		replyTo?: string;
	}): Promise<void> {
		console.log('Email sent to:', options.to);
	}
}
