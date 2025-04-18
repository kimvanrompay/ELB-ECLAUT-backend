import {v4 as uuid} from 'uuid';

import type {
	Gametype,
	GametypeCreateDTOType,
	GametypeUpdateDTOType,
} from '@lib/models/gametype';
import type {IGametypeRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import type {IGametypeService} from './gametype.service.types';

class GametypeService implements IGametypeService {
	constructor(
		private readonly gametypeRepository: IGametypeRepository,
		private readonly context: {
			logger: PinoLogger;
		}
	) {}

	async findGametypes(filters: DatabaseQueryFilters): Promise<Gametype[]> {
		return this.gametypeRepository.findGametypes(filters);
	}

	async findPaginatedGametypes(
		filters: PaginatedDatabaseQueryFilters
	): Promise<{entries: Gametype[]; totalEntries: number}> {
		const gametypes = await this.gametypeRepository.findGametypes(filters);
		const totalEntries = await this.gametypeRepository.countGametypes(filters);

		return {entries: gametypes, totalEntries};
	}

	async getGametypeById(id: string): Promise<Gametype | undefined> {
		return this.gametypeRepository.getGametypeById(id);
	}

	async createGametype(gametype: GametypeCreateDTOType): Promise<Gametype> {
		return this.gametypeRepository.createGametype({
			id: uuid(),
			description: gametype.description,
			name: gametype.name,
		});
	}

	async updateGametype(
		id: string,
		gametype: GametypeUpdateDTOType
	): Promise<Gametype> {
		return this.gametypeRepository.updateGametype(id, {
			description: gametype.description,
			name: gametype.name,
		});
	}
}

export {GametypeService};
