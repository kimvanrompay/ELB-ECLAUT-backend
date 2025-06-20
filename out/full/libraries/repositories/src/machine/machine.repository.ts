import {Knex} from 'knex';

import {DatabaseRetrieveError} from '@lib/errors';
import {Machine, MachineDBType, MachineUpdateDBType} from '@lib/models/machine';

import {IMachineRepository} from './machine.repository.types';

class MachineRepository implements IMachineRepository {
	private db: Knex;

	constructor(db: Knex) {
		this.db = db;
	}

	async getMachines(): Promise<Machine[]> {
		try {
			const dbMachines = await this.db
				.select<MachineDBType[]>('*')
				.from('machine');

			return Machine.fromDBType(dbMachines);
		} catch (e) {
			console.error(e);
			throw new DatabaseRetrieveError(
				`Error retrieving machines from the database`
			);
		}
	}

	async getMachineById(id: string): Promise<Machine | undefined> {
		try {
			const dbMachine = await this.db
				.select<MachineDBType[]>('*')
				.from('machine')
				.where({id: id})
				.first();

			return dbMachine ? Machine.fromDBType(dbMachine) : undefined;
		} catch (e) {
			// TODO: Add logging
			console.error(e);
			throw new DatabaseRetrieveError(
				`Error retrieving machine with id ${id} from the database`
			);
		}
	}

	async updateMachine(
		machineId: string,
		machine: MachineUpdateDBType
	): Promise<Machine> {
		try {
			const dbMachines = await this.db
				.update(machine)
				.from('machine')
				.where({id: machineId})
				.returning<MachineDBType[]>('*');

			const dbMachine = dbMachines[0]!;

			return Machine.fromDBType(dbMachine);
		} catch (e) {
			console.error(e);
			throw new DatabaseRetrieveError(
				`Error updating machine with id ${machineId} in the database`
			);
		}
	}
}

export {MachineRepository};
