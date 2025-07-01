import type {Knex} from 'knex';
import {v4 as uuid} from 'uuid';

import {DatabaseInsertError} from '@lib/errors';
import {PlayfieldPrize} from '@lib/models/playfield-prize';
import {
	Prize,
	type PrizeDBType,
	type PrizeInsertDBType,
	type PrizePlayfieldDBType,
	type PrizeUpdateDBType,
} from '@lib/models/prize';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IPrizeRepository} from './prize.repository.types';

class PrizeRepository extends KnexRepository implements IPrizeRepository {
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('prize-repository', db, context);
	}

	override withTransaction(trx: Knex.Transaction): PrizeRepository {
		return new PrizeRepository(trx, {logger: this.logger});
	}

	private applyTenantIdFilter<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string
	): Query {
		if (tenantId) {
			query.where('prize.tenant_id', tenantId);
		}
		return query;
	}

	private selectPrizesWithPlayfield() {
		return this.db<PrizeDBType>('prize')
			.select(
				'prize.*',
				'tenant.name as tenant_name',
				this.db.raw(
					`coalesce(json_agg( json_build_object('id', playfield.id, 'name', playfield.name, 'serialNumber', playfield.serial_number)) filter ( where playfield.id is not null ), '[]') as playfields`
				)
			)
			.leftJoin('playfield_prize', (join) => {
				join
					.on('playfield_prize.prize_id', 'prize.id')
					.andOnNull('playfield_prize.removed_at');
			})
			.leftJoin('playfield', 'playfield_prize.playfield_id', 'playfield.id')
			.leftJoin('tenant', 'prize.tenant_id', 'tenant.id')
			.groupBy('prize.id', 'tenant.name');
	}

	async findPrizes(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<Prize[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.selectPrizesWithPlayfield(),
				filters
			);

			this.applyTenantIdFilter(query, tenantId);

			console.log('query', query.toQuery());

			const result = await query;

			return Prize.fromDB(result);
		} catch (error) {
			this.logger.error(error, 'Error finding prizes');
			throw error;
		}
	}

	async countPrizes(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.db<PrizeDBType>('prize'),
				{
					...filters,
					limit: undefined,
					offset: undefined,
					orderBy: undefined,
				}
			);

			this.applyTenantIdFilter(query, tenantId);

			const result = (await query
				.count('prize.id as count')
				.first()) as unknown as {
				count: number;
			};

			return result?.count ?? 0;
		} catch (error) {
			this.logger.error(error, 'Error counting prizes');
			throw error;
		}
	}

	async getPrizeById(
		id: string,
		tenantId?: string
	): Promise<Prize | undefined> {
		try {
			const query = this.selectPrizesWithPlayfield().where('prize.id', id);

			this.applyTenantIdFilter(query, tenantId);

			const result: PrizeDBType = await query.first();

			return result ? Prize.fromDB(result) : undefined;
		} catch (error) {
			this.logger.error(error, 'Error getting prize by ID');
			throw error;
		}
	}

	async createPrize(prize: PrizeInsertDBType): Promise<Prize> {
		try {
			await this.db<PrizeDBType>('prize').insert(prize);
			const newPrize = await this.getPrizeById(prize.id);

			if (!newPrize) {
				throw new DatabaseInsertError('Error creating prize');
			}
			return newPrize;
		} catch (error) {
			this.logger.error(error, 'Error creating prize');
			throw new DatabaseInsertError('Error creating prize');
		}
	}

	async updatePrize(
		id: string,
		prize: PrizeUpdateDBType,
		tenantId?: string
	): Promise<Prize | undefined> {
		try {
			const query = this.db<PrizeDBType>('prize').where('id', id);

			this.applyTenantIdFilter(query, tenantId);

			await query.update(prize);

			return this.getPrizeById(id, tenantId);
		} catch (error) {
			this.logger.error(error, 'Error updating prize');
			throw error;
		}
	}

	async getActivePrizeForPlayfield(
		playfieldId: string,
		tenantId?: string
	): Promise<PrizePlayfieldDBType | undefined> {
		try {
			const query = this.db<PrizePlayfieldDBType>('playfield_prize')
				.innerJoin('prize', 'playfield_prize.prize_id', 'prize.id')
				.where('playfield_prize.playfield_id', playfieldId)
				.andWhere('playfield_prize.removed_at', null);

			this.applyTenantIdFilter(query, tenantId);

			const result: PrizePlayfieldDBType = await query.first();

			return result ?? undefined;
		} catch (error) {
			this.logger.error(error, 'Error getting active prize for playfield');
			throw error;
		}
	}

	async getPrizesHistoryForPlayfield(
		playfieldId: string,
		startDate: Date,
		endDate: Date,
		tenantId?: string
	): Promise<PlayfieldPrize[]> {
		try {
			const query = this.db<PrizePlayfieldDBType>('playfield_prize')
				.innerJoin('prize', 'playfield_prize.prize_id', 'prize.id')
				.where('playfield_prize.playfield_id', playfieldId)
				.where((whereClause1) => {
					whereClause1
						.where((whereClause2) => {
							whereClause2
								.where('playfield_prize.added_at', '<=', endDate)
								.andWhere('playfield_prize.removed_at', null);
						})
						.orWhere((whereClause3) => {
							whereClause3
								.where('playfield_prize.removed_at', '>=', startDate)
								.andWhere('playfield_prize.removed_at', '<=', endDate);
						});
				});

			this.applyTenantIdFilter(query, tenantId);

			const result = await query;

			return PlayfieldPrize.fromDB(result);
		} catch (error) {
			this.logger.error(error, 'Error getting prizes for playfield');
			throw error;
		}
	}

	async addPrizeToPlayfield(
		prizeId: string | null,
		playfieldId: string,
		tenantId?: string
	): Promise<Prize | undefined> {
		const shouldWrapInTransaction = !this.db.isTransaction;

		const callback = async (trx: Knex.Transaction) => {
			// Remove the current prize from the playfield
			await trx('playfield_prize')
				.update({
					removed_at: new Date(),
				})
				.where({
					playfield_id: playfieldId,
				})
				.whereNull('removed_at');

			if (!prizeId) {
				return;
			}

			await trx('playfield_prize').insert({
				id: uuid(),
				playfield_id: playfieldId,
				prize_id: prizeId,
				added_at: new Date(),
			});
		};

		if (shouldWrapInTransaction) {
			await this.db.transaction(callback);
		} else {
			await callback(this.db as Knex.Transaction);
		}

		if (!prizeId) {
			return undefined;
		}

		return this.getPrizeById(prizeId, tenantId);
	}
}

export {PrizeRepository};
