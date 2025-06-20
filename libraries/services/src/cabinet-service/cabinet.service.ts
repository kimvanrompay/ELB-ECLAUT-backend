import {Cabinet} from '@lib/models/cabinet';
import type {ICabinetRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';
import type {ICabinetService} from './cabinet.service.types';

class CabinetService implements ICabinetService {
	private logger: PinoLogger;

	constructor(
		private cabinetRepository: ICabinetRepository,
		private context: AuthenticatedAppContext
	) {
		this.cabinetRepository = cabinetRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				name: 'cabinet-service',
			},
			{}
		);
	}

	private getTenantAndLocationFromContext() {
		const auth = this.context.auth;

		if (!auth) {
			return [undefined, undefined] as const;
		}

		return [
			AuthorizationService.isTenantBound(auth.role) ? auth.tenantId : undefined,
			AuthorizationService.isLocationBound(auth.role)
				? auth.locationIds
				: undefined,
		] as const;
	}

	async findCabinets(filters: DatabaseQueryFilters): Promise<Cabinet[]> {
		return this.cabinetRepository.findCabinets(
			filters,
			...this.getTenantAndLocationFromContext()
		);
	}

	async getCabinetBySerial(serial: string): Promise<Cabinet | undefined> {
		return this.cabinetRepository.getCabinetById(
			serial,
			...this.getTenantAndLocationFromContext()
		);
	}
}

export {CabinetService};
