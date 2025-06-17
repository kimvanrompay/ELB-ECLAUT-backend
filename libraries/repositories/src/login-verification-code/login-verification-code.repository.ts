import type {Knex} from 'knex';

import {DatabaseInsertError, DatabaseRetrieveError} from '@lib/errors';
import {
	LoginVerificationCode,
	type LoginVerificationCodeDBType,
} from '@lib/models/login-verification-code';
import {PinoLogger} from '@lib/utils';

import type {ILoginVerificationCodeRepository} from './login-verification-code.repository.types';

const LOGGER = new PinoLogger(
	{
		name: 'LoginVerificationCodeRepository',
	},
	{}
);

class LoginVerificationCodeRepository
	implements ILoginVerificationCodeRepository
{
	constructor(private db: Knex) {}

	async createLoginVerificationCode(
		verificationCode: LoginVerificationCodeDBType
	): Promise<LoginVerificationCode> {
		try {
			await this.db('login_verification_code').insert(verificationCode);

			const loginVerificationCode = await this.getLoginVerificationCode(
				verificationCode.email,
				verificationCode.code
			);

			if (!loginVerificationCode) {
				throw new Error('login verification code not found');
			}

			return loginVerificationCode;
		} catch (e) {
			LOGGER.error(e);
			throw new DatabaseInsertError('Error creating login verification code');
		}
	}

	async getLoginVerificationCode(
		email: string,
		code: string
	): Promise<LoginVerificationCode | undefined> {
		try {
			const result = await this.db<LoginVerificationCodeDBType>(
				'login_verification_code'
			)
				.where({code})
				.first();

			if (!result) {
				return undefined;
			}

			return LoginVerificationCode.fromDBType(result);
		} catch (e) {
			LOGGER.error(e);
			throw new DatabaseRetrieveError('Error getting login verification code');
		}
	}

	async findValidLoginVerificationCodes(
		email: string
	): Promise<LoginVerificationCode[]> {
		try {
			const results = await this.db<LoginVerificationCodeDBType>(
				'login_verification_code'
			)
				.where('email', email)
				.where('expires_at', '>', new Date().toISOString());

			return results.map(LoginVerificationCode.fromDBType);
		} catch (e) {
			LOGGER.error(e);
			throw new DatabaseRetrieveError(
				'Error getting valid login verification codes'
			);
		}
	}

	async removeExpiredLoginVerificationCodes(): Promise<void> {
		const result = await this.db('login_verification_code')
			.where('expires_at', '<', new Date().toISOString())
			.delete();

		console.debug(`Removed ${result} expired login verification codes`);
	}

	async deleteUserLoginVerificationCodes(email: string): Promise<void> {
		await this.db('login_verification_code').where({email}).delete();
	}
}

export {LoginVerificationCodeRepository};
