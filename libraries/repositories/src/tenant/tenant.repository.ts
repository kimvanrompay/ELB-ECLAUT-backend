import type {Knex} from 'knex';

import {
	DatabaseDeleteError,
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
	NotFoundError,
} from '@lib/errors';
import {Tenant, type TenantDBType} from '@lib/models/tenant';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {ITenantRepository} from './tenant.repository.types';

class TenantRepository extends KnexRepository implements ITenantRepository {
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('tenant-repository', db, context);
	}

	override withTransaction(trx: Knex.Transaction) {
		return new TenantRepository(trx, {logger: this.logger});
	}

	async findTenants(filters: DatabaseQueryFilters): Promise<Tenant[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.db<TenantDBType>('tenant'),
				filters
			);

			const result = await query;

			return Tenant.fromDB(result ?? []);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenants');
		}
	}

	async countTenants(filters: DatabaseQueryFilters): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(this.db('tenant'), {
				...filters,
				limit: undefined,
				offset: undefined,
				orderBy: undefined,
			});

			const result = await query.count('* as count').first();

			return result?.count ? Number(result.count) : 0;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant count');
		}
	}

	async getTenantById(tenantId: string): Promise<Tenant | undefined> {
		try {
			const result = await this.db<TenantDBType>('tenant')
				.where({id: tenantId})
				.first();

			return result ? Tenant.fromDB(result) : undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant');
		}
	}

	async createTenant(tenant: TenantDBType): Promise<Tenant> {
		try {
			await this.db<TenantDBType>('tenant').insert(tenant).returning('*');

			const result = await this.getTenantById(tenant.id);

			if (!result) {
				throw new NotFoundError('Error retrieving tenant');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseInsertError('Error creating tenant');
		}
	}

	async updateTenant(tenantId: string, tenant: TenantDBType): Promise<Tenant> {
		try {
			await this.db<TenantDBType>('tenant')
				.where({id: tenantId})
				.update(tenant);

			const result = await this.getTenantById(tenantId);

			if (!result) {
				throw new NotFoundError('Error retrieving tenant');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseUpdateError('Error updating tenant');
		}
	}

	async deleteTenant(tenantId: string): Promise<void> {
		try {
			await this.db<TenantDBType>('tenant').where({id: tenantId}).delete();
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseDeleteError('Error deleting tenant');
		}
	}
}

export {TenantRepository};
