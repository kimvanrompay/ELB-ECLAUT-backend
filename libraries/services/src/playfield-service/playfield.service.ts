import {Playfield} from '@lib/models/playfield';
import type {IPlayfieldRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';
import type {IPlayfieldService} from './playfield.service.types';

class PlayfieldService implements IPlayfieldService {
	private logger: PinoLogger;

	constructor(
		private playfieldRepository: IPlayfieldRepository,
		private context: AuthenticatedAppContext
	) {
		this.playfieldRepository = playfieldRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				name: 'playfield-service',
			},
			{}
		);
	}

	async findPlayfields(filters?: DatabaseQueryFilters): Promise<Playfield[]> {
		return this.playfieldRepository.findPlayfields(
			filters,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);
	}

	async findPaginatedPlayfields(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<{entries: Playfield[]; totalEntries: number}> {
		const [tenantId, locationIds] =
			AuthorizationService.getTenantAndLocationFromContext(this.context);

		const playfields = await this.playfieldRepository.findPlayfields(
			filters,
			tenantId,
			locationIds
		);

		const total = await this.playfieldRepository.countPlayfields(
			filters,
			tenantId,
			locationIds
		);

		return {
			entries: playfields,
			totalEntries: total,
		};
	}

	async getPlayfieldById(id: string): Promise<Playfield | undefined> {
		return this.playfieldRepository.getPlayfieldById(
			id,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);
	}

	async findPlayfieldsBySerial(serial: string): Promise<Playfield[]> {
		return this.playfieldRepository.findPlayfieldsByCabinetId(
			serial,
			...AuthorizationService.getTenantAndLocationFromContext(this.context)
		);
	}
}

export {PlayfieldService};
