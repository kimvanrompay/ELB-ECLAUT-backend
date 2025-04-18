import {v4 as uuid} from 'uuid';

import {ForbiddenError} from '@lib/errors';
import type {
	TenantCreateDTOType,
	TenantUpdateDTOType,
} from '@lib/models/tenant';
import type {ITenantRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';
import type {ITenantService} from './tenant.service.types';

class TenantService implements ITenantService {
	private logger: PinoLogger;

	constructor(
		private tenantRepository: ITenantRepository,
		private context: AuthenticatedAppContext
	) {
		this.tenantRepository = tenantRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				service: 'tenant-service',
			},
			{}
		);
	}

	private checkIfUserIsAllowedToAccessTenant(tenantId: string) {
		const isTenantBound = AuthorizationService.isTenantBound(
			this.context.auth.role
		);

		if (isTenantBound && this.context.auth.tenantId !== tenantId) {
			throw new ForbiddenError('Cannot access this tenant');
		}
	}

	async getTenantById(tenantId: string) {
		this.checkIfUserIsAllowedToAccessTenant(tenantId);
		return this.tenantRepository.getTenantById(tenantId);
	}

	async findTenants(filters: DatabaseQueryFilters) {
		const isTenantBound = AuthorizationService.isTenantBound(
			this.context.auth.role
		);

		if (isTenantBound) {
			throw new ForbiddenError('Cannot access other tenants');
		}

		return this.tenantRepository.findTenants(filters);
	}

	async findPaginatedTenants(filters: PaginatedDatabaseQueryFilters) {
		const isTenantBound = AuthorizationService.isTenantBound(
			this.context.auth.role
		);

		if (isTenantBound) {
			throw new ForbiddenError('Cannot access other tenants');
		}

		const entries = await this.tenantRepository.findTenants(filters);

		const totalEntries = await this.tenantRepository.countTenants(filters);

		return {
			entries,
			totalEntries,
		};
	}

	async updateTenant(tenantId: string, tenant: TenantUpdateDTOType) {
		this.checkIfUserIsAllowedToAccessTenant(tenantId);
		return this.tenantRepository.updateTenant(tenantId, tenant);
	}

	async createTenant(tenant: TenantCreateDTOType) {
		const isTenantBound = AuthorizationService.isTenantBound(
			this.context.auth.role
		);

		if (isTenantBound) {
			throw new ForbiddenError('Cannot create other tenants');
		}

		return this.tenantRepository.createTenant({
			...tenant,
			id: uuid(),
		});
	}
}

export {TenantService};
