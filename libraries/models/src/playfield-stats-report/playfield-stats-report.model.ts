import type {PlayfieldPrize} from '../playfield-prize/playfield-prize.model';
import {
	PlayfieldStats,
	type PopularPrizeStats,
} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	PlayfieldStatsReportDBSchema,
	type PlayfieldStatsReportDBType,
	PlayfieldStatsReportDTOSchema,
	type PlayfieldStatsReportDTOType,
} from './playfield-stats-report.schema';

class PlayfieldStatsReportModel {
	startDate: Date;
	endDate: Date;
	unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
	playfieldId: string;

	aggregatedData?: StatisticsData;
	data?: PlayfieldStats[];

	popularPrizes?: PopularPrizeStats[];

	prizehistory?: PlayfieldPrize[];

	static schemas = {
		DBSchema: PlayfieldStatsReportDBSchema,
		DTOSchema: PlayfieldStatsReportDTOSchema,
	};

	constructor(
		meta: {
			startDate: Date;
			endDate: Date;
			unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
			playfieldId: string;
		},
		data: PlayfieldStats[],
		prizehistory?: PlayfieldPrize[],
		popularPrizes?: PopularPrizeStats[]
	) {
		this.startDate = meta.startDate;
		this.endDate = meta.endDate;
		this.unit = meta.unit;
		this.playfieldId = meta.playfieldId;

		this.popularPrizes = popularPrizes ?? [];
		this.prizehistory = prizehistory ?? [];

		this.data = data ?? [];
		this.aggregatedData = this.calculateAggregatedData(
			data.map((item) => item.stats)
		);
	}

	private calculateAggregatedData(data: StatisticsData[]): StatisticsData {
		return StatisticsData.aggregate(data);
	}

	toJSON(): PlayfieldStatsReportDTOType {
		return {
			startDate: this.startDate,
			endDate: this.endDate,
			unit: this.unit,
			playfieldId: this.playfieldId,

			countGameSessions: this.aggregatedData?.countGameSessions ?? 0,
			sumCredits: this.aggregatedData?.sumCredits ?? 0,
			sumMoneyIn: this.aggregatedData?.sumMoneyIn ?? 0,
			sumMoneyOut: this.aggregatedData?.sumMoneyOut ?? 0,
			sumProfit: this.aggregatedData?.sumProfit ?? 0,
			returnToPlayer: this.aggregatedData?.returnToPlayer ?? 0,
			avgPlayTime: this.aggregatedData?.avgPlayTime ?? 0,
			sumPlayTime: this.aggregatedData?.sumPlayTime ?? 0,
			avgMoneyIn: this.aggregatedData?.avgMoneyIn ?? 0,
			avgMoneyOut: this.aggregatedData?.avgMoneyOut ?? 0,
			avgCredits: this.aggregatedData?.avgCredits ?? 0,
			maxPlayTime: this.aggregatedData?.maxPlayTime ?? 0,
			minPlayTime: this.aggregatedData?.minPlayTime ?? 0,
			maxMoneyIn: this.aggregatedData?.maxMoneyIn ?? 0,
			minMoneyIn: this.aggregatedData?.minMoneyIn ?? 0,
			maxMoneyOut: this.aggregatedData?.maxMoneyOut ?? 0,
			minMoneyOut: this.aggregatedData?.minMoneyOut ?? 0,
			maxCredits: this.aggregatedData?.maxCredits ?? 0,
			minCredits: this.aggregatedData?.minCredits ?? 0,

			popularPrizes: this.popularPrizes,
			prizeHistory: this.prizehistory?.map((prize) => prize.toJSON()) ?? [],

			gameSessionsOverTime:
				this.data?.map((item) => ({
					date: item.startDate,
					countGameSessions: item.stats.countGameSessions,
					sumMoneyIn: item.stats.sumMoneyIn,
					sumMoneyOut: item.stats.sumMoneyOut,
					sumProfit: item.stats.sumProfit,
					sumCredits: item.stats.sumCredits,
				})) ?? [],

			gameSessionsPerHourOfDay: this.aggregatedData?.gameSessionsPerHour,

			paymentMethods: this.aggregatedData?.paymentMethods,
		};
	}
}

export {PlayfieldStatsReportModel};
export type {PlayfieldStatsReportDBType, PlayfieldStatsReportDTOType};
