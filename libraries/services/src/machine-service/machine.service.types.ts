import type {Machine, MachineCreateDTOType} from '@lib/models/machine';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

interface IMachineService {
	findMachines(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Machine[]>;

	findPaginatedMachines(
		filters: PaginatedDatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<{
		entries: Machine[];
		totalEntries: number;
	}>;

	createMachine(machine: MachineCreateDTOType): Promise<Machine>;
}

export type {IMachineService};
