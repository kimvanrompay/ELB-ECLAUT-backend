import {NotFoundError} from '@lib/errors';
import {
	PlayfieldCategory,
	type PlayfieldCategoryCreateDTOType,
	type PlayfieldCategoryUpdateDTOType,
} from '@lib/models/playfield-category';
import type {IPlayfieldCategoryRepository} from '@lib/repositories/types';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import type {AuthenticatedAppContext} from '../types';
import type {IPlayfieldCategoryService} from './playfield-category.service.types';

class PlayfieldCategoryService implements IPlayfieldCategoryService {
	constructor(
		private playfieldCategoryRepository: IPlayfieldCategoryRepository,
		private context: AuthenticatedAppContext
	) {}

	async findPlayfieldCategories(
		filters?: DatabaseQueryFilters
	): Promise<PaginatedResult<PlayfieldCategory>> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const entries =
			await this.playfieldCategoryRepository.findPlayfieldCategories(
				filters,
				tenantId
			);

		const totalEntries =
			await this.playfieldCategoryRepository.countPlayfieldCategories(
				filters,
				tenantId
			);

		return {
			entries,
			totalEntries,
		};
	}

	async getPlayfieldCategoryById(id: string): Promise<PlayfieldCategory> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const result =
			await this.playfieldCategoryRepository.getPlayfieldCategoryById(
				id,
				tenantId
			);

		if (!result) {
			throw new NotFoundError(`Playfield category with id "${id}" not found`);
		}

		return result;
	}

	async updatePlayfieldCategory(
		id: string,
		data: PlayfieldCategoryUpdateDTOType
	): Promise<PlayfieldCategory | undefined> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const asDBData = PlayfieldCategory.getUpdateDBTypeFromUpdateDTO(data);

		const result =
			await this.playfieldCategoryRepository.updatePlayfieldCategory(
				id,
				asDBData,
				tenantId
			);

		if (!result) {
			throw new NotFoundError(`Playfield category with id "${id}" not found`);
		}

		return result;
	}

	async createPlayfieldCategory(
		data: PlayfieldCategoryCreateDTOType
	): Promise<PlayfieldCategory> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		const asDBData = PlayfieldCategory.getInsertDBTypeFromCreateDTO(data);

		if (tenantId) {
			asDBData.tenant_id = tenantId;
		}

		return this.playfieldCategoryRepository.createPlayfieldCategory(asDBData);
	}

	async deletePlayfieldCategory(id: string): Promise<void> {
		const [tenantId] = AuthorizationService.getTenantAndLocationFromContext(
			this.context
		);

		await this.playfieldCategoryRepository.deletePlayfieldCategory(
			id,
			tenantId
		);
	}
}

export {PlayfieldCategoryService};
