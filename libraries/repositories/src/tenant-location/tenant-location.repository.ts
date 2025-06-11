import {z} from '@hono/zod-openapi';
import type {Knex} from 'knex';

import {
	DatabaseDeleteError,
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
	NotFoundError,
} from '@lib/errors';
import type {TenantLocationDBType} from '@lib/models/tenant-location';
import {
	TenantLocation,
	type TenantLocationInsertDBType,
	type TenantLocationUpdateDBType,
} from '@lib/models/tenant-location';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {ITenantLocationRepository} from './tenant-location.repository.types';

class TenantLocationRepository
	extends KnexRepository
	implements ITenantLocationRepository
{
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('tenant-location-repository', db, context);
	}

	override withTransaction(trx: Knex.Transaction) {
		return new TenantLocationRepository(trx, {logger: this.logger});
	}

	private withTenant<T extends object = TenantLocationDBType>(
		query: Knex.QueryBuilder<T extends readonly any[] ? T[number] : T, T>
	): Knex.QueryBuilder<T extends readonly any[] ? T[number] : T, T> {
		return query
			.select('tenant_location.*', 'tenant.name as tenant_name')
			.join('tenant', 'tenant_location.tenant_id', 'tenant.id');
	}

	private applyLoggedInTenantIdFilter(
		query: Knex.QueryBuilder<TenantLocationDBType>,
		loggedInTenantId: string | undefined
	): Knex.QueryBuilder<TenantLocationDBType> {
		return loggedInTenantId
			? query.where('tenant_location.tenant_id', loggedInTenantId)
			: query;
	}

	async findTenantLocations(
		filters: DatabaseQueryFilters,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.withTenant<TenantLocationDBType[]>(
					this.applyLoggedInTenantIdFilter(
						this.db('tenant_location'),
						loggedInTenantId
					)
				),
				filters
			);

			const result = await query;

			z.array(TenantLocation.schemas.TenantLocationDBSchema).parse(result);

			return TenantLocation.fromDB(result ?? []);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant locations');
		}
	}

	async countTenantLocations(
		filters: DatabaseQueryFilters,
		loggedInTenantId: string | undefined
	): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(this.db('tenant_location'), {
				...filters,
				limit: undefined,
				offset: undefined,
				orderBy: undefined,
			});

			this.applyLoggedInTenantIdFilter(query, loggedInTenantId);

			const result = await query.count('* as count').first();

			return result?.count ? Number(result.count) : 0;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError(
				'Error retrieving tenant locations count'
			);
		}
	}

	async getTenantLocationById(
		id: string,
		loggedIdTenantId: string | undefined
	): Promise<TenantLocation | undefined> {
		try {
			const result = await this.withTenant<TenantLocationDBType>(
				this.applyLoggedInTenantIdFilter(
					this.db('tenant_location').where('tenant_location.id', id).first(),
					loggedIdTenantId
				)
			);

			TenantLocation.schemas.TenantLocationDBSchema.parse(result);

			return result ? TenantLocation.fromDB(result) : undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant location');
		}
	}

	async createTenantLocation(
		tenantLocation: TenantLocationInsertDBType
	): Promise<TenantLocation> {
		try {
			await this.db<TenantLocationDBType>('tenant_location').insert(
				tenantLocation
			);

			const result = await this.getTenantLocationById(
				tenantLocation.id,
				undefined
			);

			if (!result) {
				throw new NotFoundError('Error retrieving tenant location');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseInsertError('Error creating tenant location');
		}
	}

	async updateTenantLocation(
		id: string,
		tenantLocation: TenantLocationUpdateDBType,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation> {
		try {
			await this.applyLoggedInTenantIdFilter(
				this.db<TenantLocationDBType>('tenant_location')
					.where({id})
					.update(tenantLocation),
				loggedInTenantId
			);

			const result = await this.getTenantLocationById(id, loggedInTenantId);

			if (!result) {
				throw new NotFoundError('Error retrieving tenant location');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseUpdateError('Error updating tenant location');
		}
	}

	async findTenantLocationsByUserId(
		userId: string,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation[]> {
		try {
			const query = this.withTenant<TenantLocationDBType[]>(
				this.applyLoggedInTenantIdFilter(
					this.db('tenant_location')
						.join(
							'app_user_tenant_location',
							'tenant_location.id',
							'app_user_tenant_location.tenant_location_id'
						)
						.where('app_user_tenant_location.user_id', userId),
					loggedInTenantId
				)
			);

			const result = await query;

			return TenantLocation.fromDB(result ?? []);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant locations');
		}
	}

	async findTenantLocationsByClientId(
		clientId: string,
		loggedInTenantId: string | undefined
	): Promise<TenantLocation[]> {
		try {
			const query = this.withTenant<TenantLocationDBType[]>(
				this.applyLoggedInTenantIdFilter(
					this.db('tenant_location')
						.join(
							'client_tenant_location',
							'tenant_location.id',
							'client_tenant_location.tenant_location_id'
						)
						.where('client_tenant_location.client_id', clientId),
					loggedInTenantId
				)
			);

			const result = await query;

			return TenantLocation.fromDB(result ?? []);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant locations');
		}
	}

	async findTenantLocationsByUserIdForUpdate(
		userId: string,
		loggedInTenantId: string | undefined
	): Promise<Omit<TenantLocationDBType, 'tenant_name'>[]> {
		try {
			const query = this.applyLoggedInTenantIdFilter(
				this.db('tenant_location')
					.select('tenant_location.*')
					.join(
						'app_user_tenant_location',
						'tenant_location.id',
						'app_user_tenant_location.tenant_location_id'
					)
					.where('app_user_tenant_location.user_id', userId)
					.forUpdate(),
				loggedInTenantId
			);

			const result = await query;

			return result ?? [];
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving tenant locations');
		}
	}

	updateUserTenantLocations(
		userId: string,
		locationIds: string[],
		loggedInTenantId: string | undefined
	): Promise<void> {
		const shouldWrapInTransaction = !this.db.isTransaction;

		const callback = async (trx: Knex.Transaction) => {
			const userLocations = await this.findTenantLocationsByUserIdForUpdate(
				userId,
				loggedInTenantId
			);

			const newLocationIds = new Set(locationIds);
			const oldLocationIds = new Set(
				userLocations.map((location) => location.id)
			);

			const locationsToRemove = userLocations.filter(
				(location) => !newLocationIds.has(location.id)
			);

			const locationsToAdd = locationIds.filter(
				(locationId) => !oldLocationIds.has(locationId)
			);

			await trx('app_user_tenant_location')
				.insert(
					locationsToAdd.map((location) => ({
						user_id: userId,
						tenant_location_id: location,
					}))
				)
				.onConflict(['user_id', 'tenant_location_id'])
				.ignore();

			await trx('app_user_tenant_location')
				.whereIn(
					'tenant_location_id',
					locationsToRemove.map((location) => location.id)
				)
				.andWhere('user_id', userId)
				.del();
		};

		if (shouldWrapInTransaction) {
			return this.db.transaction(callback);
		}
		return callback(this.db as Knex.Transaction);
	}

	async addUserToTenantLocation(
		userId: string,
		locationId: string,
		loggedInTenantId: string | undefined
	): Promise<void> {
		const shouldWrapInTransaction = !this.db.isTransaction;

		const callback = async (trx: Knex.Transaction) => {
			const location = await this.getTenantLocationById(
				locationId,
				loggedInTenantId
			);

			if (!location || location?.tenant?.id !== loggedInTenantId) {
				throw new NotFoundError('Location not found');
			}

			await trx('app_user_tenant_location').insert({
				user_id: userId,
				tenant_location_id: locationId,
			});
		};

		if (shouldWrapInTransaction) {
			return this.db.transaction(callback);
		}
		return callback(this.db as Knex.Transaction);
	}

	async addUserToTenantLocations(
		userId: string,
		locationIds: string[],
		loggedInTenantId: string | undefined
	): Promise<void> {
		const shouldWrapInTransaction = !this.db.isTransaction;

		const callback = async (trx: Knex.Transaction) => {
			const locationsQuery = this.db<TenantLocationDBType>(
				'tenant_location'
			).whereIn('id', locationIds);

			if (loggedInTenantId) {
				locationsQuery.andWhere('tenant_id', loggedInTenantId);
			}

			const locations = await locationsQuery;

			if (locations.length !== locationIds.length) {
				throw new NotFoundError('Location not found');
			}

			await trx('app_user_tenant_location').insert(
				locationIds.map((locationId) => ({
					user_id: userId,
					tenant_location_id: locationId,
				}))
			);
		};

		if (shouldWrapInTransaction) {
			return this.db.transaction(callback);
		}
		return callback(this.db as Knex.Transaction);
	}

	async removeUserFromTenantLocation(
		userId: string,
		locationId: string,
		loggedInTenantId: string | undefined
	): Promise<void> {
		try {
			const query = this.db('app_user_tenant_location')
				.where('app_user_tenant_location.user_id', userId)
				.andWhere('tenant_location_id', locationId)
				.del();

			if (loggedInTenantId) {
				query
					.join(
						'tenant_location',
						'tenant_location.id',
						'app_user_tenant_location.tenant_location_id'
					)
					.where('tenant_location.tenant_id', loggedInTenantId);
			}

			await query;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseDeleteError('Error removing user from location');
		}
	}

	async removeUserFromTenantLocations(
		userId: string,
		locationIds: string[],
		loggedInTenantId: string | undefined
	): Promise<void> {
		try {
			const query = this.db('app_user_tenant_location')
				.where('app_user_tenant_location.user_id', userId)
				.whereIn('tenant_location_id', locationIds)
				.del();

			if (loggedInTenantId) {
				query
					.join(
						'tenant_location',
						'tenant_location.id',
						'app_user_tenant_location.tenant_location_id'
					)
					.where('tenant_location.tenant_id', loggedInTenantId);
			}
			await query;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseDeleteError('Error removing user from locations');
		}
	}

	inactivateTenantLocation(
		id: string,
		loggedInTenantId: string | undefined
	): Promise<void> {
		try {
			return this.applyLoggedInTenantIdFilter(
				this.db<TenantLocationDBType>('tenant_location')
					.where('tenant_location.id', id)
					.update({is_active: false}),
				loggedInTenantId
			);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseUpdateError('Error inactivating tenant location');
		}
	}
}

export {TenantLocationRepository};
