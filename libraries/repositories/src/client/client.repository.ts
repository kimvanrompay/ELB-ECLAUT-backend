import {type Knex} from 'knex';

import {DatabaseRetrieveError, DatabaseUpdateError} from '@lib/errors';
import {
	Client,
	type ClientDBType,
	type ClientUpdateDBType,
} from '@lib/models/client';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IClientRepository} from './client.repository.types';

class ClientRepository extends KnexRepository implements IClientRepository {
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('client-repository', db, context);
	}

	public override withTransaction(trx: Knex.Transaction): ClientRepository {
		return new ClientRepository(trx, {logger: this.logger});
	}

	// Add methods specific to ClientRepository here

	private withTenantAndLocations<T = ClientDBType>(
		query: Knex.QueryBuilder<any, T>
	): Knex.QueryBuilder<any, T> {
		return query
			.select(
				'client.*',
				'tenant.name as tenant_name',
				this.db.raw(
					"coalesce(json_agg(client_tenant_location.tenant_location_id) filter ( where client_tenant_location.tenant_location_id is not null ), '[]') as location_ids"
				)
			)
			.leftJoin('tenant', 'client.tenant_id', 'tenant.id')
			.leftJoin(
				'client_tenant_location',
				'client.id',
				'client_tenant_location.client_id'
			)
			.groupBy('client.id', 'tenant.name');
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		if (tenantId) {
			query.where('client.tenant_id', tenantId);
		}

		if (locationIds && locationIds.length > 0) {
			query
				.join(
					'client_tenant_location',
					'client.id',
					'client_tenant_location.client_id'
				)
				.whereIn('client_tenant_location.tenant_location_id', locationIds);
		}

		return query;
	}

	async getClientById(
		clientId: string,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client | undefined> {
		try {
			const query = this.applyTenantAndLocationFilters(
				this.withTenantAndLocations(this.db<ClientDBType>('client')).where(
					'client.id',
					clientId
				),
				loggedInTenantId,
				loggedInTenantLocationIds
			).first();

			console.log(query.toQuery()); // Debugging line to see the SQL query

			const result = await query;

			console.log(
				'ClientRepository.getClientById',
				result,
				loggedInTenantId,
				loggedInTenantLocationIds
			);

			if (!result) {
				return undefined;
			}

			return Client.fromDBType(result);
		} catch (error) {
			this.logger.error(`Failed to get client by ID ${clientId}, ${error}`);
			throw new DatabaseRetrieveError(`Failed to get client by ID ${clientId}`);
		}
	}

	async findClientsByFilters(
		filters?: DatabaseQueryFilters,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.withTenantAndLocations(this.db<ClientDBType>('client')),
				filters
			);

			const result = this.applyTenantAndLocationFilters(
				query,
				loggedInTenantId,
				loggedInTenantLocationIds
			);

			const results = await result;

			return Client.fromDBType(results);
		} catch (error) {
			this.logger.error(`Failed to find clients by filters, ${error}`);
			throw new DatabaseRetrieveError('Failed to find clients by filters');
		}
	}

	async countClientsByFilters(
		filters?: DatabaseQueryFilters,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.withTenantAndLocations(this.db<ClientDBType>('client')),
				{
					...filters,
					limit: undefined,
					offset: undefined,
					orderBy: undefined,
				}
			);

			const result = await this.applyTenantAndLocationFilters(
				query,
				loggedInTenantId,
				loggedInTenantLocationIds
			)
				.count('* as count')
				.first();

			return result?.count ? Number(result.count) : 0;
		} catch (error) {
			this.logger.error(`Failed to count clients by filters, ${error}`);
			throw new DatabaseRetrieveError('Failed to count clients by filters');
		}
	}

	async findClientsByTenantId(
		tenantId: string,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client[]> {
		return this.findClientsByFilters(
			{
				where: [
					{
						type: 'eq',
						columnName: 'client.tenant_id',
						value: tenantId,
					},
				],
			},
			loggedInTenantId,
			loggedInTenantLocationIds
		);
	}

	async updateClient(
		clientId: string,
		data: ClientUpdateDBType,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client> {
		try {
			const query = this.db<ClientDBType>('client')
				.where({id: clientId})
				.update(data);

			const result = await this.applyTenantAndLocationFilters(
				query,
				loggedInTenantId,
				loggedInTenantLocationIds
			);

			if (result === 0) {
				throw new Error(`Could not find client to update with ID ${clientId}`);
			}

			const updatedClient = await this.getClientById(
				clientId,
				loggedInTenantId,
				loggedInTenantLocationIds
			);

			if (!updatedClient) {
				throw new Error(`Client with ID ${clientId} not found after update`);
			}

			return updatedClient;
		} catch (error) {
			this.logger.error(
				`Failed to update client with ID ${clientId}, error: ${error}`
			);
			throw new DatabaseUpdateError(
				`Failed to update client with ID ${clientId}`
			);
		}
	}
}

export {ClientRepository};
export type {IClientRepository};
