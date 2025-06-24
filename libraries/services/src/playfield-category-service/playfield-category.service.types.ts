import {
	PlayfieldCategory,
	type PlayfieldCategoryCreateDTOType,
	type PlayfieldCategoryUpdateDTOType,
} from '@lib/models/playfield-category';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IPlayfieldCategoryService {
	findPlayfieldCategories(
		filters?: DatabaseQueryFilters
	): Promise<PaginatedResult<PlayfieldCategory>>;

	getPlayfieldCategoryById(id: string): Promise<PlayfieldCategory>;

	updatePlayfieldCategory(
		id: string,
		data: PlayfieldCategoryUpdateDTOType
	): Promise<PlayfieldCategory | undefined>;

	createPlayfieldCategory(
		data: PlayfieldCategoryCreateDTOType
	): Promise<PlayfieldCategory>;

	deletePlayfieldCategory(id: string): Promise<void>;
}

export type {IPlayfieldCategoryService};
