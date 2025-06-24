import type {
	PopularGametypeStats,
	PopularLocationStats,
	PopularPlayfieldStats,
	PopularPrizeStats,
} from '../helpers';
import type {PlayfieldStats} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	type TenantStatsReportDTO,
	TenantStatsReportDTOSchema,
} from './tenant-stats-report.schema';

class TenantStats {
	constructor(
		public tenantId: string,
		public startDate: Date,
		public endDate: Date,
		public range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		public stats: StatisticsData
	) {
		this.tenantId = tenantId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.range = range;
		this.stats = stats;
	}

	static fromPlayfieldStats(
		tenantId: string,
		playfieldStats: PlayfieldStats[]
	): TenantStats[] {
		return playfieldStats.map((playfieldStat) => {
			const startDate = playfieldStat.startDate;
			const endDate = playfieldStat.endDate;
			const range = playfieldStat.range;

			return new TenantStats(
				tenantId,
				startDate,
				endDate,
				range,
				playfieldStat.stats
			);
		});
	}
}

class TenantStatsReport {
	public aggregatedData: StatisticsData;

	static schemas = {
		DTOSchema: TenantStatsReportDTOSchema,
	};

	constructor(
		public tenantId: string,
		public unit: 'WEEK' | 'MONTH' | 'DAY' | 'HOUR',
		public startDate: Date,
		public endDate: Date,
		public data: TenantStats[],
		public popularGametypes?: PopularGametypeStats[],
		public popularPlayfields?: PopularPlayfieldStats[],
		public popularPrizes?: PopularPrizeStats[],
		public popularLocations?: PopularLocationStats[]
	) {
		this.tenantId = tenantId;
		this.unit = unit;
		this.startDate = startDate;
		this.endDate = endDate;
		this.data = data;

		this.aggregatedData = StatisticsData.aggregate(
			data.map((stat) => stat.stats)
		);

		this.popularGametypes = popularGametypes;
		this.popularPlayfields = popularPlayfields;
		this.popularPrizes = popularPrizes;
		this.popularLocations = popularLocations;
	}

	toJSON(): TenantStatsReportDTO {
		return {
			tenantId: this.tenantId,
			unit: this.unit,
			startDate: this.startDate,
			endDate: this.endDate,

			countGameSessions: this.aggregatedData.countGameSessions,

			sumMoneyIn: this.aggregatedData.sumMoneyIn,
			sumMoneyOut: this.aggregatedData.sumMoneyOut,
			sumProfit: this.aggregatedData.sumProfit,
			sumCredits: this.aggregatedData.sumCredits,
			sumPlayTime: this.aggregatedData.sumPlayTime,
			returnToPlayer: this.aggregatedData.returnToPlayer,
			avgPlayTime: this.aggregatedData.avgPlayTime,
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

			gameSessionsOverTime: this.data.map((item) => ({
				date: item.startDate,
				countGameSessions: item.stats.countGameSessions,
				sumMoneyIn: item.stats.sumMoneyIn,
				sumMoneyOut: item.stats.sumMoneyOut,
				sumProfit: item.stats.sumProfit,
				sumCredits: item.stats.sumCredits,
			})),

			paymentMethods: this.aggregatedData.paymentMethods,

			gameSessionsPerHourOfDay: this.aggregatedData.gameSessionsPerHour,

			popularGametypes: this.popularGametypes ?? [],
			popularPrizes: this.popularPrizes ?? [],
			popularPlayfields: this.popularPlayfields ?? [],
		};
	}

	static fromPlayfieldStats(
		tenantId: string,
		unit: 'WEEK' | 'MONTH' | 'DAY' | 'HOUR',
		startDate: Date,
		endDate: Date,
		playfieldStats: PlayfieldStats[]
	): TenantStatsReport {
		const data = TenantStats.fromPlayfieldStats(tenantId, playfieldStats);
		return new TenantStatsReport(tenantId, unit, startDate, endDate, data);
	}
}

export {TenantStats, TenantStatsReport};
export type {TenantStatsReportDTO};
