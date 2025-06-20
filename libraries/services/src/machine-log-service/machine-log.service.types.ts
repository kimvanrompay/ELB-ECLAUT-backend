import type {MachineLog} from '@lib/models/machine-log';
import type {PaginatedDatabaseQueryFilters} from '@lib/utils/db/filters';

interface IMachineLogService {
	findPaginatedMachineLogsByPlayfieldId(
		playfieldId: string,
		filters: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<MachineLog>>;

	findPaginatedMachineLogsByCabinetSerialNumber(
		serialNumber: string,
		filters: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<MachineLog>>;
}

export type {IMachineLogService};
