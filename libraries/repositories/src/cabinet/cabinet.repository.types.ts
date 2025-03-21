import {Knex} from 'knex';

import type {
	Cabinet,
	CabinetInsertDBType,
	CabinetUpdateDBType,
} from '@lib/models/cabinet';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface ICabinetRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): ICabinetRepository;

	findCabinets(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet[]>;

	getCabinetById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet | undefined>;

	getCabinetByPlayfieldId(
		playfieldId: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet | undefined>;

	createCabinet(cabinet: CabinetInsertDBType): Promise<Cabinet>;

	updateCabinet(
		cabinetId: string,
		cabinet: CabinetUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet>;
}

export type {ICabinetRepository};
