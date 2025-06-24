import type {PopularLocationStats, PopularPlayfieldStats} from '../helpers';
import type {PlayfieldStats} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	PrizeStatsReportDTOSchema,
	type PrizeStatsReportDTOType,
} from './prize-stats-report.schema';

class PrizeStats {
	constructor(
		public prizeId: string,
		public startDate: Date,
		public endDate: Date,
		public range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		public stats: StatisticsData
	) {
		this.prizeId = prizeId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.range = range;
		this.stats = stats;
	}

	static fromPlayfieldStats(
		prizeId: string,
		playfieldStats: PlayfieldStats[]
	): PrizeStats[] {
		return playfieldStats.map((playfieldStat) => {
			const startDate = playfieldStat.startDate;
			const endDate = playfieldStat.endDate;
			const range = playfieldStat.range;

			return new PrizeStats(
				prizeId,
				startDate,
				endDate,
				range,
				playfieldStat.stats
			);
		});
	}
}

class PrizeStatsReport {
	public aggregatedData: StatisticsData;

	static schema = {
		DTOSchema: PrizeStatsReportDTOSchema,
	};

	constructor(
		public prizeId: string,
		public unit: 'WEEK' | 'MONTH' | 'DAY' | 'HOUR',
		public startDate: Date,
		public endDate: Date,
		public data: PrizeStats[],
		public popularLocations?: PopularLocationStats[],
		public popularPlayfields?: PopularPlayfieldStats[]
	) {
		this.prizeId = prizeId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.unit = unit;
		this.data = data;
		this.popularLocations = popularLocations;
		this.popularPlayfields = popularPlayfields;

		this.aggregatedData = StatisticsData.aggregate(data.map((d) => d.stats));
	}

	toJSON(): PrizeStatsReportDTOType {
		return {
			prizeId: this.prizeId,
			unit: this.unit,
			startDate: this.startDate,
			endDate: this.endDate,

			popularPlayfields: this.popularPlayfields,
			popularLocations: this.popularLocations,

			countGameSessions: this.aggregatedData.countGameSessions,
			sumMoneyIn: this.aggregatedData.sumMoneyIn,
			sumMoneyOut: this.aggregatedData.sumMoneyOut,
			sumProfit: this.aggregatedData.sumProfit,
			sumCredits: this.aggregatedData.sumCredits,
			returnToPlayer: this.aggregatedData.returnToPlayer,
			avgPlayTime: this.aggregatedData.avgPlayTime,
			sumPlayTime: this.aggregatedData.sumPlayTime,
			avgMoneyIn: this.aggregatedData.avgMoneyIn,
			avgMoneyOut: this.aggregatedData.avgMoneyOut,
			avgCredits: this.aggregatedData.avgCredits,
			maxPlayTime: this.aggregatedData.maxPlayTime,
			minPlayTime: this.aggregatedData.minPlayTime,
			maxMoneyIn: this.aggregatedData.maxMoneyIn,
			minMoneyIn: this.aggregatedData.minMoneyIn,
			minMoneyOut: this.aggregatedData.minMoneyOut,
			maxMoneyOut: this.aggregatedData.maxMoneyOut,
			maxCredits: this.aggregatedData.maxCredits,
			minCredits: this.aggregatedData.minCredits,
			paymentMethods: this.aggregatedData.paymentMethods,

			gameSessionsOverTime: this.data.map((item) => ({
				date: item.startDate,
				countGameSessions: item.stats.countGameSessions,
				sumMoneyIn: item.stats.sumMoneyIn,
				sumMoneyOut: item.stats.sumMoneyOut,
				sumProfit: item.stats.sumProfit,
				sumCredits: item.stats.sumCredits,
			})),

			gameSessionsPerHourOfDay: this.aggregatedData.gameSessionsPerHour,
		};
	}

	static fromPlayfieldStats(
		prizeId: string,
		unit: 'WEEK' | 'MONTH' | 'DAY' | 'HOUR',
		startDate: Date,
		endDate: Date,
		playfieldStats: PlayfieldStats[]
	): PrizeStatsReport {
		const data = PrizeStats.fromPlayfieldStats(prizeId, playfieldStats);
		return new PrizeStatsReport(prizeId, unit, startDate, endDate, data);
	}
}

export {PrizeStats, PrizeStatsReport, PrizeStatsReportDTOSchema};

export type {PrizeStatsReportDTOType};
