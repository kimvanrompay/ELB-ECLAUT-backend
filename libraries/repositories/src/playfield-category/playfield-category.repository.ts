import {type Knex} from 'knex';

import {
	DatabaseDeleteError,
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import type {PlayfieldDBType} from '@lib/models/playfield';
import {
	PlayfieldCategory,
	type PlayfieldCategoryDBType,
	type PlayfieldCategoryInsertDBType,
	type PlayfieldCategoryUpdateDBType,
} from '@lib/models/playfield-category';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IPlayfieldCategoryRepository} from './playfield-category.repository.types';

class PlayfieldCategoryRepository
	extends KnexRepository
	implements IPlayfieldCategoryRepository
{
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('playfield-category-repository', db, context);
	}

	override withTransaction(
		transaction: Knex.Transaction
	): PlayfieldCategoryRepository {
		return new PlayfieldCategoryRepository(transaction, {
			logger: this.logger,
		});
	}

	// Additional methods specific to PlayfieldCategory can be added here

	private applyTenantIdFilter<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string
	): Query {
		if (tenantId) {
			query.where('playfield_category.tenant_id', tenantId);
		}
		return query;
	}

	private selectPlayfieldCategoriesWithPlayfields() {
		return this.db<PlayfieldCategoryDBType>('playfield_category')
			.select(
				'playfield_category.*',
				'tenant.name as tenant_name',
				this.db.raw(
					`coalesce(json_agg( json_build_object('id', playfield.id, 'name', playfield.name, 'serialNumber', playfield.serial_number)) filter ( where playfield.id is not null ), '[]') as playfields`
				)
			)
			.leftJoin('playfield', 'playfield_category.id', 'playfield.category_id')
			.innerJoin('tenant', 'playfield_category.tenant_id', 'tenant.id')
			.groupBy('playfield_category.id', 'tenant.name');
	}

	async findPlayfieldCategories(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<PlayfieldCategory[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.selectPlayfieldCategoriesWithPlayfields(),
				filters
			);

			this.applyTenantIdFilter(query, tenantId);

			console.log('Executing query:', query.toString());

			const result = await query;

			return result.map((row) =>
				PlayfieldCategory.fromDBType(row as PlayfieldCategoryDBType)
			);
		} catch (error) {
			this.logger.error(error, 'Error finding playfield categories');
			throw new DatabaseRetrieveError(
				'Failed to retrieve playfield categories'
			);
		}
	}

	async countPlayfieldCategories(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<number> {
		try {
			// We don't need to join playfields for counting
			const query = KnexFilterAdapter.applyFilters(
				this.db<PlayfieldCategoryDBType>('playfield_category')
					.count('* as count')
					.leftJoin('tenant', 'playfield_category.tenant_id', 'tenant.id'),
				{
					...filters,
					limit: undefined,
					offset: undefined,
					orderBy: undefined,
				}
			);

			this.applyTenantIdFilter(query, tenantId);

			const result = (await query.first()) as unknown as {count: number};
			return result?.count ?? 0;
		} catch (error) {
			this.logger.error(error, 'Error counting playfield categories');
			throw new DatabaseRetrieveError('Failed to count playfield categories');
		}
	}

	async getPlayfieldCategoryById(
		id: string,
		tenantId?: string
	): Promise<PlayfieldCategory | undefined> {
		try {
			const query = this.selectPlayfieldCategoriesWithPlayfields().where(
				'playfield_category.id',
				id
			);

			this.applyTenantIdFilter(query, tenantId);

			const result = await query.first();

			if (!result) return undefined;

			return PlayfieldCategory.fromDBType(result);
		} catch (error) {
			this.logger.error(error, 'Error retrieving playfield category by ID');
			throw new DatabaseRetrieveError(
				'Failed to retrieve playfield category by ID'
			);
		}
	}

	async createPlayfieldCategory(
		data: PlayfieldCategoryInsertDBType
	): Promise<PlayfieldCategory> {
		try {
			await this.db<PlayfieldCategoryDBType>('playfield_category').insert(data);

			const newCategory = await this.getPlayfieldCategoryById(
				data.id,
				data.tenant_id
			);

			if (!newCategory) {
				throw new DatabaseInsertError(
					'Failed to retrieve newly created playfield category'
				);
			}
			return newCategory;
		} catch (error) {
			this.logger.error(error, 'Error creating playfield category');
			throw new DatabaseInsertError('Failed to create playfield category');
		}
	}

	async updatePlayfieldCategory(
		id: string,
		data: PlayfieldCategoryUpdateDBType,
		tenantId?: string
	): Promise<PlayfieldCategory | undefined> {
		try {
			const query = this.db<PlayfieldCategoryDBType>('playfield_category')
				.where('id', id)
				.update(data);

			this.applyTenantIdFilter(query, tenantId);

			await query;

			return this.getPlayfieldCategoryById(id, tenantId);
		} catch (error) {
			this.logger.error(error, 'Error updating playfield category');
			throw new DatabaseUpdateError('Failed to update playfield category');
		}
	}

	async deletePlayfieldCategory(id: string, tenantId?: string): Promise<void> {
		try {
			const query = this.db<PlayfieldCategoryDBType>('playfield_category')
				.where('id', id)
				.del();

			this.applyTenantIdFilter(query, tenantId);

			await query;
		} catch (error) {
			this.logger.error(error, 'Error deleting playfield category');
			throw new DatabaseDeleteError('Failed to delete playfield category');
		}
	}

	async addPlayfieldToCategory(
		playfieldId: string,
		categoryId: string | null,
		tenantId?: string
	): Promise<PlayfieldCategory | undefined> {
		const shouldWrapInTransaction = !this.db.isTransaction;

		try {
			const update = async (trx: Knex.Transaction) => {
				await this.applyTenantIdFilter(
					trx('playfield_stats')
						.innerJoin('playfield', (join) => {
							join
								.on('playfield_stats.playfield_id', 'playfield.id')
								.andOn('playfield_stats.tenant_id', '=', 'playfield.tenant_id');
						})
						.innerJoin('tenant', 'playfield.tenant_id', 'tenant.id')
						.where('playfield_id', playfieldId)
						.update({
							playfield_category_id: categoryId ?? null,
						}),
					tenantId
				);

				await this.applyTenantIdFilter(
					trx<PlayfieldDBType>('playfield')
						.where('id', playfieldId)
						.update({
							category_id: categoryId ?? null,
						}),
					tenantId
				);
			};

			if (shouldWrapInTransaction) {
				await this.db.transaction(async (trx) => {
					await update(trx);
				});
			} else {
				await update(this.db as Knex.Transaction);
			}

			return categoryId
				? this.getPlayfieldCategoryById(categoryId, tenantId)
				: undefined;
		} catch (error) {
			this.logger.error(error, 'Error adding playfield to category');
			throw new DatabaseUpdateError('Failed to add playfield to category');
		}
	}
}

export {PlayfieldCategoryRepository};
