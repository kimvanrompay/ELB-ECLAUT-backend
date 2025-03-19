import type {Knex} from 'knex';

import {DatabaseRetrieveError} from '@lib/errors';
import {Machine} from '@lib/models/machine';
import {PinoLogger} from '@lib/utils';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IPlayfieldRepository} from '../playfield/playfield.repository.types';
import type {IMachineRepository} from './machine.repository.types';

class MachineRepository extends KnexRepository implements IMachineRepository {
	constructor(
		db: Knex,
		private playfieldRepository: IPlayfieldRepository,
		context: {logger: PinoLogger}
	) {
		super('machine-repository', db, context);
		this.playfieldRepository = playfieldRepository;
	}

	withTransaction(trx: Knex.Transaction): MachineRepository {
		return new MachineRepository(
			trx,
			this.playfieldRepository.withTransaction(trx),
			{
				logger: this.logger,
			}
		);
	}

	async findMachines(
		filters: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Machine[]> {
		try {
			// TODO: gametypes that should return cabinet instead of the playfields (ex. GoT)
			// Since it will be paginated, it needs to be done in one call

			const playfields = await this.playfieldRepository.findPlayfields(
				filters,
				tenantId,
				locationIds
			);

			return Machine.fromPlayfield(playfields);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Error finding machines');
		}
	}
}

export {MachineRepository};
