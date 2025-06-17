import type {Knex} from 'knex';

import {
	type PasswordResetToken,
	type PasswordResetTokenDBType,
} from '@lib/models/password-reset-token';

import type {IKnexRepository} from '../internal-types';

interface IPasswordResetTokenRepository extends IKnexRepository {
	withTransaction(transaction: Knex.Transaction): IPasswordResetTokenRepository;

	createPasswordResetToken(
		token: PasswordResetTokenDBType
	): Promise<PasswordResetToken>;

	getPasswordResetToken(email: string): Promise<PasswordResetToken | undefined>;

	removeExpiredPasswordResetTokens(): Promise<void>;

	deleteUserPasswordResetToken(email: string): Promise<void>;
}

export type {IPasswordResetTokenRepository};
