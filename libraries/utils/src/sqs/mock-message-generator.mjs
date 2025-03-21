import {
	ListQueuesCommand,
	SendMessageCommand,
	SQSClient,
} from '@aws-sdk/client-sqs';

const client = new SQSClient({
	region: 'eu-west-1',
	endpoint: 'http://localhost:9324',
});

const checkIfQueueExists = async () => {};

const sendMessages = async () => {
	try {
		const queueUrl = 'http://localhost:9324/queue/machine-events';
		//number between 1 and 10
		const randomMessageCount = Math.floor(Math.random() * 10) + 1;
		const messageParams = {
			// MaxResults: 10,
			QueueUrl: queueUrl,
			MessageBody: JSON.stringify({
				id: 'fixed-test-id',
				mi: '000000000001',
				ts: Date.now(),
				tp: 'TEST',
				pl: "{'test': 'test'}",
			}),
		};

		const command = new SendMessageCommand(messageParams);

		const data = await client.send(command);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};

const getMessages = async () => {};

while (true) {
	// eslint-disable-next-line no-await-in-loop
	await new Promise((resolve) => setTimeout(resolve, 1));
	sendMessages();
}
