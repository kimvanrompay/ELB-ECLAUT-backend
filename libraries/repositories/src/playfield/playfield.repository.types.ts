import type {Knex} from 'knex';

import type {
	Playfield,
	PlayfieldInsertDBType,
	PlayfieldUpdateDBType,
} from '@lib/models/playfield';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IPlayfieldRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IPlayfieldRepository;

	findPlayfields(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield[]>;

	findPlayfieldsByCabinetId(
		cabinetId: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield[]>;

	getPlayfieldById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield | undefined>;

	updatePlayfield(
		playfieldId: string,
		playfield: PlayfieldUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield>;

	createPlayfield(playfield: PlayfieldInsertDBType): Promise<Playfield>;
}

export type {IPlayfieldRepository};
