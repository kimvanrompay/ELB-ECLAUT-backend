import {v4 as uuid} from 'uuid';

import {TenantNotAllowedError} from '@lib/errors';
import {
	TenantLocation,
	type TenantLocationCreateDTOType,
	type TenantLocationUpdateDTOType,
} from '@lib/models/tenant-location';
import type {ITenantLocationRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AppContext} from '../types';
import type {ITenantLocationService} from './tenant-location.service.types';

class TenantLocationService implements ITenantLocationService {
	private logger: PinoLogger;

	constructor(
		private readonly tenantLocationRepository: ITenantLocationRepository,
		private readonly appContext: AppContext
	) {
		this.logger = appContext.logger.getChildLogger(
			{
				name: 'tenant-location-service',
			},
			{}
		);
	}

	private getLoggedInTenantId(): string | undefined {
		if (!this.appContext.auth) {
			return undefined;
		}

		if (
			AuthorizationService.isTenantBound(this.appContext.auth.securityGroup)
		) {
			return this.appContext.auth.tenantId;
		}
		return undefined;
	}

	findTenantLocations(
		filters: DatabaseQueryFilters
	): Promise<TenantLocation[]> {
		return this.tenantLocationRepository.findTenantLocations(
			filters,
			this.getLoggedInTenantId()
		);
	}

	async findPaginatedTenantLocations(
		filters: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<TenantLocation>> {
		const entries = await this.tenantLocationRepository.findTenantLocations(
			filters,
			this.getLoggedInTenantId()
		);

		const totalEntries =
			await this.tenantLocationRepository.countTenantLocations(
				filters,
				this.getLoggedInTenantId()
			);

		return {
			entries,
			totalEntries,
		};
	}

	findTenantLocationsByUserId(userId: string): Promise<TenantLocation[]> {
		return this.tenantLocationRepository.findTenantLocationsByUserId(
			userId,
			this.getLoggedInTenantId()
		);
	}

	findTenantLocationsByClientId(clientId: string): Promise<TenantLocation[]> {
		return this.tenantLocationRepository.findTenantLocationsByClientId(
			clientId,
			this.getLoggedInTenantId()
		);
	}

	getTenantLocationById(
		locationId: string
	): Promise<TenantLocation | undefined> {
		return this.tenantLocationRepository.getTenantLocationById(
			locationId,
			this.getLoggedInTenantId()
		);
	}

	createTenantLocation(
		location: TenantLocationCreateDTOType
	): Promise<TenantLocation> {
		if (location.tenantId !== this.getLoggedInTenantId()) {
			throw new TenantNotAllowedError(
				'Tenant ID does not match the logged in tenant'
			);
		}

		const newLocationId = uuid();

		return this.tenantLocationRepository.createTenantLocation({
			id: newLocationId,
			email: location.email,
			tenant_id: location.tenantId,
			name: location.name,
			address: location.address,
			city: location.city,
			state: location.state,
			zip: location.zip,
			country: location.country,
			phone: location.phone,
		});
	}

	updateTenantLocation(
		locationId: string,
		location: TenantLocationUpdateDTOType
	): Promise<TenantLocation> {
		return this.tenantLocationRepository.updateTenantLocation(
			locationId,
			TenantLocation.createDBUpdate(location),
			this.getLoggedInTenantId()
		);
	}

	inactivateTenantLocation(locationId: string): Promise<void> {
		return this.tenantLocationRepository.inactivateTenantLocation(
			locationId,
			this.getLoggedInTenantId()
		);
	}
}

export {TenantLocationService};
