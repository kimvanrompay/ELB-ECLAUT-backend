import {Playfield} from '@lib/models/playfield';
import type {IPlayfieldRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

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

	async findPlayfields(filters?: DatabaseQueryFilters): Promise<Playfield[]> {
		return this.playfieldRepository.findPlayfields(
			filters,
			...this.getTenantAndLocationFromContext()
		);
	}

	async getPlayfieldById(id: string): Promise<Playfield | undefined> {
		return this.playfieldRepository.getPlayfieldById(
			id,
			...this.getTenantAndLocationFromContext()
		);
	}

	async findPlayfieldsBySerial(serial: string): Promise<Playfield[]> {
		return this.playfieldRepository.findPlayfieldsByCabinetId(
			serial,
			...this.getTenantAndLocationFromContext()
		);
	}
}

export {PlayfieldService};
