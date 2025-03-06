import {
	GetSecretValueCommand,
	SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

const AWS_REGION = process.env.AWS_REGION ?? 'eu-west-1';
const AWS_PROFILE = process.env.AWS_PROFILE ?? 'elaut';

let awsSecretClient: SecretsManagerClient;

const getAwsSecretClient = () => {
	if (!awsSecretClient) {
		awsSecretClient = new SecretsManagerClient({
			region: AWS_REGION,
			profile: AWS_PROFILE,
		});
	}
	return awsSecretClient;
};

const getAwsSecret = async <T>(secretKey: string): Promise<T> => {
	const secretManagerResponse = await getAwsSecretClient().send(
		new GetSecretValueCommand({SecretId: secretKey})
	);
	return JSON.parse(secretManagerResponse.SecretString as string);
};

export {getAwsSecret};
