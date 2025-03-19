import type {Machine, MachineCreateDTOType} from '@lib/models/machine';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IMachineService {
	findMachines(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Machine[]>;

	createMachine(machine: MachineCreateDTOType): Promise<Machine>;
}

export type {IMachineService};
