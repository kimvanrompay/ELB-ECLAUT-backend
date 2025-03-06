import type {Machine, MachineUpdateDTOType} from '@lib/models/machine';

interface IMachineService {
	getAllMachines(): Promise<Machine[]>;

	getMachineById(id: string): Promise<Machine>;

	updateMachine(
		machineId: string,
		machine: MachineUpdateDTOType
	): Promise<Machine>;
}

export type {IMachineService};
