import {NotFoundError} from '@lib/errors';
import {
	Prize,
	type PrizeCreateDTOType,
	type PrizeUpdateDTOType,
} from '@lib/models/prize';
import type {IPrizeRepository} from '@lib/repositories/types';
import type {PaginatedDatabaseQueryFilters} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';

class PrizeService {
	constructor(
		private prizeRepository: IPrizeRepository,
		private context: AuthenticatedAppContext
	) {}

	async findPaginatedPrizes(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<Prize>> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const prizes = await this.prizeRepository.findPrizes(filters, tenantId);
		const totalEntries = await this.prizeRepository.countPrizes(
			filters,
			tenantId
		);

		return {
			entries: prizes,
			totalEntries,
		};
	}

	async getPrizeById(id: string): Promise<Prize> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const result = await this.prizeRepository.getPrizeById(id, tenantId);

		if (!result) {
			throw new NotFoundError(`Prize with id "${id}" not found`);
		}

		return result;
	}

	async updatePrize(
		id: string,
		data: PrizeUpdateDTOType
	): Promise<Prize | undefined> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const asDBData = Prize.getUpdateDBFromUpdateDTO(data);

		const result = await this.prizeRepository.updatePrize(
			id,
			asDBData,
			tenantId
		);

		if (!result) {
			throw new NotFoundError(`Prize with id "${id}" not found`);
		}

		return result;
	}

	createPrize(data: PrizeCreateDTOType): Promise<Prize> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const asDBData = Prize.getInsertDBFromCreateDTO(data);

		if (tenantId) {
			asDBData.tenant_id = tenantId;
		}

		return this.prizeRepository.createPrize(asDBData);
	}
}

export {PrizeService};
