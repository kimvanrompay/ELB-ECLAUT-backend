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
				this.db<GameSessionDBType>('game_session'),
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

	async countGameSessions(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(this.db('game_session'), {
				...filters,
				orderBy: undefined,
				limit: undefined,
				offset: undefined,
			})
				.count('game_session.id as count')
				.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return result?.count ? Number(result.count) : 0;
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
					ended_at: this.db.raw(
						'coalesce(game_session.ended_at, excluded.ended_at)'
					),
					started_at: this.db.raw(
						'coalesce(game_session.started_at, excluded.started_at)'
					),
					result: this.db.raw('coalesce(game_session.result, excluded.result)'),
					amount_money_out: this.db.raw(
						`coalesce(game_session.amount_money_out, excluded.amount_money_out)`
					),
					amount_credits: this.db.raw(
						`coalesce(game_session.amount_credits, 0) + excluded.amount_credits`
					),
					amount_money_in: this.db.raw(
						`coalesce(game_session.amount_money_in, 0) + excluded.amount_money_in`
					),
					payment_method: this.db.raw(
						`coalesce(game_session.payment_method, excluded.payment_method)`
					),
					prize_id: this.db.raw(
						`coalesce(game_session.prize_id, excluded.prize_id)`
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

	async findGameSessionsByPlayfieldIdBetweenDates(
		playfieldId: string,
		startDate: Date,
		endDate: Date,
		tenantId?: string,
		locationIds?: string[]
	): Promise<GameSession[]> {
		try {
			const query = this.db<GameSessionDBType>('game_session')
				.where('playfield_id', playfieldId)
				.andWhereBetween('ended_at', [startDate, endDate]);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return GameSession.fromDBType(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve game sessions for playfield'
			);
		}
	}

	async getGameStatisticsByPlayfieldIdBetweenDates(
		playfieldId: string,
		startDate: Date,
		endDate: Date,
		tenantId?: string,
		locationIds?: string[]
	) {
		try {
			const query = this.db<GameSessionDBType>('game_session')
				.select(
					this.db.raw(
						'coalesce(game_session.ended_at, game_session.started_at)::date as date'
					),
					this.db.raw('count(*) as total_sessions'),
					this.db.raw('sum(amount_money_in) as total_money_in'),
					this.db.raw('avg(amount_money_in) as avg_money_in'),
					this.db.raw('min(amount_money_in) as min_money_in'),
					this.db.raw('max(amount_money_in) as max_money_in'),
					this.db.raw('sum(amount_money_out) as total_money_out'),
					this.db.raw('avg(amount_money_out) as avg_money_out'),
					this.db.raw('min(amount_money_out) as min_money_out'),
					this.db.raw('max(amount_money_out) as max_money_out'),
					this.db.raw('sum(amount_credits) as total_credits'),
					this.db.raw('avg(amount_credits) as avg_credits'),
					this.db.raw('min(amount_credits) as min_credits'),
					this.db.raw('max(amount_credits) as max_credits'),
					this.db.raw(
						'avg(extract(epoch from (ended_at - started_at))) as avg_session_duration'
					),
					this.db.raw(
						'min(extract(epoch from (ended_at - started_at))) as min_session_duration'
					),
					this.db.raw(
						'max(extract(epoch from (ended_at - started_at))) as max_session_duration'
					)
				)
				.where('playfield_id', playfieldId)
				.andWhereBetween('ended_at', [startDate, endDate])
				.orderBy('date', 'asc')
				.groupByRaw(
					`coalesce(game_session.ended_at, game_session.started_at)::date`
				);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return result;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve game statistics for playfield'
			);
		}
	}
}

export {GameSessionRepository};
