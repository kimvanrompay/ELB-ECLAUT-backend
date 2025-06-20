import type {Knex} from 'knex';

import {
	DatabaseInsertError,
	DatabaseRetrieveError,
	NotFoundError,
} from '@lib/errors';
import {MachineLog, type MachineLogInsertDBType} from '@lib/models/machine-log';
import type {MachineLogDBType} from '@lib/models/machine-log';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import {KnexRepository} from '../knex-repository';
import type {IMachineLogRepository} from './machine-log.repository.types';

class MachineLogRepository
	extends KnexRepository
	implements IMachineLogRepository
{
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('machine-log-repository', db, context);
	}

	override withTransaction(trx: Knex.Transaction): MachineLogRepository {
		return new MachineLogRepository(trx, {logger: this.logger});
	}

	private applyTenantAndLocationFilters<Query extends Knex.QueryBuilder>(
		query: Query,
		tenantId?: string,
		locationIds?: string[]
	): Query {
		const hasTenantId = tenantId !== undefined;
		const hasLocationIds = locationIds !== undefined && locationIds.length > 0;

		if (hasTenantId || hasLocationIds) {
			query
				.select('machine_log.*')
				.join('cabinet', 'cabinet.serial_number', 'machine_log.serial_number');
		}

		if (tenantId) {
			query.where('tenant_id', tenantId);
		}

		if (locationIds && locationIds.length > 0) {
			query.whereIn('location_id', locationIds);
		}

		return query;
	}

	async findMachineLogs(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<MachineLog[]> {
		try {
			const query = KnexFilterAdapter.applyFilters(
				this.db<MachineLogDBType>('machine_log'),
				filters
			);

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return MachineLog.fromDBType(result);
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving machine logs');
		}
	}

	async findMachineLogsForCabinet(
		serialNumber: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<MachineLog[]> {
		const _filters = filters ?? {};
		_filters.where = _filters.where ?? [];

		_filters.where.push({
			type: 'eq',
			columnName: 'machine_log.serial_number',
			value: serialNumber,
		});

		return this.findMachineLogs(_filters, tenantId, locationIds);
	}

	async findMachineLogsForPlayfield(
		playfieldId: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<MachineLog[]> {
		const _filters = filters ?? {};
		_filters.where = _filters.where ?? [];

		_filters.where.push({
			type: 'eq',
			columnName: 'machine_log.playfield_id',
			value: playfieldId,
		});

		return this.findMachineLogs(_filters, tenantId, locationIds);
	}

	async countMachineLogs(
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number> {
		try {
			const query = KnexFilterAdapter.applyFilters(this.db('machine_log'), {
				...filters,
				orderBy: undefined,
				limit: undefined,
				offset: undefined,
			})
				.count('machine_log.id as count')
				.first();

			const result = await this.applyTenantAndLocationFilters(
				query,
				tenantId,
				locationIds
			);

			return result?.count ? Number(result.count) : 0;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError('Error retrieving machine logs');
		}
	}

	async countMachineLogsForCabinet(
		serialNumber: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number> {
		const _filters = filters ?? {};
		_filters.where = _filters.where ?? [];

		_filters.where.push({
			type: 'eq',
			columnName: 'machine_log.serial_number',
			value: serialNumber,
		});

		return this.countMachineLogs(_filters, tenantId, locationIds);
	}

	async countMachineLogsForPlayfield(
		playfieldId: string,
		filters?: DatabaseQueryFilters,
		tenantId?: string,
		locationIds?: string[]
	): Promise<number> {
		const _filters = filters ?? {};
		_filters.where = _filters.where ?? [];

		_filters.where.push({
			type: 'eq',
			columnName: 'machine_log.playfield_id',
			value: playfieldId,
		});

		return this.countMachineLogs(_filters, tenantId, locationIds);
	}

	async getMachineLogById(id: string): Promise<MachineLog | undefined> {
		try {
			const result = await this.db
				.select<MachineLogDBType[]>('*')
				.from('machine_log')
				.where({id: id})
				.first();

			return result ? MachineLog.fromDBType(result) : undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError(
				`Error retrieving machine log with id: ${id}`
			);
		}
	}

	async createMachineLog(
		machineLog: MachineLogInsertDBType
	): Promise<MachineLog> {
		try {
			await this.db('machine_log')
				.insert(machineLog)
				.returning<MachineLogDBType[]>('*');

			const result = await this.getMachineLogById(machineLog.id);

			if (!result) {
				throw new NotFoundError('Error creating machine log');
			}

			return result;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseInsertError('Error creating machine log');
		}
	}

	async getLastActiveStatusMessageForPlayfield(
		playfieldId: string
	): Promise<MachineLog | undefined> {
		try {
			const result = await this.db
				.select<MachineLogDBType[]>('*')
				.from('machine_log')
				.where({playfield_id: playfieldId})
				.andWhere('type', 'STATUS')
				.andWhere(this.db.raw(`data->>'s' = 'ACTIVE'`))
				.orderBy('created_at', 'desc')
				.first();

			return result ? MachineLog.fromDBType(result) : undefined;
		} catch (e) {
			this.logger.error(e);
			throw new DatabaseRetrieveError(
				`Error retrieving machine log with playfield id: ${playfieldId}`
			);
		}
	}
}

export {MachineLogRepository};
