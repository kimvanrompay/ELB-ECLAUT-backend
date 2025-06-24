import dayjs from 'dayjs';
import type {Knex} from 'knex';

import {DatabaseInsertError, DatabaseRetrieveError} from '@lib/errors';
import {
	PlayfieldStats,
	type PlayfieldStatsDBType,
	type PopularGametypeStats,
	type PopularLocationStats,
	type PopularPlayfieldCategoryStats,
	type PopularPlayfieldStats,
	type PopularPrizeStats,
} from '@lib/models/playfield-stats';
import {PinoLogger} from '@lib/utils';
import {camelToSnakeCase} from '@lib/utils/string';

import {KnexRepository} from '../knex-repository';
import type {IPlayfieldStatsRepository} from './playfield-stats.repository.types';

// TODO: cleanup queries and less duplication
class PlayfieldStatsRepository
	extends KnexRepository
	implements IPlayfieldStatsRepository
{
	constructor(
		db: Knex,
		context: {
			logger: PinoLogger;
		}
	) {
		super('playfield-stats-repository', db, context);
	}

	override withTransaction(trx: Knex.Transaction): PlayfieldStatsRepository {
		return new PlayfieldStatsRepository(trx, {
			logger: this.logger,
		});
	}

	private convertAndWhereObjectToString(
		where: Record<string, string | number | boolean>
	): string {
		return Object.entries(where)
			.map(
				([key, value]) =>
					`playfield_stats.${camelToSnakeCase(key)} = '${value}'`
			)
			.join(' and ');
	}

	private getTenantAndLocationWhereString(
		loggedInTenantId?: string,
		loggedInLocationIds?: string[]
	): string {
		let whereString = '';
		if (loggedInTenantId) {
			whereString += `and playfield_stats.tenant_id = '${loggedInTenantId}' `;
		}
		if (loggedInLocationIds && loggedInLocationIds.length > 0) {
			whereString += `and playfield_stats.tenant_location_id in (${loggedInLocationIds
				.map((id) => `'${id}'`)
				.join(',')}) `;
		}
		return whereString;
	}

	async getPlayfieldStatsPerHour(
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		groupBy: (
			| 'playfield_id'
			| 'tenant_location_id'
			| 'tenant_id'
			| 'gametype_id'
			| 'serial_number'
			| 'prize_id'
			| 'playfield_category_id'
		)[],
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[]
	): Promise<PlayfieldStats[] | undefined> {
		const {
			playfieldId,
			tenantLocationId,
			tenantId,
			gametypeId,
			prizeId,
			serialNumber,
			playfieldCategoryId,
		} = where;

		if (
			!playfieldId &&
			!tenantLocationId &&
			!tenantId &&
			!gametypeId &&
			!serialNumber &&
			!prizeId &&
			!playfieldCategoryId
		) {
			throw new Error('At least one filter must be provided');
		}

		if (groupBy.length === 0) {
			throw new Error('At least one groupBy must be provided');
		}

		const _groupBy: string[] = [];
		if (groupBy.includes('playfield_id')) {
			_groupBy.push(`game_session.playfield_id`);
		}
		if (groupBy.includes('tenant_location_id')) {
			_groupBy.push(`cabinet.tenant_location_id`);
		}
		if (groupBy.includes('tenant_id')) {
			_groupBy.push(`cabinet.tenant_id`);
		}
		if (groupBy.includes('gametype_id')) {
			_groupBy.push(`playfield.gametype_id`);
		}
		if (groupBy.includes('serial_number')) {
			_groupBy.push(`cabinet.serial_number`);
		}
		if (groupBy.includes('prize_id')) {
			_groupBy.push(`game_session.prize_id`);
		}
		if (groupBy.includes('playfield_category_id')) {
			_groupBy.push(`playfield.category_id`);
		}

		let _where = ``;
		if (playfieldId) {
			_where += `game_session.playfield_id = '${playfieldId}'`;
		}
		if (tenantLocationId) {
			_where += `game_session.tenant_location_id = '${tenantLocationId}'`;
		}
		if (tenantId) {
			_where += `cabinet.tenant_id = '${tenantId}'`;
		}
		if (gametypeId) {
			_where += `playfield.gametype_id = '${gametypeId}'`;
		}
		if (serialNumber) {
			_where += `cabinet.serial_number = '${serialNumber}'`;
		}
		if (prizeId) {
			_where += `game_session.prize_id = '${prizeId}'`;
		}
		if (playfieldCategoryId) {
			_where += `playfield.category_id = '${playfieldCategoryId}'`;
		}
		if (loggedInTenantId) {
			_where += `cabinet.tenant_id = '${loggedInTenantId}'`;
		}
		if (loggedInLocationIds && loggedInLocationIds.length > 0) {
			_where += `cabinet.tenant_location_id in (${loggedInLocationIds
				.map((id) => `'${id}'`)
				.join(',')})`;
		}

		try {
			const query = this.db.raw(`
				with payment_methods as (select hour,
																				${_groupBy.map((g) => g.split('.')[1]).join(', ')},
																				cast(json_object_agg(payment_method, json_build_object(
																					'm', total_money_in,
																					'c', total_count
																																						 )) as jsonb) as payment_method_data
																 from (select date_trunc('hour',
																												 coalesce(game_session.ended_at, game_session.started_at)) as hour,
																							coalesce(game_session.payment_method, 'OTHER')                       as payment_method,
																							sum(game_session.amount_money_in)                                    as total_money_in,
																							count(*)                                                             as total_count,
																							${_groupBy.join(',\n')}
																			 from game_session
																							join playfield on game_session.playfield_id = playfield.id
																							join cabinet on playfield.serial_number = cabinet.serial_number
																			 where ${_where}
																				 and coalesce(game_session.ended_at, game_session.started_at)
																				 between '${startDate.toISOString()}' and '${endDate.toISOString()}'
																			 group by ${_groupBy.join(', ')}, hour, payment_method) as t
																 group by hour, ${_groupBy.map((g) => g.split('.')[1]).join(', ')})
				select 'HOUR'                                                                       as range,
							 date_trunc('hour', coalesce(game_session.ended_at, game_session.started_at)) as start_date,
							 date_trunc('hour', coalesce(game_session.ended_at, game_session.started_at)) + interval '1 hour' -
							 interval '1 second'                                                          as end_date,
							 ${_groupBy.join(',\n')},
							 round(avg(game_session.amount_money_in), 2)                                  as avg_money_in,
							 round(avg(game_session.amount_money_out), 2)                                 as avg_money_out,
							 round(avg(game_session.amount_credits), 2)                                   as avg_credits,
							 round(avg(extract(epoch from (game_session.ended_at - game_session.started_at))),
										 0)                                                                     as avg_play_time,
							 round(min(extract(epoch from (game_session.ended_at - game_session.started_at))),
										 0)                                                                     as min_play_time,
							 round(max(extract(epoch from (game_session.ended_at - game_session.started_at))),
										 0)                                                                     as max_play_time,
							 round(sum(extract(epoch from (game_session.ended_at - game_session.started_at))),
										 0)                                                                     as sum_play_time,
							 sum(game_session.amount_money_in - game_session.amount_money_out)            as profit,
							 count("game_session"."id")                                                   as count_game_sessions,
							 sum(amount_money_in)                                                         as sum_money_in,
							 sum(amount_money_out)                                                        as sum_money_out,
							 sum(amount_credits)                                                          as sum_credits,
							 max(amount_money_in)                                                         as max_money_in,
							 max(amount_money_out)                                                        as max_money_out,
							 max(amount_credits)                                                          as max_credits,
							 min(amount_money_in)                                                         as min_money_in,
							 min(amount_money_out)                                                        as min_money_out,
							 min(amount_credits)                                                          as min_credits,
							 payment_methods.payment_method_data                                          as payment_methods
				from "game_session"
							 inner join "playfield" on "game_session"."playfield_id" = "playfield"."id"
							 inner join "cabinet" on "playfield"."serial_number" = "cabinet"."serial_number"
							 left join payment_methods
												 on payment_methods.hour = date_trunc('hour',
													 coalesce(game_session.ended_at, game_session.started_at))
													 ${_groupBy.map((group) => `and ${group} = payment_methods.${group.split('.')[1]}`).join(' ')}
				where ${_where}
					and coalesce(game_session.ended_at, game_session.started_at) between '${startDate.toISOString()}' and '${endDate.toISOString()}'
				group by ${_groupBy.join(', ')}, start_date, end_date, payment_methods.payment_method_data;`);

			console.log('query', query.toQuery());

			const result: {
				rows: PlayfieldStatsDBType[];
			} = await query;
			if (!result || result?.rows?.length <= 0) {
				return undefined;
			}

			return PlayfieldStats.fromDBType(result.rows);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve pre-generated playfield statistics'
			);
		}
	}

	async getPlayfieldStatsByUnitMoreThanADay(
		unit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR',
		groupBy:
			| 'playfield_id'
			| 'tenant_location_id'
			| 'tenant_id'
			| 'gametype_id'
			| 'serial_number'
			| 'prize_id'
			| 'playfield_category_id',
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PlayfieldStats[] | undefined> {
		try {
			const _unit = unit.toLowerCase();

			let _andWhere = ``;
			if (where.playfieldId) {
				_andWhere += `and playfield_stats.playfield_id = '${where.playfieldId}'`;
			}
			if (where.tenantLocationId) {
				_andWhere += `and playfield_stats.tenant_location_id = '${where.tenantLocationId}'`;
			}
			if (where.tenantId) {
				_andWhere += `and playfield_stats.tenant_id = '${where.tenantId}'`;
			}
			if (where.gametypeId) {
				_andWhere += `and playfield_stats.gametype_id = '${where.gametypeId}'`;
			}
			if (where.serialNumber) {
				_andWhere += `and playfield_stats.serial_number = '${where.serialNumber}'`;
			}
			if (where.prizeId) {
				_andWhere += `and playfield_stats.prize_id = '${where.prizeId}'`;
			}
			if (where.playfieldCategoryId) {
				_andWhere += `and playfield_stats.playfield_category_id = '${where.playfieldCategoryId}'`;
			}
			if (loggedInTenantId) {
				_andWhere += `and playfield_stats.tenant_id = '${loggedInTenantId}'`;
			}
			if (loggedInLocationIds && loggedInLocationIds.length > 0) {
				_andWhere += `and playfield_stats.tenant_location_id in (${loggedInLocationIds
					.map((id) => `'${id}'`)
					.join(',')})`;
			}

			const query = this.db.raw(`
				with payment_methods_data as (select period,
																						 ${groupBy},
																						 json_object_agg(key, json_build_object('m', total, 'c', count))::jsonb as payment_methods
																			from (select date_trunc('${_unit}', playfield_stats.start_date) as period,
																									 ${groupBy},
																									 key,
																									 sum((value ->> 'm')::decimal)                      as total,
																									 sum((value ->> 'c')::int)                          as count
																						from playfield_stats, jsonb_each(payment_methods)
																						where start_date between '${startDate.toISOString()}'::timestamp and '${endDate.toISOString()}'::timestamp
																							${_andWhere}
																						group by key, period, ${groupBy}) as t
																			group by period, ${groupBy}),
						 game_sessions_per_hour_data as (select period,
																										${groupBy},
																										json_object_agg(key, total)::jsonb as game_sessions_per_hour
																						 from (select ${groupBy},
																													date_trunc('${_unit}', playfield_stats.start_date) as period,
																													key,
																													sum((value)::decimal)                              as total
																									 from playfield_stats, jsonb_each(game_sessions_per_hour)
																									 where start_date between '${startDate.toISOString()}'::timestamp and '${endDate.toISOString()}'::timestamp
																										 ${_andWhere}
																									 group by key, period, ${groupBy}) as t
																						 group by period, ${groupBy})
				select playfield_stats.${groupBy},
							 '${_unit}'                                         as range,
							 date_trunc('${_unit}', playfield_stats.start_date) as date_start,
							 date_trunc('${_unit}', playfield_stats.start_date) + interval '1 ${_unit}' -
							 interval '1 second'                                as date_end,
							 cast(sum(avg_money_in * count_game_sessions) as decimal) /
							 sum(count_game_sessions)                           as avg_money_in,
							 cast(sum(avg_money_out * count_game_sessions) as decimal) /
							 sum(count_game_sessions)                           as avg_money_out,
							 cast(sum(avg_credits * count_game_sessions) as decimal) /
							 sum(count_game_sessions)                           as avg_credits,
							 cast(sum(avg_play_time * count_game_sessions) as decimal) /
							 sum(count_game_sessions)                           as avg_play_time,
							 sum(count_game_sessions)                           as count_game_sessions,
							 sum(sum_money_in)                                  as sum_money_in,
							 sum(sum_money_out)                                 as sum_money_out,
							 sum(sum_credits)                                   as sum_credits,
							 sum(sum_profit)                                    as sum_profit,
							 sum(sum_play_time)                                 as sum_play_time,
							 min(min_money_in)                                  as min_money_in,
							 min(min_money_out)                                 as min_money_out,
							 min(min_credits)                                   as min_credits,
							 min(min_play_time)                                 as min_play_time,
							 max(max_money_in)                                  as max_money_in,
							 max(max_money_out)                                 as max_money_out,
							 max(max_credits)                                   as max_credits,
							 max(max_play_time)                                 as max_play_time,
							 payment_methods_data.payment_methods,
							 game_sessions_per_hour_data.game_sessions_per_hour
				from playfield_stats
							 join payment_methods_data
										on payment_methods_data.period = date_trunc('${_unit}', playfield_stats.start_date) and
											 payment_methods_data.${groupBy} = playfield_stats.${groupBy}
							 join game_sessions_per_hour_data
										on game_sessions_per_hour_data.period = date_trunc('${_unit}', playfield_stats.start_date) and
											 game_sessions_per_hour_data.${groupBy} = playfield_stats.${groupBy}
				where playfield_stats.start_date between '${startDate.toISOString()}'::timestamp
								and '${endDate.toISOString()}'::timestamp
					${_andWhere}
				group by playfield_stats.${groupBy}, date_end, date_start, payment_methods_data.payment_methods,
					game_sessions_per_hour_data.game_sessions_per_hour
																 ${orderBy ? `order by ${orderBy}` : ''}
																 ${limit ? `limit ${limit}` : ''}
			`);

			const result: {
				rows: (Omit<PlayfieldStatsDBType, 'start_date' | 'end_date'> & {
					date_start: Date;
					date_end: Date;
				})[];
			} = await query;

			if (!result || result?.rows?.length <= 0) {
				return undefined;
			}

			return PlayfieldStats.fromDBType(
				result.rows.map((item) => ({
					...item,
					start_date: item.date_start,
					end_date: item.date_end,
				}))
			);
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve pre-generated playfield statistics'
			);
		}
	}

	async generateAndSavePlayfieldStatsForDate(
		playfieldId: string,
		date: Date
	): Promise<void> {
		try {
			const startDate = dayjs(date).startOf('day').toDate();
			const endDate = dayjs(date).endOf('day').toDate();

			this.logger.info(
				`Generating playfield stats for playfield ${playfieldId} between ${startDate.toISOString()} and ${endDate.toISOString()}`
			);

			const query = this.db.raw(`
				with game_sessions_per_hour_data as (select prize_id,
																										json_object_agg(games_per_hour_value.hour,
																																		games_per_hour_value.count)::jsonb as game_sessions_per_hour
																						 from (select extract(hour from
																																	coalesce(game_session.ended_at, game_session.started_at)) as hour,
																													count(game_session.id)                                            as count,
																													game_session.prize_id
																									 from game_session
																									 where game_session.playfield_id = '${playfieldId}'
																										 and coalesce(game_session.ended_at, game_session.started_at) between '${startDate.toISOString()}' and '${endDate.toISOString()}'
																									 group by hour, game_session.prize_id) as games_per_hour_value
																						 group by prize_id),

						 payment_methods_data as (select prize_id,
																						 json_object_agg(payment_method, json_build_object(
																							 'm', total_money_in,
																							 'c', total_count
																																						 ))::jsonb as payment_methods
																			from (select coalesce(game_session.payment_method, 'OTHER') as payment_method,
																									 sum(game_session.amount_money_in)              as total_money_in,
																									 count(*)                                       as total_count,
																									 game_session.prize_id
																						from game_session
																						where game_session.playfield_id = '${playfieldId}'
																							and coalesce(game_session.ended_at, game_session.started_at)
																							between '${startDate.toISOString()}' and '${endDate.toISOString()}'
																						group by payment_method, game_session.prize_id) as payment_method_data
																			group by prize_id)


				insert
				into playfield_stats
					(select gen_random_uuid()                                                 as id,
									'DAY'                                                             as range,
									'${startDate.toISOString()}'::date                                as start_date,
									'${endDate.toISOString()}'::date                                  as end_date,

									cabinet.tenant_id,
									cabinet.tenant_location_id,
									game_session.playfield_id,
									cabinet.serial_number,
									playfield.gametype_id,
									count(game_session.id)                                            as count_game_sessions,

									sum(game_session.amount_money_in)                                 as sum_money_in,
									round(avg(game_session.amount_money_in), 2)                       as avg_money_in,
									min(game_session.amount_money_in)                                 as min_money_in,
									max(game_session.amount_money_in)                                 as max_money_in,

									sum(game_session.amount_money_out)                                as sum_money_out,
									round(avg(game_session.amount_money_out), 2)                      as avg_money_out,
									min(game_session.amount_money_out)                                as min_money_out,
									max(game_session.amount_money_out)                                as max_money_out,

									sum(game_session.amount_credits)                                  as sum_credits,
									round(avg(game_session.amount_credits) * 100, 2)                  as avg_credits,
									min(game_session.amount_credits)                                  as min_credits,
									max(game_session.amount_credits)                                  as max_credits,

									sum(game_session.amount_money_in - game_session.amount_money_out) as sum_profit,

									round(avg(extract(epoch from (game_session.ended_at - game_session.started_at))),
												0)                                                          as avg_play_time,
									round(min(extract(epoch from (game_session.ended_at - game_session.started_at))),
												0)                                                          as min_play_time,
									round(max(extract(epoch from (game_session.ended_at - game_session.started_at))),
												0)                                                          as max_play_time,
									round(sum(extract(epoch from (game_session.ended_at - game_session.started_at))),
												0)                                                          as sum_play_time,
									game_sessions_per_hour_data.game_sessions_per_hour,
									payment_methods_data.payment_methods,
									current_timestamp                                                 as created_at,
									current_timestamp                                                 as updated_at,
									game_session.prize_id,
									playfield.category_id                                             as playfield_category_id

					 from game_session
									inner join playfield on game_session.playfield_id = playfield.id
									inner join cabinet on playfield.serial_number = cabinet.serial_number
									left join game_sessions_per_hour_data on
						 (game_sessions_per_hour_data.prize_id = game_session.prize_id) or
						 (game_sessions_per_hour_data.prize_id is null and game_session.prize_id is null)
									left join payment_methods_data on
						 (payment_methods_data.prize_id = game_session.prize_id) or
						 (payment_methods_data.prize_id is null and game_session.prize_id is null)
					 where game_session.playfield_id = '${playfieldId}'
						 and coalesce(game_session.ended_at, game_session.started_at) between '${startDate.toISOString()}' and '${endDate.toISOString()}'
					 group by game_session.playfield_id,
										game_session.prize_id,
										playfield.gametype_id,
										playfield.category_id,
										cabinet.serial_number,
										cabinet.tenant_id,
										cabinet.tenant_location_id,
										payment_methods_data.payment_methods,
										game_sessions_per_hour_data.game_sessions_per_hour)
				on conflict (range, playfield_id, start_date, end_date, tenant_id, tenant_location_id, prize_id)
					do update set updated_at             = CURRENT_TIMESTAMP,
												range                  = EXCLUDED.range,
												id                     = playfield_stats.id,
												created_at             = playfield_stats.created_at,
												start_date             = EXCLUDED.start_date,
												end_date               = EXCLUDED.end_date,
												playfield_id           = EXCLUDED.playfield_id,
												gametype_id            = EXCLUDED.gametype_id,
												prize_id               = EXCLUDED.prize_id,
												playfield_category_id  = EXCLUDED.playfield_category_id,
												serial_number          = EXCLUDED.serial_number,
												tenant_id              = EXCLUDED.tenant_id,
												tenant_location_id     = EXCLUDED.tenant_location_id,
												avg_money_in           = EXCLUDED.avg_money_in,
												avg_money_out          = EXCLUDED.avg_money_out,
												avg_credits            = EXCLUDED.avg_credits,
												avg_play_time          = EXCLUDED.avg_play_time,
												sum_play_time          = EXCLUDED.sum_play_time,
												min_play_time          = EXCLUDED.min_play_time,
												max_play_time          = EXCLUDED.max_play_time,
												sum_profit             = EXCLUDED.sum_profit,
												count_game_sessions    = EXCLUDED.count_game_sessions,
												sum_money_in           = EXCLUDED.sum_money_in,
												sum_money_out          = EXCLUDED.sum_money_out,
												sum_credits            = EXCLUDED.sum_credits,
												max_money_in           = EXCLUDED.max_money_in,
												max_money_out          = EXCLUDED.max_money_out,
												max_credits            = EXCLUDED.max_credits,
												min_money_in           = EXCLUDED.min_money_in,
												min_money_out          = EXCLUDED.min_money_out,
												min_credits            = EXCLUDED.min_credits,
												game_sessions_per_hour = EXCLUDED.game_sessions_per_hour,
												payment_methods        = EXCLUDED.payment_methods
			`);

			await query;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseInsertError(
				`Could not generate day (${dayjs(date).startOf('day').toDate().toISOString()}) statistics for playfield`
			);
		}
	}

	async findPlayfieldStatsByRange(
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		groupBy: (
			| 'playfield_id'
			| 'tenant_location_id'
			| 'tenant_id'
			| 'gametype_id'
			| 'serial_number'
			| 'prize_id'
			| 'playfield_category_id'
		)[],
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PlayfieldStats[] | undefined> {
		switch (unit) {
			case 'HOUR':
				return this.getPlayfieldStatsPerHour(
					where,
					groupBy,
					startDate,
					endDate,
					loggedInTenantId,
					loggedInLocationIds
				);
			case 'DAY':
			case 'WEEK':
			case 'MONTH':
				return this.getPlayfieldStatsByUnitMoreThanADay(
					unit,
					groupBy[0]!, // TODO: make array
					where,
					startDate,
					endDate,
					loggedInTenantId,
					loggedInLocationIds,
					limit,
					orderBy
				);
			default:
				return undefined;
		}
	}

	async getPopularPrizeStatsForRange(
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularPrizeStats[]> {
		try {
			let _andWhere = this.convertAndWhereObjectToString(where);

			_andWhere += this.getTenantAndLocationWhereString(
				loggedInTenantId,
				loggedInLocationIds
			);

			const query = this.db.raw(`
				select coalesce(playfield_stats.prize_id, 'unknown') as prize_id,
							 coalesce(prize.name, 'NO PRIZE')              as prize_name,
							 sum(count_game_sessions)                      as count_game_sessions,
							 sum(sum_money_in)                             as sum_money_in,
							 sum(sum_money_out)                            as sum_money_out,
							 sum(sum_profit)                               as sum_profit,
							 sum(sum_play_time)                            as sum_play_time,
							 cast(sum(avg_play_time * count_game_sessions) as decimal) /
							 sum(count_game_sessions)                      as avg_play_time
				from playfield_stats
							 left join prize on playfield_stats.prize_id = prize.id
				where playfield_stats.start_date between '${startDate.toISOString()}'::timestamp
					and '${endDate.toISOString()}'::timestamp
					and ${_andWhere}
				group by playfield_stats.prize_id,
								 prize.name ${orderBy ? `order by ${orderBy}` : ''}
									 ${limit ? `limit ${limit}` : ''};
			`);

			const result: {rows: any[]} = await query;

			if (!result || result?.rows?.length <= 0) {
				return [];
			}

			return result.rows?.map((prize) => ({
				prizeId: prize.prize_id,
				prizeName: prize.prize_name,
				countGameSessions: Number(prize.count_game_sessions),
				sumMoneyIn: Number(prize.sum_money_in),
				sumMoneyOut: Number(prize.sum_money_out),
				sumProfit: Number(prize.sum_profit),
				sumPlayTime: Number(prize.sum_play_time),
				avgPlayTime: Number(prize.avg_play_time),
			}));
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve prize statistics for range'
			);
		}
	}

	async getPopularPlayfieldStatsForRange(
		where: {
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularPlayfieldStats[]> {
		try {
			let _andWhere = this.convertAndWhereObjectToString(where);

			_andWhere += this.getTenantAndLocationWhereString(
				loggedInTenantId,
				loggedInLocationIds
			);

			const query = this.db.raw(`
				select playfield_stats.playfield_id,
							 playfield.name           as playfield_name,
							 playfield.external_id,
							 cabinet.serial_number,
							 cabinet.name             as cabinet_name,
							 playfield_stats.gametype_id,
							 gametype.name            as gametype_name,
							 playfield_stats.playfield_category_id,
							 playfield_category.name  as playfield_category_name,
							 sum(count_game_sessions) as count_game_sessions,
							 sum(sum_money_in)        as sum_money_in,
							 sum(sum_money_out)       as sum_money_out,
							 sum(sum_profit)          as sum_profit,
							 sum(sum_play_time)       as sum_play_time,
							 cast(sum(avg_play_time * count_game_sessions) as decimal) /
							 sum(count_game_sessions) as avg_play_time
				from playfield_stats
							 inner join cabinet on playfield_stats.serial_number = cabinet.serial_number
							 inner join playfield on playfield_stats.playfield_id = playfield.id
							 inner join gametype on playfield_stats.gametype_id = gametype.id
							 left join playfield_category on playfield.category_id = playfield_category.id
				where playfield_stats.start_date between '${startDate.toISOString()}'::timestamp
					and '${endDate.toISOString()}'::timestamp
					and ${_andWhere}
				group by playfield_stats.playfield_id, cabinet.serial_number, playfield_stats.gametype_id, playfield.name,
								 cabinet.name, playfield_category.name, playfield_stats.playfield_category_id, playfield.external_id,
								 gametype.name ${orderBy ? `order by ${orderBy}` : ''}
									 ${limit ? `limit ${limit}` : ''};
			`);

			const result: {rows: any[]} = await query;

			if (!result || result?.rows?.length <= 0) {
				return [];
			}

			return result.rows?.map((playfieldStat) => ({
				playfieldId: playfieldStat.playfield_id,
				playfieldName: playfieldStat.playfield_name,
				serialNumber: playfieldStat.serial_number,
				cabinetName: playfieldStat.cabinet_name,
				gametypeId: playfieldStat.gametype_id,
				gametypeName: playfieldStat.gametype_name,
				countGameSessions: Number(playfieldStat.count_game_sessions),
				sumMoneyIn: Number(playfieldStat.sum_money_in),
				sumMoneyOut: Number(playfieldStat.sum_money_out),
				sumProfit: Number(playfieldStat.sum_profit),
				sumPlayTime: Number(playfieldStat.sum_play_time),
				avgPlayTime: Number(playfieldStat.avg_play_time),
			}));
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve playfield statistics for range'
			);
		}
	}

	async getPopularGametypeStatsForRange(
		where: {
			tenantLocationId?: string;
			tenantId?: string;
			serialNumber?: string;
			prizeId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularGametypeStats[]> {
		try {
			let _andWhere = this.convertAndWhereObjectToString(where);

			_andWhere += this.getTenantAndLocationWhereString(
				loggedInTenantId,
				loggedInLocationIds
			);

			const query = this.db.raw(`
				select playfield_stats.gametype_id,
							 gametype.name            as gametype_name,
							 sum(count_game_sessions) as count_game_sessions,
							 sum(sum_money_in)        as sum_money_in,
							 sum(sum_money_out)       as sum_money_out,
							 sum(sum_profit)          as sum_profit,
							 sum(sum_play_time)       as sum_play_time,
							 cast(sum(avg_play_time * count_game_sessions) as decimal) /
							 sum(count_game_sessions) as avg_play_time
				from playfield_stats
							 inner join playfield on playfield_stats.playfield_id = playfield.id
							 inner join gametype on playfield.gametype_id = gametype.id
				where playfield_stats.start_date between '${startDate.toISOString()}'::timestamp
					and '${endDate.toISOString()}'::timestamp
					and ${_andWhere}
				group by playfield_stats.gametype_id,
								 gametype.name ${orderBy ? `order by ${orderBy}` : ''}
									 ${limit ? `limit ${limit}` : ''};
			`);

			const result: {rows: any[]} = await query;

			if (!result || result?.rows?.length <= 0) {
				return [];
			}

			return result.rows?.map((gametypeStat) => ({
				gametypeId: gametypeStat.gametype_id,
				gametypeName: gametypeStat.gametype_name,
				countGameSessions: Number(gametypeStat.count_game_sessions),
				sumMoneyIn: Number(gametypeStat.sum_money_in),
				sumMoneyOut: Number(gametypeStat.sum_money_out),
				sumProfit: Number(gametypeStat.sum_profit),
				sumPlayTime: Number(gametypeStat.sum_play_time),
				avgPlayTime: Number(gametypeStat.avg_play_time),
			}));
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve gametype statistics for range'
			);
		}
	}

	async getPopularLocationStatsForRange(
		where: {
			tenantId?: string;
			gametypeId?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularLocationStats[]> {
		try {
			let _andWhere = this.convertAndWhereObjectToString(where);

			_andWhere += this.getTenantAndLocationWhereString(
				loggedInTenantId,
				loggedInLocationIds
			);

			const query = this.db.raw(`
				select playfield_stats.tenant_location_id,
							 tenant_location.name     as tenant_location_name,
							 playfield_stats.tenant_id,
							 tenant.name              as tenant_name,
							 sum(count_game_sessions) as count_game_sessions,
							 sum(sum_money_in)        as sum_money_in,
							 sum(sum_money_out)       as sum_money_out,
							 sum(sum_profit)          as sum_profit,
							 sum(sum_play_time)       as sum_play_time,
							 cast(sum(avg_play_time * count_game_sessions) as decimal) /
							 sum(count_game_sessions) as avg_play_time
				from playfield_stats
							 inner join tenant_location on playfield_stats.tenant_location_id = tenant_location.id
							 inner join tenant on playfield_stats.tenant_id = tenant.id
				where playfield_stats.start_date between '${startDate.toISOString()}'::timestamp
					and '${endDate.toISOString()}'::timestamp
					and ${_andWhere}
				group by playfield_stats.tenant_location_id,
								 tenant_location.name,
								 playfield_stats.tenant_id,
								 tenant.name ${orderBy ? `order by ${orderBy}` : ''}
									 ${limit ? `limit ${limit}` : ''};
			`);

			const result: {rows: any[]} = await query;

			if (!result || result?.rows?.length <= 0) {
				return [];
			}

			return result.rows?.map((locationStat) => ({
				tenantLocationId: locationStat.tenant_location_id,
				tenantLocationName: locationStat.tenant_location_name,
				tenantId: locationStat.tenant_id,
				tenantName: locationStat.tenant_name,
				countGameSessions: Number(locationStat.count_game_sessions),
				sumMoneyIn: Number(locationStat.sum_money_in),
				sumMoneyOut: Number(locationStat.sum_money_out),
				sumProfit: Number(locationStat.sum_profit),
				sumPlayTime: Number(locationStat.sum_play_time),
				avgPlayTime: Number(locationStat.avg),
			}));
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve location statistics for range'
			);
		}
	}

	async getPopularPlayfieldCategoryStatsForRange(
		where: {
			tenantLocationId?: string;
			tenantId?: string;
			serialNumber?: string;
			prizeId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularPlayfieldCategoryStats[]> {
		try {
			let _andWhere = this.convertAndWhereObjectToString(where);

			_andWhere += this.getTenantAndLocationWhereString(
				loggedInTenantId,
				loggedInLocationIds
			);

			const query = this.db.raw(`
				select playfield_stats.playfield_category_id as playfield_category_id,
							 playfield_category.name               as playfield_category_name,
							 sum(count_game_sessions)              as count_game_sessions,
							 sum(sum_money_in)                     as sum_money_in,
							 sum(sum_money_out)                    as sum_money_out,
							 sum(sum_profit)                       as sum_profit,
							 sum(sum_play_time)                    as sum_play_time,
							 cast(sum(avg_play_time * count_game_sessions) as decimal) /
							 sum(count_game_sessions)              as avg_play_time
				from playfield_stats
							 inner join playfield on playfield_stats.playfield_id = playfield.id
							 inner join playfield_category on playfield.category_id = playfield_category.id
				where playfield_stats.start_date between '${startDate.toISOString()}'::timestamp
					and '${endDate.toISOString()}'::timestamp
					and ${_andWhere}
				group by playfield_stats.playfield_category_id,
								 playfield_category.name ${orderBy ? `order by ${orderBy}` : ''}
									 ${limit ? `limit ${limit}` : ''};
			`);

			const result: {rows: any[]} = await query;

			if (!result || result?.rows?.length <= 0) {
				return [];
			}

			return result.rows?.map((playfieldCategoryStat) => ({
				playfieldCategoryId: playfieldCategoryStat.playfield_category_id,
				playfieldCategoryName: playfieldCategoryStat.playfield_category_name,
				countGameSessions: Number(playfieldCategoryStat.count_game_sessions),
				sumMoneyIn: Number(playfieldCategoryStat.sum_money_in),
				sumMoneyOut: Number(playfieldCategoryStat.sum_money_out),
				sumProfit: Number(playfieldCategoryStat.sum_profit),
				sumPlayTime: Number(playfieldCategoryStat.sum_play_time),
				avgPlayTime: Number(playfieldCategoryStat.avg_play_time),
			}));
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve playfield category statistics for range'
			);
		}
	}
}

export {PlayfieldStatsRepository};
