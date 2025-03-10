import type {Knex} from 'knex';

import {
	AppUser,
	type AppUserDBType,
	type AppUserInsertDBType,
	type AppUserUpdateDBType,
} from '@lib/models/app-user';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IAppUserRepository {
	transaction<T>(
		transactionScope: (trx: Knex.Transaction) => Promise<T> | void,
		config?: Knex.TransactionConfig
	): Promise<T>;

	withTransaction(trx: Knex.Transaction): IAppUserRepository;

	findUsersByFilters(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser[]>;

	getUserById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser | undefined>;

	getUserByIdForUpdate(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Omit<AppUserDBType, 'location_ids' | 'tenant_name'> | undefined>;

	getUserByEmail(
		email: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser | undefined>;

	updateUser(
		id: string,
		user: AppUserUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser>;

	createUser(user: AppUserInsertDBType): Promise<AppUser>;
}

export type {IAppUserRepository};
