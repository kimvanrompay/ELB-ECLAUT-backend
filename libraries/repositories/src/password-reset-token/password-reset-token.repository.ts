import type {Knex} from 'knex';

import {DatabaseInsertError, DatabaseRetrieveError} from '@lib/errors';
import {
	PasswordResetToken,
	type PasswordResetTokenDBType,
} from '@lib/models/password-reset-token';
import {PinoLogger} from '@lib/utils';

import {KnexRepository} from '../knex-repository';
import type {IPasswordResetTokenRepository} from './password-reset-token.repository.types';

class PasswordResetTokenRepository
	extends KnexRepository
	implements IPasswordResetTokenRepository
{
	constructor(db: Knex, context: {logger: PinoLogger}) {
		super('password-reset-token-repository', db, context);
	}

	override withTransaction(
		transaction: Knex.Transaction
	): IPasswordResetTokenRepository {
		return new PasswordResetTokenRepository(transaction, {
			logger: this.logger,
		});
	}

	async createPasswordResetToken(
		token: PasswordResetTokenDBType
	): Promise<PasswordResetToken> {
		const shouldWrapInTransaction = !this.db.isTransaction;

		try {
			const deleteAndInsert = async (trx: Knex.Transaction) => {
				await this.db('password_reset_token')
					.delete()
					.where({email: token.email});
				await this.db('password_reset_token').insert(token);
			};

			if (shouldWrapInTransaction) {
				await this.db.transaction(deleteAndInsert);
			} else {
				await deleteAndInsert(this.db as Knex.Transaction);
			}

			const dbToken = await this.getPasswordResetToken(token.email);

			if (!dbToken) {
				throw new Error('could not create a password reset token ');
			}

			return dbToken;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseInsertError('Error creating password reset token');
		}
	}

	async getPasswordResetToken(
		email: string
	): Promise<PasswordResetToken | undefined> {
		try {
			const result = await this.db<PasswordResetTokenDBType>(
				'password_reset_token'
			)
				.where({email})
				.first();

			if (!result) {
				return undefined;
			}

			return PasswordResetToken.fromDBType(result);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError(
				`Error getting password reset token for ${email}`
			);
		}
	}

	async removeExpiredPasswordResetTokens(): Promise<void> {
		const result = await this.db('password_reset_token')
			.where('expires_at', '<', new Date().toISOString())
			.delete();

		this.logger.debug(`Removed ${result} expired password reset tokens`);
	}

	async deleteUserPasswordResetToken(email: string): Promise<void> {
		await this.db('password_reset_token').where({email}).delete();
	}
}

export {PasswordResetTokenRepository};
