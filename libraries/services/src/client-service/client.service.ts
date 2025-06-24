import {NotFoundError} from '@lib/errors';
import type {Client} from '@lib/models/client';
import type {IClientRepository} from '@lib/repositories/client';
import {PinoLogger} from '@lib/utils';
import type {PaginatedDatabaseQueryFilters} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AppContext, AuthenticatedAppContext} from '../types';
import type {IClientService} from './client.service.types';

class ClientService implements IClientService {
	private readonly logger: PinoLogger;

	constructor(
		private clientRepository: IClientRepository,
		private context: AppContext
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'client-service',
			},
			{}
		);
	}

	private getTenantAndLocationFromContext() {
		const auth = this.context.auth;

		if (!auth) {
			return [undefined, undefined] as const;
		}

		return AuthorizationService.getTenantAndLocationFromContext(
			this.context as AuthenticatedAppContext
		);
	}

	async getClientById(clientId: string) {
		return this.clientRepository.getClientById(clientId);
	}

	async findPaginatedClients(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<Client>> {
		const entries = await this.clientRepository.findClientsByFilters(
			filters,
			...this.getTenantAndLocationFromContext()
		);

		const totalCount = await this.clientRepository.countClientsByFilters(
			filters,
			...this.getTenantAndLocationFromContext()
		);

		return {
			entries,
			totalEntries: totalCount,
		};
	}

	async findClientsByTenantId(tenantId: string): Promise<Client[]> {
		return this.clientRepository.findClientsByTenantId(
			tenantId,
			...this.getTenantAndLocationFromContext()
		);
	}

	async blockClient(clientId: string): Promise<Client> {
		return this.clientRepository.updateClient(
			clientId,
			{
				is_blocked: true,
			},
			...this.getTenantAndLocationFromContext()
		);
	}

	async unblockClient(clientId: string): Promise<Client> {
		return this.clientRepository.updateClient(
			clientId,
			{
				is_blocked: false,
			},
			...this.getTenantAndLocationFromContext()
		);
	}

	async updateClientLastLogin(clientId: string): Promise<Client> {
		return this.clientRepository.updateClient(
			clientId,
			{
				last_login: new Date(),
			},
			...this.getTenantAndLocationFromContext()
		);
	}

	async inactivateClient(clientId: string): Promise<Client> {
		return this.clientRepository.updateClient(
			clientId,
			{
				is_active: false,
			},
			...this.getTenantAndLocationFromContext()
		);
	}
}

export {ClientService};
export type {IClientService};
