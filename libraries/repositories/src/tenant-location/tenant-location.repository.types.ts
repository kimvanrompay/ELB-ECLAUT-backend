import type {Knex} from 'knex';

import type {
	TenantLocation,
	TenantLocationDBType,
	TenantLocationInsertDBType,
	TenantLocationUpdateDBType,
} from '@lib/models/tenant-location';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface ITenantLocationRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): ITenantLocationRepository;

	// Add the missing methods here

	findTenantLocations(
		filters: DatabaseQueryFilters,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation[]>;

	countTenantLocations(
		filters: DatabaseQueryFilters,
		loggedInTenantId: string | undefined
	): Promise<number>;

	findTenantLocationsByUserId(
		userId: string,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation[]>;

	findTenantLocationsByClientId(
		clientId: string,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation[]>;

	findTenantLocationsByUserIdForUpdate(
		userId: string,
		loggedInTenantId: string | undefined
	): Promise<Omit<TenantLocationDBType, 'tenant_name'>[]>;

	getTenantLocationById(
		locationId: string,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation | undefined>;

	createTenantLocation(
		location: TenantLocationInsertDBType
	): Promise<TenantLocation>;

	updateTenantLocation(
		locationId: string,
		location: TenantLocationUpdateDBType,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation>;

	updateUserTenantLocations(
		userId: string,
		locationIds: string[],
		loggedInTenantId: string | undefined
	): Promise<void>;

	inactivateTenantLocation(
		locationId: string,
		loggedInTenantId: string | undefined
	): Promise<void>;

	createTenantLocation(
		location: TenantLocationInsertDBType
	): Promise<TenantLocation>;

	addUserToTenantLocation(
		userId: string,
		locationId: string,
		loggedInTenantId: string | undefined
	): Promise<void>;

	addUserToTenantLocations(
		userId: string,
		locationIds: string[],
		loggedInTenantId: string | undefined
	): Promise<void>;

	removeUserFromTenantLocation(
		userId: string,
		locationId: string,
		loggedInTenantId: string | undefined
	): Promise<void>;

	removeUserFromTenantLocations(
		userId: string,
		locationIds: string[],
		loggedInTenantId: string | undefined
	): Promise<void>;
}

export type {ITenantLocationRepository};
