import type {GameSession} from '@lib/models/game-session';
import type {IGameSessionRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';

class GameSessionService {
	private logger: PinoLogger;

	constructor(
		private gameSessionRepository: IGameSessionRepository,
		private context: AuthenticatedAppContext
	) {
		this.gameSessionRepository = gameSessionRepository;
		this.context = context;

		this.logger = context.logger.getChildLogger(
			{
				name: 'game-session-service',
			},
			{}
		);
	}

	private getTenantAndLocationFromContext() {
		const auth = this.context.auth;

		if (!auth) {
			return [undefined, undefined] as const;
		}

		return [
			AuthorizationService.isTenantBound(auth.role) ? auth.tenantId : undefined,
			AuthorizationService.isLocationBound(auth.role)
				? auth.locationIds
				: undefined,
		] as const;
	}

	async findGameSessions(
		filters?: DatabaseQueryFilters
	): Promise<GameSession[]> {
		return this.gameSessionRepository.findGameSessions(
			filters,
			...this.getTenantAndLocationFromContext()
		);
	}

	async findPaginatedGameSessions(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<{entries: GameSession[]; totalEntries: number}> {
		const [tenantId, locationIds] = this.getTenantAndLocationFromContext();

		const gameSessions = await this.gameSessionRepository.findGameSessions(
			filters,
			tenantId,
			locationIds
		);

		return {
			entries: gameSessions,
			totalEntries: gameSessions.length,
		};
	}

	async getGameSessionById(id: string): Promise<GameSession | undefined> {
		return this.gameSessionRepository.getGameSessionById(
			id,
			...this.getTenantAndLocationFromContext()
		);
	}

	async findPaginatedGameSessionsByPlayfieldId(
		playfieldId: string,
		filters: PaginatedDatabaseQueryFilters
	): Promise<{
		entries: GameSession[];
		totalEntries: number;
	}> {
		filters.where ??= [];
		filters.where.push({
			type: 'eq',
			value: playfieldId,
			columnName: 'game_session.playfield_id',
		});

		const [tenantId, locationIds] = this.getTenantAndLocationFromContext();

		const sessions = await this.gameSessionRepository.findGameSessions(
			filters,
			tenantId,
			locationIds
		);

		const count = await this.gameSessionRepository.countGameSessions(
			filters,
			tenantId,
			locationIds
		);

		return {
			entries: sessions,
			totalEntries: count,
		};
	}
}

export {GameSessionService};
