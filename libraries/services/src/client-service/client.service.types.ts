import type {Client} from '@lib/models/client';
import type {PaginatedDatabaseQueryFilters} from '@lib/utils/db/filters';

interface IClientService {
	getClientById(clientId: string): Promise<Client | undefined>;

	findPaginatedClients(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<Client>>;

	findClientsByTenantId(tenantId: string): Promise<Client[]>;

	blockClient(clientId: string): Promise<Client>;

	unblockClient(clientId: string): Promise<Client>;

	updateClientLastLogin(clientId: string): Promise<Client>;

	inactivateClient(clientId: string): Promise<Client>;
}

export type {IClientService};
