import type {Credentials} from '@aws-sdk/client-sts';

import {MqttCredentialsModel} from '../../src/mqtt-credentials/mqtt-credentials.model';

describe('MqttCredentialsModel', () => {
	describe('Constructor', () => {
		it('Creates an instance with valid parameters', () => {
			const model = new MqttCredentialsModel(
				'id123',
				'secretKey',
				'token123',
				new Date()
			);
			expect(model.id).toBe('id123');
			expect(model.secretAccessKey).toBe('secretKey');
			expect(model.sessionToken).toBe('token123');
			expect(model.expirationDate).toBeInstanceOf(Date);
		});

		it('Creates an instance with undefined parameters', () => {
			const model = new MqttCredentialsModel('id123', 'secretKey');
			expect(model.sessionToken).toBeUndefined();
			expect(model.expirationDate).toBeUndefined();
		});
	});

	describe('fromAWSCredentials', () => {
		it('Throws an error when AWS credentials are invalid', () => {
			const invalidCredentials: Credentials = {
				AccessKeyId: '',
				SecretAccessKey: '',
				SessionToken: undefined,
				Expiration: undefined,
			};

			expect(() =>
				MqttCredentialsModel.fromAWSCredentials(invalidCredentials)
			).toThrow('Invalid AWS credentials');
		});

		it('Creates an instance from valid AWS credentials', () => {
			const validCredentials: Credentials = {
				AccessKeyId: 'awsId123',
				SecretAccessKey: 'awsSecretKey',
				SessionToken: 'awsToken123',
				Expiration: new Date(),
			};
			const model = MqttCredentialsModel.fromAWSCredentials(validCredentials);
			expect(model.id).toBe('awsId123');
			expect(model.secretAccessKey).toBe('awsSecretKey');
			expect(model.sessionToken).toBe('awsToken123');
			expect(model.expirationDate).toEqual(validCredentials.Expiration);
		});
	});

	describe('toJSON', () => {
		it('Returns a JSON representation', () => {
			const model = new MqttCredentialsModel('id123', 'secretKey', 'token123');
			const json = model.toJSON();
			expect(json).toEqual({
				id: 'id123',
				secretAccessKey: 'secretKey',
				sessionToken: 'token123',
			});
		});
	});
});
