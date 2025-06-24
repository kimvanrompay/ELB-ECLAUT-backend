import type {
	PopularLocationStats,
	PopularPlayfieldStats,
	PopularPrizeStats,
} from '../helpers';
import type {PlayfieldStats} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	PlayfieldCategoryStatsReportDTOSchema,
	type PlayfieldCategoryStatsReportDTOType,
} from './playfield-category-stats-report.schema';

class PlayfieldCategoryStats {
	constructor(
		public playfieldCategoryId: string,
		public startDate: Date,
		public endDate: Date,
		public range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		public stats: StatisticsData
	) {
		this.playfieldCategoryId = playfieldCategoryId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.range = range;
		this.stats = stats;
	}

	static fromPlayfieldStats(
		playfieldCategoryId: string,
		playfieldStats: PlayfieldStats[]
	): PlayfieldCategoryStats[] {
		return playfieldStats.map((playfieldStat) => {
			const startDate = playfieldStat.startDate;
			const endDate = playfieldStat.endDate;
			const range = playfieldStat.range;

			return new PlayfieldCategoryStats(
				playfieldCategoryId,
				startDate,
				endDate,
				range,
				playfieldStat.stats
			);
		});
	}
}

class PlayfieldCategoryStatsReport {
	public aggregatedData: StatisticsData;

	static schemas = {
		DTOSchema: PlayfieldCategoryStatsReportDTOSchema,
	};

	constructor(
		public playfieldCategoryId: string,
		public unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		public startDate: Date,
		public endDate: Date,
		public data: PlayfieldCategoryStats[],
		public popularLocations?: PopularLocationStats[],
		public popularPlayfields?: PopularPlayfieldStats[],
		public popularPrizes?: PopularPrizeStats[]
	) {
		this.aggregatedData = StatisticsData.aggregate(
			data.map((item) => item.stats)
		);
	}

	toJSON(): PlayfieldCategoryStatsReportDTOType {
		return {
			playfieldCategoryId: this.playfieldCategoryId,
			unit: this.unit,
			startDate: this.startDate,
			endDate: this.endDate,

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

			popularLocations: this.popularLocations,
			popularPlayfields: this.popularPlayfields,
			popularPrizes: this.popularPrizes,
		};
	}

	static fromPlayfieldStats(
		playfieldCategoryId: string,
		playfieldStats: PlayfieldStats[],
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date
	): PlayfieldCategoryStatsReport {
		const data = PlayfieldCategoryStats.fromPlayfieldStats(
			playfieldCategoryId,
			playfieldStats
		);
		return new PlayfieldCategoryStatsReport(
			playfieldCategoryId,
			unit,
			startDate,
			endDate,
			data
		);
	}
}

export {PlayfieldCategoryStats, PlayfieldCategoryStatsReport};

export type {PlayfieldCategoryStatsReportDTOType};
