import {type Knex} from 'knex';

import {DatabaseInsertError, DatabaseRetrieveError} from '@lib/errors';
import {
	GameSession,
	type GameSessionDBType,
	type GameSessionInsertDBType,
} from '@lib/models/game-session';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IGameSessionRepository} from './game-session.repository.types';

class GameSessionRepository
	extends KnexRepository
	implements IGameSessionRepository
{
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('game-session-repository', db, context);
	}

	override withTransaction(trx: Knex.Transaction): GameSessionRepository {
		return new GameSessionRepository(trx, {
			logger: this.logger,
		});
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		if (tenantId) {
			query.where('tenant_id', tenantId);
		}

		if (locationIds && locationIds.length > 0) {
			query.whereIn('location_id', locationIds);
		}

		return query;
	}

	async findGameSessions(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<GameSession[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.db<GameSessionDBType>('game_sessios'),
				filters
			);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return GameSession.fromDBType(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve game sessions');
		}
	}

	async getGameSessionById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<GameSession | undefined> {
		try {
			const query = this.db<GameSessionDBType>('game_session')
				.where('game_session.id', id)
				.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (!result) {
				return undefined;
			}

			return GameSession.fromDBType(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve game session');
		}
	}

	async createOrUpdateGameSession(
		gameSession: GameSessionInsertDBType
	): Promise<GameSession> {
		try {
			const result = await this.db<GameSessionDBType>('game_session')
				.insert(gameSession)
				.onConflict(['id'])
				.merge({
					updated_at: new Date(),
					ended_at: this.db.raw('excluded.ended_at'),
					started_at: this.db.raw(
						'coalesce(game_session.started_at, excluded.started_at)'
					),
					result: this.db.raw('excluded.result'),
					amount_money_out: this.db.raw(`excluded.amount_money_out`),
					amount_credits: this.db.raw(
						`game_session.amount_credits + excluded.amount_credits`
					),
					amount_money_in: this.db.raw(
						`game_session.amount_money_in + excluded.amount_money_in`
					),
				});

			if (result.length === 0) {
				throw new Error('Could not update or create game session');
			}

			const updatedGameSession = await this.getGameSessionById(gameSession.id);

			if (!updatedGameSession) {
				throw new Error('Could not find updated game session');
			}

			return updatedGameSession;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseInsertError('Could not update or create game session');
		}
	}
}

export {GameSessionRepository};
