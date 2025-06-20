import type {Knex} from 'knex';

import type {
	Tenant,
	TenantInsertDBType,
	TenantUpdateDBType,
} from '@lib/models/tenant';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface ITenantRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): ITenantRepository;

	findTenants(filters: DatabaseQueryFilters): Promise<Tenant[]>;

	countTenants(filters: DatabaseQueryFilters): Promise<number>;

	getTenantById(tenantId: string): Promise<Tenant | undefined>;

	createTenant(tenant: TenantInsertDBType): Promise<Tenant>;

	updateTenant(tenantId: string, tenant: TenantUpdateDBType): Promise<Tenant>;

	deleteTenant(tenantId: string): Promise<void>;
}

export type {ITenantRepository};
