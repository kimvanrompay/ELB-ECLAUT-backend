import type {Knex} from 'knex';

import {
	GameSession,
	type GameSessionInsertDBType,
} from '@lib/models/game-session';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IGameSessionRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IGameSessionRepository;

	createOrUpdateGameSession(
		gameSession: GameSessionInsertDBType
	): Promise<GameSession>;

	getGameSessionById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<GameSession | undefined>;

	findGameSessions(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<GameSession[]>;

	countGameSessions(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number>;
}

export type {IGameSessionRepository};
