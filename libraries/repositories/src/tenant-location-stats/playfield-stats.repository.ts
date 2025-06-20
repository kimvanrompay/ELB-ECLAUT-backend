import dayjs from 'dayjs';
import type {Knex} from 'knex';
import {v4 as uuid} from 'uuid';

import {DatabaseRetrieveError} from '@lib/errors';
import {PlayfieldStats} from '@lib/models/playfield-stats';
import {PinoLogger} from '@lib/utils';

import {KnexRepository} from '../knex-repository';

class PlayfieldStatsRepository extends KnexRepository {
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

	async getPlayfieldStatsByPlayfieldIdBetweenDatePerHour(
		playfieldId: string,
		startDate: Date,
		endDate: Date
	): Promise<PlayfieldStats[] | undefined> {
		const query = this.db.raw(`
			with payment_methods as (select hour,
																			cast(json_object_agg(payment_method, json_build_object(
																				'm', total_money_in,
																				'c', total_count
																																					 )) as jsonb) as payment_method_data
															 from (select date_trunc('hour',
																											 coalesce(game_session.ended_at, game_session.started_at)) as hour,
																						coalesce(game_session.payment_method, 'OTHER')                       as payment_method,
																						sum(game_session.amount_money_in)                                    as total_money_in,
																						count(*)                                                             as total_count
																		 from game_session
																		 where game_session.playfield_id = '${playfieldId}'
																			 and coalesce(game_session.ended_at, game_session.started_at)
																			 between '${startDate.toISOString()}' and '${endDate.toISOString()}'
																		 group by hour, payment_method) as t
															 group by hour)
			select 'HOUR'                                                                       as type,
						 date_trunc('hour', coalesce(game_session.ended_at, game_session.started_at)) as start_date,
						 "game_session"."playfield_id",
						 "playfield"."gametype_id",
						 "cabinet"."serial_number",
						 "cabinet"."tenant_id",
						 "cabinet"."tenant_location_id",
						 round(avg(game_session.amount_money_in), 2)                                  as avg_money_in,
						 round(avg(game_session.amount_money_out), 2)                                 as avg_money_out,
						 round(avg(game_session.amount_credits), 2)                                   as avg_credits,
						 round(avg(extract(seconds from (game_session.ended_at - game_session.started_at))),
									 0)                                                                     as avg_play_time,
						 round(min(extract(seconds from (game_session.ended_at - game_session.started_at))),
									 0)                                                                     as min_play_time,
						 round(max(extract(seconds from (game_session.ended_at - game_session.started_at))),
									 0)                                                                     as max_play_time,
						 round(sum(extract(seconds from (game_session.ended_at - game_session.started_at))),
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

			where "game_session"."playfield_id" = '${playfieldId}'
				and coalesce(game_session.ended_at, game_session.started_at) between '${startDate.toISOString()}' and '${endDate.toISOString()}'
			group by "game_session"."playfield_id", "playfield"."gametype_id", "cabinet"."serial_number",
							 "cabinet"."tenant_id",
							 "cabinet"."tenant_location_id", start_date, payment_methods.payment_method_data;`);

		const resultData = await query;

		if (!resultData || resultData.rowCount === 0) {
			return undefined;
		}

		return PlayfieldStats.fromDBType(resultData.rows);
	}

	async getPlayfieldStatsByPlayfieldIdBetweenDatePerDay(
		playfieldId: string,
		startDate: Date,
		endDate: Date
	): Promise<PlayfieldStats[] | undefined> {
		try {
			const query = this.db('playfield_stats')
				.where({
					range: 'DAY',
					playfield_id: playfieldId,
				})
				.andWhere('start_date', '>=', startDate)
				.andWhere('end_date', '<=', endDate);

			const result = await query;

			if (result.length === 0) {
				return undefined;
			}

			return PlayfieldStats.fromDBType(result);
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

			const query = this.db.raw(`
				with payment_methods as (select hour,
																				cast(json_object_agg(payment_method, json_build_object(
																					'm', total_money_in,
																					'c', total_count
																																						 )) as jsonb) as payment_method_data
																 from (select date_trunc('hour',
																												 coalesce(game_session.ended_at, game_session.started_at)) as hour,
																							coalesce(game_session.payment_method, 'OTHER')                       as payment_method,
																							sum(game_session.amount_money_in)                                    as total_money_in,
																							count(*)                                                             as total_count
																			 from game_session
																			 where game_session.playfield_id = '${playfieldId}'
																				 and coalesce(game_session.ended_at, game_session.started_at)
																				 between '${startDate.toISOString()}' and '${endDate.toISOString()}'
																			 group by hour, payment_method) as t
																 group by hour)
				insert
				into playfield_stats
					(select '${uuid()}'                                                       as id,
									'DAY'                                                             as range,
									'${startDate.toISOString()}'::timestamp                           as start_date,
									'${endDate.toISOString()}'::timestamp                             as end_date,

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
									round(avg(game_session.amount_credits), 2)                        as avg_credits,
									min(game_session.amount_credits)                                  as min_credits,
									max(game_session.amount_credits)                                  as max_credits,

									sum(game_session.amount_money_in - game_session.amount_money_out) as sum_profit,

									round(avg(extract(milliseconds from (game_session.ended_at - game_session.started_at))),
												0)                                                          as avg_play_time,
									round(min(extract(milliseconds from (game_session.ended_at - game_session.started_at))),
												0)                                                          as min_play_time,
									round(max(extract(milliseconds from (game_session.ended_at - game_session.started_at))),
												0)                                                          as max_play_time,
									round(sum(extract(milliseconds from (game_session.ended_at - game_session.started_at))),
												0)                                                          as sum_play_time,
									(select json_object_agg(games_per_hour_value.hour, games_per_hour_value.count)
									 from (select extract(hour from coalesce(game_session.ended_at, game_session.started_at)) as hour,
																count(game_session.id)                                                      as count
												 from game_session
												 where game_session.playfield_id = '${playfieldId}'
													 and coalesce(game_session.ended_at, game_session.started_at) between '${startDate.toISOString()}' and '${endDate.toISOString()}'
												 group by hour) as games_per_hour_value)                    as game_sessions_played_per_hour,
									payment_methods.payment_method_data                               as payment_methods,
									current_timestamp                                                 as created_at,
									current_timestamp                                                 as updated_at

					 from game_session
									inner join playfield on game_session.playfield_id = playfield.id
									inner join cabinet on playfield.serial_number = cabinet.serial_number
									left join payment_methods
														on payment_methods.hour = date_trunc('hour',
																																 coalesce(game_session.ended_at, game_session.started_at))
					 where game_session.playfield_id = '${playfieldId}'
						 and coalesce(game_session.ended_at, game_session.started_at) between '${startDate.toISOString()}' and '${endDate.toISOString()}'
					 group by game_session.playfield_id,
										playfield.gametype_id,
										cabinet.serial_number,
										cabinet.tenant_id,
										cabinet.tenant_location_id)
				on conflict (range, playfield_id, start_date, tenant_id, tenant_location_id)
					do update set updated_at             = CURRENT_TIMESTAMP,
												range                  = EXCLUDED.range,
												created_at             = playfield_stats.created_at,
												start_date             = EXCLUDED.start_date,
												end_date               = EXCLUDED.end_date,
												playfield_id           = EXCLUDED.playfield_id,
												gametype_id            = EXCLUDED.gametype_id,
												serial_number          = EXCLUDED.serial_number,
												tenant_id              = EXCLUDED.tenant_id,
												tenant_location_id     = EXCLUDED.tenant_location_id,
												avg_money_in           = EXCLUDED.avg_money_in,
												avg_money_out          = EXCLUDED.avg_money_out,
												avg_credits            = EXCLUDED.avg_credits,
												avg_play_time          = EXCLUDED.avg_play_time,
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
												game_sessions_per_hour = EXCLUDED.game_sessions_per_hour;
			`);

			const result = await query;

			console.log(result);

			// const result = await query;

			// return result;
		} catch (error) {
			this.logger.error(error);
			throw new DatabaseRetrieveError(
				'Could not retrieve game statistics for playfield'
			);
		}
	}
}

export {PlayfieldStatsRepository};
