import type {Knex} from 'knex';

import {
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import {
	Cabinet,
	type CabinetDBType,
	type CabinetInsertDBType,
	type CabinetUpdateDBType,
	type CabinetWithPlayfieldsDBType,
} from '@lib/models/cabinet';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {ICabinetRepository} from './cabinet.repository.types';

class CabinetRepository extends KnexRepository implements ICabinetRepository {
	constructor(db: Knex, context: {logger: PinoLogger}) {
		super('cabinet-repository', db, context);
	}

	public withTransaction(trx: Knex.Transaction) {
		return new CabinetRepository(trx, {
			logger: this.logger,
		});
	}

	private withPlayfields<T = CabinetWithPlayfieldsDBType>(
		query: Knex.QueryBuilder<any, T>
	): Knex.QueryBuilder<any, T> {
		return query
			.select(
				'cabinet.*',
				this.db.raw(
					"coalesce(json_agg(row_to_json(playfield)) filter ( where playfield.serial_number is not null ), '[]') as playfields"
				)
			)
			.join('playfield', 'cabinet.serial_number', 'playfield.serial_number')
			.groupBy('cabinet.serial_number');
	}

	private selectCabinetWithPlayfields<T = CabinetWithPlayfieldsDBType>() {
		return this.withPlayfields<T>(this.db('cabinet'));
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		if (tenantId) {
			query.where('cabinet.tenant_id', tenantId);
		}

		if (locationIds) {
			query.whereIn('cabinet.tenant_location_id', locationIds);
		}

		return query;
	}

	async findCabinets(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.selectCabinetWithPlayfields<CabinetWithPlayfieldsDBType[]>(),
				filters
			);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return Cabinet.fromDBType(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve cabinets');
		}
	}

	async getCabinetById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet | undefined> {
		try {
			const query =
				this.selectCabinetWithPlayfields<CabinetWithPlayfieldsDBType>()
					.where('cabinet.serial_number', id)
					.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (!result) {
				return undefined;
			}

			return Cabinet.fromDBType(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve cabinet');
		}
	}

	async createCabinet(cabinet: CabinetInsertDBType): Promise<Cabinet> {
		try {
			await this.db<CabinetDBType>('cabinet')
				.insert(cabinet)
				.returning('*')
				.first();

			const created = await this.getCabinetById(cabinet.serial_number);

			if (!created) {
				throw new Error('Failed to create cabinet');
			}

			return created;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseInsertError('Could not create cabinet');
		}
	}

	async updateCabinet(
		serialNumber: string,
		cabinet: CabinetUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Cabinet> {
		try {
			const query = this.db<CabinetDBType>('cabinet')
				.where('cabinet.serial_number', serialNumber)
				.update(cabinet);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (result === 0) {
				throw new Error('Could not find cabinet to update');
			}

			const updated = await this.getCabinetById(serialNumber);

			if (!updated) {
				throw new Error('Could not find updated cabinet');
			}

			return updated;
		} catch (error) {
			this.logger.error(
				`Error updating cabinet with serial number: ${serialNumber}, error: ${error?.message}`
			);
			throw new DatabaseUpdateError('Error updating cabinet');
		}
	}
}

export {CabinetRepository};
