import type {
	Tenant,
	TenantCreateDTOType,
	TenantUpdateDTOType,
} from '@lib/models/tenant';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

interface ITenantService {
	getTenantById(tenantId: string): Promise<Tenant | undefined>;

	findTenants(filters: DatabaseQueryFilters): Promise<Tenant[]>;

	findPaginatedTenants(
		filters: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<Tenant>>;

	updateTenant(tenantId: string, tenant: TenantUpdateDTOType): Promise<Tenant>;

	createTenant(tenant: TenantCreateDTOType): Promise<Tenant>;
}

export type {ITenantService};
