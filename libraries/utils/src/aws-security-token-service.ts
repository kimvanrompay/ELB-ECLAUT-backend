import {
	type Credentials,
	GetFederationTokenCommand,
	STSClient,
} from '@aws-sdk/client-sts';

const getAwsStsClient = (credentials: {
	accessKeyId: string;
	secretAccessKey: string;
}) => {
	return new STSClient({
		region: process.env.AWS_REGION,
		profile: process.env.AWS_PROFILE,
		credentials: {
			accessKeyId: credentials.accessKeyId,
			secretAccessKey: credentials.secretAccessKey,
		},
	});
};

const getTemporaryCredentials = async (
	awsStsClient: STSClient,
	policy: any,
	roleName: string,
	durationSeconds?: number
): Promise<Credentials | undefined> => {
	const res = await awsStsClient.send(
		new GetFederationTokenCommand({
			Name: roleName,
			Policy: JSON.stringify(policy),
			DurationSeconds: durationSeconds,
		})
	);
	return res.Credentials;
};

const createMqttPolicy = (
	topicsToSubscribe: string[],
	topicsToPublish: string[]
) => {
	const hasPublishTopic = topicsToPublish.length > 0;

	return {
		Version: '2012-10-17',
		Statement: [
			{
				Effect: 'Allow',
				Action: ['iot:Connect'],
				Resource: [
					`arn:aws:iot:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:client/*`,
				],
			},
			{
				Effect: 'Allow',
				Action: ['iot:Subscribe'],
				Resource: topicsToSubscribe
					.map((topic) => [
						`arn:aws:iot:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:topicfilter/${topic}`,
					])
					.flat(1),
			},
			{
				Effect: 'Allow',
				Action: ['iot:Receive'],
				Resource: topicsToSubscribe
					.map((topic) => [
						`arn:aws:iot:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:topic/${topic}`,
					])
					.flat(1),
			},
			...(hasPublishTopic
				? [
						{
							Effect: 'Allow',
							Action: ['iot:Publish'],
							Resource: topicsToPublish
								.map((topic) => [
									`arn:aws:iot:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:topic/${topic}`,
								])
								.flat(1),
						},
					]
				: []),
		],
	};
};

export {getAwsStsClient, getTemporaryCredentials, createMqttPolicy};
