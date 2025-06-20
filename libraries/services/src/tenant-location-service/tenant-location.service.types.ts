import type {
	TenantLocation,
	TenantLocationCreateDTOType,
	TenantLocationUpdateDTOType,
} from '@lib/models/tenant-location';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface ITenantLocationService {
	findTenantLocations(filters: DatabaseQueryFilters): Promise<TenantLocation[]>;

	findTenantLocationsByUserId(userId: string): Promise<TenantLocation[]>;

	getTenantLocationById(
		locationId: string
	): Promise<TenantLocation | undefined>;

	createTenantLocation(
		location: TenantLocationCreateDTOType
	): Promise<TenantLocation>;

	updateTenantLocation(
		locationId: string,
		location: TenantLocationUpdateDTOType
	): Promise<TenantLocation>;

	inactivateTenantLocation(locationId: string): Promise<void>;
}

export type {ITenantLocationService};
