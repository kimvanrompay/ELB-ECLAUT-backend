import type {Credentials} from '@aws-sdk/client-sts';

import {
	MqttCredentialsSchema,
	type MqttCredentialsType,
} from './mqtt-credentials.schema';

class MqttCredentialsModel {
	id: string;
	secretAccessKey: string;
	sessionToken?: string;
	expirationDate?: Date;

	static schemas = {
		DTOSchema: MqttCredentialsSchema,
	};

	constructor(
		id: string,
		secretAccessKey: string,
		sessionToken?: string,
		expirationDate?: Date
	) {
		this.id = id;
		this.secretAccessKey = secretAccessKey;
		this.sessionToken = sessionToken;
		this.expirationDate = expirationDate;
	}

	static fromAWSCredentials(credentials: Credentials) {
		if (!credentials.AccessKeyId || !credentials.SecretAccessKey) {
			throw new Error('Invalid AWS credentials');
		}

		return new MqttCredentialsModel(
			credentials.AccessKeyId,
			credentials.SecretAccessKey,
			credentials.SessionToken,
			credentials.Expiration
		);
	}

	toJSON(): MqttCredentialsType {
		return {
			id: this.id,
			secretAccessKey: this.secretAccessKey,
			sessionToken: this.sessionToken,
		};
	}
}

export {MqttCredentialsModel};
