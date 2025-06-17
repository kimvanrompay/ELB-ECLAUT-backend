import SendGridClient from '@sendgrid/client';
import SendGrid from '@sendgrid/mail';

class SendgridAdapter {
	constructor(apiKey: string) {
		SendGrid.setApiKey(apiKey);
		SendGridClient.setApiKey(apiKey);

		// TODO: need a pro license to create a subuser to set data residency
		// SendGridClient.setDataResidency('eu'); // Set data residency to EU

		SendGrid.setClient(SendGridClient);
	}

	async sendEmail(to: string | string[], subject: string, htmlContent: string) {
		try {
			const isSingleRecipient = typeof to === 'string' || to.length === 1;
			const result = await SendGrid.send(
				{
					to: to,
					from: 'no-reply@eclaut.com',
					subject: subject,
					html: htmlContent, // Assuming text is HTML content
				},
				!isSingleRecipient
			);

			if (result[0].statusCode !== 202) {
				throw new Error(`Failed to send email: ${result[0].body}`);
			}
		} catch (error) {
			throw new Error(`Failed to send email: ${error.message}`);
		}
	}
}

export {SendgridAdapter};
