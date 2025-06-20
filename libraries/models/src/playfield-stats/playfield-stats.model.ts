import {mapArrayOrSingleItem} from '@lib/utils';

import {
	PlayfieldStatsDBSchema,
	type PlayfieldStatsDBType,
	type StatisticsDataDBType,
	type StatisticsDataType,
} from './playfield-stats.schema';
import {StatisticsData} from './statistics-data';

class PlayfieldStats {
	id: string | undefined; // if generated at runtime, otherwise from DB
	startDate: Date;
	endDate: Date;
	range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY'; // for now only DAY exists

	serialNumber: string;
	playfieldId: string;
	gametypeId: string;
	tenantId: string;
	tenantLocationId: string;

	stats: StatisticsData;

	static schemas = {
		DBSchema: PlayfieldStatsDBSchema,
	};

	constructor(args: {
		id: string | undefined;
		startDate: Date;
		endDate: Date;
		range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY';
		serialNumber: string;
		playfieldId: string;
		gametypeId: string;
		tenantId: string;
		tenantLocationId: string;

		stats: StatisticsData;
	}) {
		this.id = args.id;
		this.startDate = args.startDate;
		this.endDate = args.endDate;
		this.range = args.range;

		this.serialNumber = args.serialNumber;
		this.playfieldId = args.playfieldId;
		this.gametypeId = args.gametypeId;

		this.tenantId = args.tenantId;
		this.tenantLocationId = args.tenantLocationId;

		this.stats = args.stats;
	}

	static fromDBType(data: PlayfieldStatsDBType[]): PlayfieldStats[];
	static fromDBType(data: PlayfieldStatsDBType): PlayfieldStats;
	static fromDBType(
		data: PlayfieldStatsDBType | PlayfieldStatsDBType[]
	): PlayfieldStats | PlayfieldStats[] {
		return mapArrayOrSingleItem(data, (item) => {
			console.log(item.payment_methods);

			return new PlayfieldStats({
				id: item.id,
				startDate: new Date(item.start_date),
				endDate: new Date(item.end_date),
				range: item.range,
				serialNumber: item.serial_number,
				playfieldId: item.playfield_id,
				gametypeId: item.gametype_id,
				tenantId: item.tenant_id,
				tenantLocationId: item.tenant_location_id,

				stats: new StatisticsData({
					countGameSessions: item.count_game_sessions,
					sumPlayTime: item.sum_play_time,
					sumMoneyIn: item.sum_money_in,
					sumMoneyOut: item.sum_money_out,
					sumCredits: item.sum_credits,
					sumProfit: item.sum_profit,
					avgPlayTime: item.avg_play_time,
					avgMoneyIn: item.avg_money_in,
					avgMoneyOut: item.avg_money_out,
					avgCredits: item.avg_credits,
					minPlayTime: item.min_play_time,
					minMoneyIn: item.min_money_in,
					minMoneyOut: item.min_money_out,
					minCredits: item.min_credits,
					maxPlayTime: item.max_play_time,
					maxMoneyIn: item.max_money_in,
					maxMoneyOut: item.max_money_out,
					maxCredits: item.max_credits,
					gameSessionsPerHour: item.game_sessions_per_hour,
					paymentMethods: item.payment_methods,
				}),
			});
		});
	}
}

export {PlayfieldStats};
export type {PlayfieldStatsDBType, StatisticsDataDBType, StatisticsDataType};
