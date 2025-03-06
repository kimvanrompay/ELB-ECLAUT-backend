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

	async removeLoginVerificationCode(code: string): Promise<void> {
		await this.db('login_verification_code').where({code}).delete();
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

	async removeExpiredLoginVerificationCodes(): Promise<void> {
		await this.db('login_verification_code')
			.where('expires_at', '<', new Date().toISOString())
			.delete();
	}

	deleteLoginVerificationCode(email: string, code: string): Promise<void> {
		return this.db('login_verification_code').where({email, code}).delete();
	}
}

export {LoginVerificationCodeRepository};
