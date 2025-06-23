import {UnauthorizedError} from '@lib/errors';
import {Machine, type MachineCreateDTOType} from '@lib/models/machine';
import type {
	ICabinetRepository,
	IMachineRepository,
	IPlayfieldRepository,
} from '@lib/repositories/types';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';
import type {PinoLogger} from '@lib/utils/logger';

import {AuthorizationService} from '../authorization-service/authorization.service';
import {type AuthenticatedAppContext, isAuthenticatedContext} from '../types';
import type {IMachineService} from './machine.service.types';

class MachineService implements IMachineService {
	private machineRepository: IMachineRepository;
	private context: AuthenticatedAppContext;
	private logger: PinoLogger;

	constructor(
		machineRepository: IMachineRepository,
		playfieldRepository: IPlayfieldRepository,
		cabinetRepository: ICabinetRepository,
		context: AuthenticatedAppContext
	) {
		this.machineRepository = machineRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				name: 'machine-service',
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

	async findMachines(filters?: DatabaseQueryFilters): Promise<Machine[]> {
		return this.machineRepository.findMachines(
			filters ?? {},
			...this.getTenantAndLocationFromContext()
		);
	}

	async findPaginatedMachines(
		filters: PaginatedDatabaseQueryFilters
	): Promise<{entries: Machine[]; totalEntries: number}> {
		const [tenantId, locationIds] = this.getTenantAndLocationFromContext();

		const machines = await this.machineRepository.findMachines(
			filters ?? {},
			tenantId,
			locationIds
		);
		const total = await this.machineRepository.countMachines(
			filters ?? {},
			tenantId,
			locationIds
		);

		return {entries: machines, totalEntries: total};
	}

	/**
	 * The Machine returned by this method is always a Cabinet.
	 * @param machine
	 */
	async createMachine(machine: MachineCreateDTOType): Promise<Machine> {
		if (!this.context.auth || !isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		throw new Error('Method not implemented.');
	}
}

export {MachineService};
