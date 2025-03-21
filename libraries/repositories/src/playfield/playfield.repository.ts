import type {Knex} from 'knex';

import {DatabaseInsertError, DatabaseRetrieveError} from '@lib/errors';
import {
	Playfield,
	type PlayfieldInsertDBType,
	type PlayfieldUpdateDBType,
	type PlayfieldWithCabinetDBType,
} from '@lib/models/playfield';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IPlayfieldRepository} from './playfield.repository.types';

class PlayfieldRepository
	extends KnexRepository
	implements IPlayfieldRepository
{
	constructor(db: Knex, context: {logger: PinoLogger}) {
		super('playfield-repository', db, context);
	}

	public override withTransaction(trx: Knex.Transaction) {
		return new PlayfieldRepository(trx, {
			logger: this.logger,
		});
	}

	private withCabinet<T = Playfield>(
		query: Knex.QueryBuilder<any, T>
	): Knex.QueryBuilder<any, T> {
		return query
			.select(
				'playfield.*',
				this.db.raw(`coalesce(row_to_json(cabinet),'{}') as cabinet`)
			)
			.join(
				this.db('cabinet')
					.select(
						'cabinet.*',
						this.db.raw(
							"coalesce(json_agg(row_to_json(playfield)) filter ( where playfield.serial_number is not null ), '[]') as playfields"
						)
					)
					.join('playfield', 'cabinet.serial_number', 'playfield.serial_number')
					.groupBy('cabinet.serial_number')
					.as('cabinet'),
				'playfield.serial_number',
				'cabinet.serial_number'
			);
	}

	private selectPlayfieldWithCabinet<T = Playfield>() {
		return this.withCabinet<T>(this.db('playfield'));
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		if (tenantId) {
			query.where('cabinet.tenant_id', tenantId);
		}

		if (locationIds && locationIds.length > 0) {
			query.whereIn('cabinet.tenant_location_id', locationIds);
		}

		return query;
	}

	async findPlayfields(filters: DatabaseQueryFilters): Promise<Playfield[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.selectPlayfieldWithCabinet<PlayfieldWithCabinetDBType[]>(),
				filters
			);

			const result = await this.applyTenantAndLocationFilters(query);

			return Playfield.fromDBTypeWithCabinet(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfields');
		}
	}

	async findPlayfieldsByCabinetId(
		serialNumber: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield[]> {
		try {
			const query = this.selectPlayfieldWithCabinet<
				PlayfieldWithCabinetDBType[]
			>().where('cabinet.serial_number', serialNumber);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return Playfield.fromDBTypeWithCabinet(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfields');
		}
	}

	async getPlayfieldById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield | undefined> {
		try {
			const query =
				this.selectPlayfieldWithCabinet<PlayfieldWithCabinetDBType>()
					.where('playfield.id', id)
					.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (!result) {
				return undefined;
			}

			return Playfield.fromDBTypeWithCabinet(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfield');
		}
	}

	async createPlayfield(playfield: PlayfieldInsertDBType): Promise<Playfield> {
		try {
			await this.db('playfield').insert(playfield).returning('*').first();

			const created = await this.getPlayfieldById(playfield.id);

			if (!created) {
				throw new Error('Failed to create playfield');
			}

			return created;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseInsertError('Could not create playfield');
		}
	}

	async updatePlayfield(
		playfieldId: string,
		playfield: PlayfieldUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield> {
		try {
			const query = this.db('playfield')
				.where('playfield.id', playfieldId)
				.update(playfield);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (result === 0) {
				throw new Error('Could not find playfield to update');
			}

			const updated = await this.getPlayfieldById(
				playfieldId,
				tenantId,
				locationIds
			);

			if (!updated) {
				throw new Error('Failed to update playfield');
			}

			return updated;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not update playfield');
		}
	}
}

export {PlayfieldRepository};
