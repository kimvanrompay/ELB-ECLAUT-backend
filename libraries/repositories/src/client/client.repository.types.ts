import {Knex} from 'knex';

import {Client, type ClientUpdateDBType} from '@lib/models/client';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IClientRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IClientRepository;

	getClientById(
		clientId: string,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client | undefined>;

	findClientsByTenantId(
		tenantId: string,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client[]>;

	findClientsByFilters(
		filters?: DatabaseQueryFilters,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client[]>;

	countClientsByFilters(
		filters?: DatabaseQueryFilters,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<number>;

	updateClient(
		clientId: string,
		data: ClientUpdateDBType,
		loggedInTenantId?: string,
		loggedInTenantLocationIds?: string[]
	): Promise<Client>;
}

export type {IClientRepository};
