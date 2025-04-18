import type {MachineLog} from '@lib/models/machine-log';
import type {IMachineLogRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {PaginatedDatabaseQueryFilters} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';
import type {IMachineLogService} from './machine-log.service.types';

class MachineLogService implements IMachineLogService {
	private logger: PinoLogger;

	constructor(
		private machineLogRepository: IMachineLogRepository,
		private context: AuthenticatedAppContext
	) {
		this.machineLogRepository = machineLogRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				service: 'machine-log-service',
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

	async findPaginatedMachineLogsByPlayfieldId(
		playfieldId: string,
		filters: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<MachineLog>> {
		const entries = await this.machineLogRepository.findMachineLogsForPlayfield(
			playfieldId,
			filters,
			...this.getTenantAndLocationFromContext()
		);

		const totalEntries =
			await this.machineLogRepository.countMachineLogsForPlayfield(playfieldId);

		return {
			entries,
			totalEntries,
		};
	}

	async findPaginatedMachineLogsByCabinetSerialNumber(
		serialNumber: string,
		filters: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<MachineLog>> {
		const entries = await this.machineLogRepository.findMachineLogsForCabinet(
			serialNumber,
			filters,
			...this.getTenantAndLocationFromContext()
		);

		const totalEntries =
			await this.machineLogRepository.countMachineLogsForCabinet(serialNumber);

		return {
			entries,
			totalEntries,
		};
	}
}

export {MachineLogService};
