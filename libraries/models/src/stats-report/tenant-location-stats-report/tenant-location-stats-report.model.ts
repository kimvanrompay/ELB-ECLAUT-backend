import type {
	PopularGametypeStats,
	PopularPlayfieldCategoryStats,
	PopularPlayfieldStats,
	PopularPrizeStats,
} from '../helpers';
import type {PlayfieldStats} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	TenantLocationStatsReportDTOSchema,
	type TenantLocationStatsReportDTOType,
} from './tenant-location-stats-report.schema';

class TenantLocationStats {
	tenantId: string | undefined;
	tenantLocationId: string;

	startDate: Date;
	endDate: Date;

	range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY';

	stats: StatisticsData;

	constructor(
		tenantId: string | undefined,
		tenantLocationId: string,
		startDate: Date,
		endDate: Date,
		range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		stats: StatisticsData
	) {
		this.tenantId = tenantId;
		this.tenantLocationId = tenantLocationId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.range = range;

		this.stats = stats;
	}

	static fromPlayfieldStats(
		tenantId: string | undefined,
		tenantLocationId: string,
		playfieldStats: PlayfieldStats[]
	) {
		return playfieldStats.map((playfieldStat) => {
			const startDate = playfieldStat.startDate;
			const endDate = playfieldStat.endDate;
			const range = playfieldStat.range;

			return new TenantLocationStats(
				tenantId,
				tenantLocationId,
				startDate,
				endDate,
				range,
				playfieldStat.stats
			);
		});
	}
}

class TenantLocationStatsReport {
	tenantId: string;
	tenantLocationId: string;

	startDate: Date;
	endDate: Date;

	unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

	aggregatedData: StatisticsData;

	data: TenantLocationStats[];

	popularPrizes?: PopularPrizeStats[];
	popularPlayfields?: PopularPlayfieldStats[];
	popularGametypes?: PopularGametypeStats[];
	popularPlayfieldCategories?: PopularPlayfieldCategoryStats[];

	// dataPerGameType: Record<string, StatisticsData>;
	// dataPerPlayfield: Record<string, StatisticsData>;

	static schemas = {
		DTOSchema: TenantLocationStatsReportDTOSchema,
	};

	constructor(
		tenantId: string,
		tenantLocationId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date,
		data: TenantLocationStats[],
		popularPrizes?: PopularPrizeStats[],
		popularPlayfields?: PopularPlayfieldStats[],
		popularGameTypes?: PopularGametypeStats[],
		popularPlayfieldCategories?: PopularPlayfieldCategoryStats[]
	) {
		this.tenantId = tenantId;
		this.tenantLocationId = tenantLocationId;
		this.unit = unit;
		this.startDate = startDate;
		this.endDate = endDate;
		this.data = data;
		this.aggregatedData = StatisticsData.aggregate(data.map((d) => d.stats));

		this.popularPrizes = popularPrizes ?? [];
		this.popularPlayfields = popularPlayfields ?? [];
		this.popularGametypes = popularGameTypes ?? [];
		this.popularPlayfieldCategories = popularPlayfieldCategories ?? [];
	}

	toJSON(): TenantLocationStatsReportDTOType {
		return {
			tenantId: this.tenantId,
			tenantLocationId: this.tenantLocationId,
			unit: this.unit,
			startDate: this.startDate,
			endDate: this.endDate,

			sumMoneyIn: this.aggregatedData.sumMoneyIn,
			sumMoneyOut: this.aggregatedData.sumMoneyOut,
			sumProfit: this.aggregatedData.sumProfit,
			sumCredits: this.aggregatedData.sumCredits,
			sumPlayTime: this.aggregatedData.sumPlayTime,
			countGameSessions: this.aggregatedData.countGameSessions,
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
			popularPlayfieldCategories: this.popularPlayfieldCategories ?? [],

			// aggregatedData: this.aggregatedData.toJSON(),
			// data: this.data.map((item) => ({
			// 	date: item.startDate,
			// 	...item.stats.toJSON(),
			// })),
		};
	}

	static fromPlayfieldStats(
		tenantId: string,
		tenantLocationId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date,
		stats: PlayfieldStats[]
	): TenantLocationStatsReport {
		const tenantLocationStats = TenantLocationStats.fromPlayfieldStats(
			tenantId,
			tenantLocationId,
			stats
		);

		return this.fromTenantLocationStats(
			tenantId,
			tenantLocationId,
			unit,
			startDate,
			endDate,
			tenantLocationStats
		);
	}

	static fromTenantLocationStats(
		tenantId: string,
		tenantLocationId: string,
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		startDate: Date,
		endDate: Date,
		stats: TenantLocationStats[]
	): TenantLocationStatsReport {
		return new TenantLocationStatsReport(
			tenantId,
			tenantLocationId,
			unit,
			startDate,
			endDate,
			stats
		);
	}
}

export {TenantLocationStatsReport};
