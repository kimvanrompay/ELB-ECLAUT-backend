import type {Knex} from 'knex';

import {
	DatabaseDeleteError,
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import {
	MachineMessage,
	type MachineMessageDBType,
} from '@lib/models/machine-message';
import {PinoLogger} from '@lib/utils';

import {KnexRepository} from '../knex-repository';

// TODO: Change the repo to use Redis instead of SQL

class MachineMessageRepository extends KnexRepository {
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('machine-message-repository', db, context);
	}

	override withTransaction(trx: Knex): MachineMessageRepository {
		return new MachineMessageRepository(trx, {logger: this.logger});
	}

	async findMachineMessageById(
		id: string
	): Promise<MachineMessage | undefined> {
		try {
			const result = await this.db
				.select<MachineMessageDBType[]>('*')
				.from('machine_message')
				.where({id: id})
				.first();

			return result
				? MachineMessage.fromMachineMessageDBType(result)
				: undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError(
				`Error retrieving machine message with id: ${id}`
			);
		}
	}

	async createMachineMessage(
		message: MachineMessage
	): Promise<MachineMessage | undefined> {
		try {
			const result = await this.db('machine_message')
				.insert(message.toDBType())
				.returning<MachineMessageDBType[]>('*');

			return result?.[0]
				? MachineMessage.fromMachineMessageDBType(result[0])
				: undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseInsertError(
				`Error creating machine message for machine serial_number: ${message.serial_number}, playfield: ${message.playfieldId}, and message: ${message}`
			);
		}
	}

	async updateMachineMessage(
		id: string,
		status: number
	): Promise<MachineMessage | undefined> {
		try {
			const result = await this.db
				.update({status: status})
				.from('machine_message')
				.where({id: id})
				.returning<MachineMessageDBType[]>('*');

			return result?.[0]
				? MachineMessage.fromMachineMessageDBType(result[0])
				: undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseUpdateError(
				`Error updating machine message with id: ${id}`
			);
		}
	}

	async clearMachineMessages(
		before: Date,
		status: string = 'done'
	): Promise<void> {
		try {
			return this.db
				.delete()
				.from('machine_message')
				.where('created_at', '<', before)
				.andWhere('status', status)
				.then(() => {});
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseDeleteError(
				`Error clearing machine messages before: ${before}`
			);
		}
	}

	async clearMachineMessageById(id: string): Promise<void> {
		try {
			return this.db
				.delete()
				.from('machine_message')
				.where({id: id})
				.then(() => {});
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseDeleteError(
				`Error clearing machine message with id: ${id}`
			);
		}
	}
}

export {MachineMessageRepository};
