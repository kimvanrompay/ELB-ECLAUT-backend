import type {Knex} from 'knex';

import {
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import {
	Gametype,
	type GametypeDBType,
	type GametypeInsertDBType,
	type GametypeUpdateDBType,
} from '@lib/models/gametype';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IGametypeRepository} from './gametype.repository.types';

class GametypeRepository extends KnexRepository implements IGametypeRepository {
	// Add the missing methods here

	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('gametype-repository', db, context);
	}

	override withTransaction(trx: Knex): IGametypeRepository {
		return new GametypeRepository(trx, {logger: this.logger});
	}

	async findGametypes(filters: DatabaseQueryFilters): Promise<Gametype[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.db<GametypeDBType>('gametype'),
				filters
			);

			const result = await query;

			return Gametype.fromDB(result ?? []);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving game types');
		}
	}

	async getGametypeById(id: string): Promise<Gametype | undefined> {
		try {
			const result = await this.db<GametypeDBType>('gametype')
				.where({id})
				.first();

			return result ? Gametype.fromDB(result) : undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving game type');
		}
	}

	async getGametypeByIdForUpdate(id: string): Promise<Gametype | undefined> {
		try {
			const result = await this.db<GametypeDBType>('gametype')
				.where({id})
				.first()
				.forUpdate();

			return result ? Gametype.fromDB(result) : undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving game type');
		}
	}

	async createGametype(gametype: GametypeInsertDBType): Promise<Gametype> {
		try {
			await this.db<GametypeDBType>('gametype').insert(gametype);

			const result = await this.getGametypeById(gametype.id);

			if (!result) {
				throw new Error('Error creating game type');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseInsertError('Error creating game type');
		}
	}

	async updateGametype(
		id: string,
		gametype: GametypeUpdateDBType
	): Promise<Gametype> {
		try {
			await this.db<GametypeDBType>('gametype').where({id}).update(gametype);

			const result = await this.getGametypeById(id);

			if (!result) {
				throw new Error('Error updating game type');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseUpdateError('Error updating game type');
		}
	}
}

export {GametypeRepository};
