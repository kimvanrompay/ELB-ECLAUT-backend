import type {Knex} from 'knex';

import {
	PlayfieldCategory,
	type PlayfieldCategoryInsertDBType,
	type PlayfieldCategoryUpdateDBType,
} from '@lib/models/playfield-category';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IPlayfieldCategoryRepository extends IKnexRepository {
	withTransaction(transaction: Knex.Transaction): IPlayfieldCategoryRepository;

	findPlayfieldCategories(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<PlayfieldCategory[]>;

	countPlayfieldCategories(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<number>;

	getPlayfieldCategoryById(
		id: string,
		tenantId?: string
	): Promise<PlayfieldCategory | undefined>;

	createPlayfieldCategory(
		data: PlayfieldCategoryInsertDBType
	): Promise<PlayfieldCategory>;

	updatePlayfieldCategory(
		id: string,
		data: PlayfieldCategoryUpdateDBType,
		tenantId?: string
	): Promise<PlayfieldCategory | undefined>;

	deletePlayfieldCategory(id: string, tenantId?: string): Promise<void>;

	addPlayfieldToCategory(
		playfieldId: string,
		categoryId: string | null,
		tenantId?: string
	): Promise<PlayfieldCategory | undefined>;
}

export type {IPlayfieldCategoryRepository};
