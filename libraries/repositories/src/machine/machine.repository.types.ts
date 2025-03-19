import type {Knex} from 'knex';

import type {Machine} from '@lib/models/machine';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IMachineRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IMachineRepository;

	findMachines(
		filters: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Machine[]>;
}

export type {IMachineRepository};
