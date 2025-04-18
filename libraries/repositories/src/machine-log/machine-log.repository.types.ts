import {Knex} from 'knex';

import type {MachineLog} from '@lib/models/machine-log';
import type {MachineLogInsertDBType} from '@lib/models/machine-log';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IMachineLogRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IMachineLogRepository;

	createMachineLog(
		log: MachineLogInsertDBType
	): Promise<MachineLog | undefined>;

	findMachineLogs(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<MachineLog[]>;

	findMachineLogsForCabinet(
		serialNumber: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<MachineLog[]>;

	findMachineLogsForPlayfield(
		playfieldId: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<MachineLog[]>;

	countMachineLogs(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number>;

	countMachineLogsForCabinet(
		serialNumber: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number>;

	countMachineLogsForPlayfield(
		playfieldId: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number>;
}

export type {IMachineLogRepository};
