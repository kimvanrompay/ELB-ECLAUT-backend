import type {Knex} from 'knex';

import {
	DatabaseDeleteError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import {RefreshToken, type RefreshTokenDBType} from '@lib/models/refresh-token';

import type {IRefreshTokenRepository} from './refresh-token.repository.types';

class RefreshTokenRepository implements IRefreshTokenRepository {
	constructor(private db: Knex) {}

	async getRefreshTokenById(id: string) {
		try {
			const refreshToken = await this.db<RefreshTokenDBType>('refresh_token')
				.where('id', id)
				.first();

			if (!refreshToken) {
				return undefined;
			}

			return RefreshToken.fromDBType(refreshToken);
		} catch (e) {
			console.error(e);
			throw new DatabaseRetrieveError('Error getting refresh token');
		}
	}

	async deleteRefreshTokenByToken(id: string) {
		try {
			await this.db<RefreshTokenDBType>('refresh_token')
				.where('id', id)
				.delete();
		} catch (e) {
			console.error(e);
			throw new DatabaseDeleteError('Error deleting refresh token');
		}
	}

	async updateRefreshTokenUsageCount(id: string) {
		try {
			const result = await this.db<RefreshTokenDBType>('refresh_token')
				.where('id', id)
				.increment('usage_count', 1);

			if (result === 0) {
				throw new Error();
			}
		} catch {
			throw new DatabaseUpdateError('Error updating refresh token');
		}
	}

	async invalidateAllRefreshTokensForUser(userId: string) {
		try {
			await this.db<RefreshTokenDBType>('refresh_token')
				.where('user_id', userId)
				.andWhere('usage_count', 0)
				.update({
					usage_count: 1,
				});
		} catch (e) {
			console.error(e);
			throw new DatabaseUpdateError('Error invalidating refresh tokens');
		}
	}

	async createRefreshToken(refreshToken: RefreshToken) {
		try {
			await this.db<RefreshTokenDBType>('refresh_token').insert({
				id: refreshToken.id,
				user_id: refreshToken.userId,
				usage_count: refreshToken.usageCount,
				created_at: refreshToken.createdAt,
			});
		} catch (e) {
			console.error(e);
			throw new DatabaseRetrieveError('Error inserting refresh token');
		}
	}
}

export {RefreshTokenRepository};
