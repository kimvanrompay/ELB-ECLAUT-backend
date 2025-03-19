import type {Knex} from 'knex';

import type {Gametype} from '@lib/models/gametype';
import type {
	GametypeInsertDBType,
	GametypeUpdateDBType,
} from '@lib/models/gametype';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IGametypeRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IGametypeRepository;

	// Add the missing methods here

	findGametypes(filters: DatabaseQueryFilters): Promise<Gametype[]>;

	getGametypeById(id: string): Promise<Gametype | undefined>;

	getGametypeByIdForUpdate(id: string): Promise<Gametype | undefined>;

	createGametype(gametype: GametypeInsertDBType): Promise<Gametype>;

	updateGametype(id: string, gametype: GametypeUpdateDBType): Promise<Gametype>;
}

export type {IGametypeRepository};
