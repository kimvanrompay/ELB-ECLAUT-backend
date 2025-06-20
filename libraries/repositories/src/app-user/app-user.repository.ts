import {type Knex} from 'knex';

import {
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import type {
	AppUserDBType,
	AppUserInsertDBType,
	AppUserUpdateDBType,
} from '@lib/models/app-user';
import {AppUser} from '@lib/models/app-user';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IAppUserRepository} from './app-user.repository.types';

class AppUserRepository extends KnexRepository implements IAppUserRepository {
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('app-user-repository', db, context);
	}

	public override withTransaction(trx: Knex) {
		return new AppUserRepository(trx, {logger: this.logger});
	}

	private withTenantAndLocations<T = AppUserDBType>(
		query: Knex.QueryBuilder<any, T>
	): Knex.QueryBuilder<any, T> {
		return query
			.select(
				'app_user.*',
				'tenant.name as tenant_name',
				this.db.raw(
					"coalesce(json_agg(app_user_tenant_location.tenant_location_id) filter ( where app_user_tenant_location.tenant_location_id is not null ), '[]') as location_ids"
				)
			)
			.join('tenant', 'app_user.tenant_id', 'tenant.id')
			.leftJoin(
				'app_user_tenant_location',
				'app_user.id',
				'app_user_tenant_location.user_id'
			)
			.groupBy('app_user.id', 'tenant.name');
	}

	private selectUserWithTenant<T = AppUserDBType>() {
		return this.withTenantAndLocations<T>(this.db('app_user'));
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		if (tenantId) {
			query.where('app_user.tenant_id', tenantId);
		}

		if (locationIds) {
			query
				.join(
					'app_user_location',
					'app_user.id',
					'app_user_location.app_user_id'
				)
				.whereIn('app_user_location.location_id', locationIds);
		}

		return query;
	}

	async findUsersByFilters(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser[]> {
		this.logger.trace(
			`Finding users by filters: ${JSON.stringify(
				filters
			)}, tenantId: ${tenantId}, locationIds: ${locationIds?.join(',')}`
		);

		try {
			const query = KnexFilterAdapter.applyFilters(
				this.selectUserWithTenant<AppUserDBType[]>(),
				filters
			);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return AppUser.fromDB(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Error retrieving users');
		}
	}

	async getUserById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser | undefined> {
		this.logger.trace(
			`Getting user with id: ${id}, tenantId: ${tenantId}, locationIds: ${locationIds?.join(',')}`
		);

		try {
			const query = this.selectUserWithTenant()
				.where({
					'app_user.id': id,
				})
				.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (!result) {
				return undefined;
			}

			return AppUser.fromDB(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Error retrieving user');
		}
	}

	async getUserByEmail(
		email: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser | undefined> {
		this.logger.trace(
			`Getting user with email: ${email}, tenantId: ${tenantId}, locationIds: ${locationIds?.join(',')}`
		);

		try {
			const query = this.selectUserWithTenant().where({email}).first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (!result) {
				return undefined;
			}

			return AppUser.fromDB(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Error retrieving user');
		}
	}

	async updateUser(
		id: string,
		user: AppUserUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<AppUser> {
		this.logger.trace(`Updating user with id: ${id}`);

		try {
			const query = this.db<AppUserDBType>('app_user').where({id}).update(user);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (result === 0) {
				throw new Error('Could not find user to update');
			}

			const updatedUser = await this.getUserById(id);

			if (!updatedUser) {
				throw new Error('Could not find updated user');
			}

			return updatedUser;
		} catch (error) {
			this.logger.error(
				`Error updating user with id: ${id}, error: ${error?.message}`
			);
			throw new DatabaseUpdateError('Error updating user');
		}
	}

	async createUser(user: AppUserInsertDBType): Promise<AppUser> {
		try {
			const result = await this.db<AppUserInsertDBType>('app_user')
				.insert(user)
				.returning('*');

			if (!result) {
				throw new Error('Could not create user');
			}

			const createdUser = await this.getUserById(user.id);

			if (!createdUser) {
				throw new Error('Could not find created user');
			}

			return createdUser;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseInsertError('Error creating user');
		}
	}

	async getUserByIdForUpdate(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Omit<AppUserDBType, 'location_ids' | 'tenant_name'> | undefined> {
		try {
			return await this.applyTenantAndLocationFilters(
				this.db<Omit<AppUserDBType, 'location_ids' | 'tenant_name'>>(
					'app_user'
				).where({id}),
				tenantId,
				locationIds
			)
				.first()
				.forUpdate();
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Error retrieving user');
		}
	}
}

export {AppUserRepository};
