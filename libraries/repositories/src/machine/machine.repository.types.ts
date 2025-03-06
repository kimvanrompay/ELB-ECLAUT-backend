import type {Machine, MachineUpdateDBType} from '@lib/models/machine';

export interface IMachineRepository {
	// TODO: Implement standard query parameter filters
	getMachines(): Promise<Machine[]>;

	getMachineById(id: string): Promise<Machine | undefined>;

	updateMachine(
		machineId: string,
		machine: MachineUpdateDBType
	): Promise<Machine>;
}
