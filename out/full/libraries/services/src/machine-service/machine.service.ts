import {NotFoundError} from '@lib/errors';
import {Machine, MachineUpdateDTOType} from '@lib/models/machine';
import {IMachineRepository} from '@lib/repositories/types';

import {IMachineService} from './machine.service.types';

class MachineService implements IMachineService {
	private machineRepository: IMachineRepository;

	constructor(machineRepository: IMachineRepository) {
		this.machineRepository = machineRepository;
	}

	public async getAllMachines(): Promise<Machine[]> {
		return this.machineRepository.getMachines();
	}

	public async getMachineById(id: string): Promise<Machine> {
		const machine = await this.machineRepository.getMachineById(id);

		if (!machine) {
			throw new NotFoundError(`Machine with id ${id} not found`);
		}

		return machine;
	}

	public async updateMachine(
		machineId: string,
		machine: MachineUpdateDTOType
	): Promise<Machine> {
		return this.machineRepository.updateMachine(machineId, machine);
	}
}

export {MachineService};
