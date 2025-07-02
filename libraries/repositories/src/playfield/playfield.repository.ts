import type {Knex} from 'knex';

import {DatabaseInsertError, DatabaseRetrieveError} from '@lib/errors';
import {
	Playfield,
	type PlayfieldInsertDBType,
	type PlayfieldUpdateDBType,
	type PlayfieldWithCabinetDBType,
} from '@lib/models/playfield';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IPlayfieldRepository} from './playfield.repository.types';

class PlayfieldRepository
	extends KnexRepository
	implements IPlayfieldRepository
{
	constructor(db: Knex, context: {logger: PinoLogger}) {
		super('playfield-repository', db, context);
	}

	public override withTransaction(trx: Knex.Transaction) {
		return new PlayfieldRepository(trx, {
			logger: this.logger,
		});
	}

	private withCabinet<T = Playfield>(
		query: Knex.QueryBuilder<any, T>
	): Knex.QueryBuilder<any, T> {
		return query.join(
			this.db('cabinet')
				.select(
					'cabinet.*',
					'tenant_location.name as tenant_location_name',
					'tenant.name as tenant_name',
					this.db.raw(
						"coalesce(json_agg(row_to_json(playfield)) filter ( where playfield.serial_number is not null ), '[]') as playfields"
					)
				)
				.join('playfield', 'cabinet.serial_number', 'playfield.serial_number')
				.join('tenant', 'cabinet.tenant_id', 'tenant.id')
				.join(
					'tenant_location',
					'cabinet.tenant_location_id',
					'tenant_location.id'
				)
				.groupBy('cabinet.serial_number', 'tenant_location.name', 'tenant.name')
				.as('cabinet'),
			'playfield.serial_number',
			'cabinet.serial_number'
		);
	}

	private selectPlayfieldWithCabinet<T = Playfield>() {
		return this.withCabinet<T>(this.db('playfield'))
			.select(
				'playfield.*',
				'gametype.name as gametype_name',
				'playfield_category.name as category_name',
				this.db.raw(`coalesce(row_to_json(cabinet),'{}') as cabinet`)
			)
			.join('gametype', 'playfield.gametype_id', 'gametype.id')
			.leftJoin(
				'playfield_category',
				'playfield.category_id',
				'playfield_category.id'
			);
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		if (tenantId) {
			query.where('cabinet.tenant_id', tenantId);
		}

		if (locationIds && locationIds.length > 0) {
			query.whereIn('cabinet.tenant_location_id', locationIds);
		}

		return query;
	}

	async findPlayfields(
		filters: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield[]> {
		try {
			const orderByStatusIndex =
				filters.orderBy?.findIndex(
					(s) =>
						s.columnName === 'status' || s.columnName === 'playfield.status'
				) ?? -1;
			const orderByStatus =
				orderByStatusIndex > -1
					? filters.orderBy?.splice(orderByStatusIndex, 1)?.[0]
					: undefined;

			const searchOnNameFilterIndex =
				filters.where?.findIndex(
					(s) => s.columnName === 'name' || s.columnName === 'playfield.name'
				) ?? -1;

			const searchOnNameFilter =
				searchOnNameFilterIndex > -1
					? filters.where?.splice(searchOnNameFilterIndex, 1)?.[0]
					: undefined;

			const query = KnexFilterAdapter.applyFilters(
				this.selectPlayfieldWithCabinet<PlayfieldWithCabinetDBType[]>(),
				filters
			);

			if (orderByStatus) {
				query.orderByRaw(
					`case when status = 'ERROR' then 1 when status = 'ACTIVE' then 2 else 99 end ${orderByStatus.value}`
				);
			}

			if (searchOnNameFilter) {
				query.where((qb) => {
					qb.where(
						'playfield.name',
						'ilike',
						`%${searchOnNameFilter.value}%`
					).orWhere(
						'playfield.external_id',
						'ilike',
						`%${searchOnNameFilter.value}%`
					);
				});
			}

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return Playfield.fromDBTypeWithCabinet(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfields');
		}
	}

	async countPlayfields(
		filters: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.withCabinet<PlayfieldWithCabinetDBType[]>(this.db('playfield')),
				{
					...filters,
					orderBy: undefined,
					limit: undefined,
					offset: undefined,
				}
			)
				.count('playfield.id as count')
				.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return result?.count ? Number(result.count) : 0;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfields');
		}
	}

	async findPlayfieldsByCabinetId(
		serialNumber: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield[]> {
		try {
			const query = this.selectPlayfieldWithCabinet<
				PlayfieldWithCabinetDBType[]
			>().where('cabinet.serial_number', serialNumber);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return Playfield.fromDBTypeWithCabinet(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfields');
		}
	}

	async getPlayfieldById(
		id: string,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield | undefined> {
		try {
			const query =
				this.selectPlayfieldWithCabinet<PlayfieldWithCabinetDBType>()
					.where('playfield.id', id)
					.select(
						'prize.id as prize_id',
						'prize.name as prize_name',
						'machine_log.is_active as error_is_active',
						'machine_log.code as error_code',
						'machine_log.event_data as error_event_data'
					)
					.leftJoin('playfield_prize', (join) => {
						join
							.on('playfield_prize.playfield_id', 'playfield.id')
							.andOnNull('playfield_prize.removed_at');
					})
					.leftJoin('prize', 'playfield_prize.prize_id', 'prize.id')
					.leftJoin(
						this.db('machine_log')
							.select(
								'machine_log.playfield_id',
								this.db.raw(`data->>'a' as is_active`),
								this.db.raw(`data->>'c' as code`),
								this.db.raw(`data->>'e' as event_data`)
							)
							.first()
							.where('machine_log.playfield_id', id)
							.where('machine_log.level', 'ERROR')
							.orderBy('timestamp', 'desc')
							.as('machine_log'),
						'machine_log.playfield_id',
						'playfield.id'
					)
					.first();

			const result: PlayfieldWithCabinetDBType | undefined =
				await this.applyTenantAndLocationFilters(query, tenantId, locationIds);

			if (!result) {
				return undefined;
			}

			return Playfield.fromDBTypeWithCabinet(result);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not retrieve playfield');
		}
	}

	async createPlayfield(playfield: PlayfieldInsertDBType): Promise<Playfield> {
		try {
			await this.db('playfield').insert(playfield).returning('*').first();

			const created = await this.getPlayfieldById(playfield.id);

			if (!created) {
				throw new Error('Failed to create playfield');
			}

			return created;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseInsertError('Could not create playfield');
		}
	}

	async updatePlayfield(
		playfieldId: string,
		playfield: PlayfieldUpdateDBType,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield> {
		try {
			const query = this.db('playfield')
				.where('playfield.id', playfieldId)
				.update(playfield);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			if (result === 0) {
				throw new Error('Could not find playfield to update');
			}

			const updated = await this.getPlayfieldById(
				playfieldId,
				tenantId,
				locationIds
			);

			if (!updated) {
				throw new Error('Failed to update playfield');
			}

			return updated;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not update playfield');
		}
	}

	async updatePlayfieldLastMessageAt(
		playfieldId: string,
		lastMessageAt: Date,
		tenantId?: string,
		locationIds?: string[]
	): Promise<Playfield> {
		try {
			const query = this.db('playfield')
				.where('playfield.id', playfieldId)
				.andWhere((qb) => {
					qb.whereNull('playfield.last_machine_message').orWhere(
						'playfield.last_machine_message',
						'<',
						lastMessageAt
					);
				})
				.update({
					last_machine_message: lastMessageAt,
				});

			await this.applyTenantAndLocationFilters(query, tenantId, locationIds);

			const updated = await this.getPlayfieldById(
				playfieldId,
				tenantId,
				locationIds
			);

			if (!updated) {
				throw new Error('Failed to update playfield');
			}

			return updated;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError('Could not update playfield');
		}
	}
}

export {PlayfieldRepository};
