import {SendMessageCommand, SQSClient} from '@aws-sdk/client-sqs';

class SqsSender {
	private client: SQSClient;

	constructor(options: {region: string; endpoint: string}) {
		this.client = new SQSClient({
			region: options.region,
			endpoint: options.endpoint,
		});
	}

	async sendMessage(queueUrl: string, messageBody: string) {
		const params = {
			QueueUrl: queueUrl,
			MessageBody: messageBody,
		};

		return await this.client.send(new SendMessageCommand(params));
	}
}

export {SqsSender};
