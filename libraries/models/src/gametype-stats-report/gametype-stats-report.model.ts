import type {
	PlayfieldStats,
	PopularPlayfieldStats,
	PopularPrizeStats,
} from '../playfield-stats/playfield-stats.model';
import {StatisticsData} from '../playfield-stats/statistics-data';
import {
	GameTypeStatsReportDTOSchema,
	type GameTypeStatsReportDTOType,
} from './gametype-stats-report.schema';

class GameTypeStats {
	constructor(
		public gametypeId: string,
		public startDate: Date,
		public endDate: Date,
		public range: 'WEEK' | 'MONTH' | 'YEAR' | 'DAY',
		public stats: StatisticsData
	) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.range = range;

		this.gametypeId = gametypeId;

		this.stats = stats;
	}

	static fromPlayfieldStats(
		gametypeId: string,
		playfieldStats: PlayfieldStats[]
	) {
		return playfieldStats.map((playfieldStat) => {
			const startDate = playfieldStat.startDate;
			const endDate = playfieldStat.endDate;
			const range = playfieldStat.range;

			return new GameTypeStats(
				gametypeId,
				startDate,
				endDate,
				range,
				playfieldStat.stats
			);
		});
	}
}

class GameTypeStatsReport {
	gametypeId: string;

	startDate: Date;
	endDate: Date;

	unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

	aggregatedData: StatisticsData;
	data: GameTypeStats[];

	popularPlayfields?: PopularPlayfieldStats[];
	popularPrizes?: PopularPrizeStats[];

	static schemas = {
		DTOSchema: GameTypeStatsReportDTOSchema,
	};

	constructor(
		meta: {
			gametypeId: string;
			startDate: Date;
			endDate: Date;
			unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
		},
		data: GameTypeStats[]
	) {
		this.gametypeId = meta.gametypeId;
		this.startDate = meta.startDate;
		this.endDate = meta.endDate;
		this.unit = meta.unit;

		this.aggregatedData = StatisticsData.aggregate(data.map((d) => d.stats));
		this.data = data;
	}

	static fromPlayfieldStats(
		meta: {
			gametypeId: string;
			startDate: Date;
			endDate: Date;
			unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
		},
		playfieldStats: PlayfieldStats[]
	) {
		const gameTypeStats = GameTypeStats.fromPlayfieldStats(
			meta.gametypeId,
			playfieldStats
		);

		return this.fromGameTypeStats(meta, gameTypeStats);
	}

	static fromGameTypeStats(
		meta: {
			gametypeId: string;
			startDate: Date;
			endDate: Date;
			unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';
		},
		stats: GameTypeStats[]
	) {
		return new GameTypeStatsReport(meta, stats);
	}

	toJSON(): GameTypeStatsReportDTOType {
		return {
			gametypeId: this.gametypeId,
			startDate: this.startDate,
			endDate: this.endDate,
			unit: this.unit,

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

			popularPrizes: this.popularPrizes ?? [],
			popularPlayfields: this.popularPlayfields ?? [],
		};
	}
}

export {GameTypeStats, GameTypeStatsReport};
