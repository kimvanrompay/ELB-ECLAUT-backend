import {describe} from 'vitest';

import {
	GameTypeStats,
	GameTypeStatsReport,
} from '../../src/gametype-stats-report/gametype-stats-report.model';
import {
	PlayfieldStats,
	StatisticsData,
} from '../../src/playfield-stats/playfield-stats.model';

describe('GametypeStatsReport', () => {
	describe('fromPlayfieldStats', () => {
		it('should create a GameTypeStatsReport from PlayfieldStats', () => {
			const playfieldStats = [
				new PlayfieldStats({
					id: 'stat1',
					playfieldId: 'playfield1',
					startDate: new Date('2025-01-01T00:00:00Z'),
					endDate: new Date('2025-01-01T23:59:59Z'),
					range: 'DAY',
					stats: new StatisticsData({
						countGameSessions: 10,
						sumCredits: 14,
						sumMoneyIn: 100,
						sumMoneyOut: 86,
						sumProfit: 14,
						sumPlayTime: 600,
						minPlayTime: 30,
						minMoneyIn: 5,
						minMoneyOut: 3,
						minCredits: 1,
						maxPlayTime: 120,
						maxMoneyIn: 20,
						maxMoneyOut: 18,
						maxCredits: 3,
						avgPlayTime: 60,
						avgMoneyIn: 10,
						avgMoneyOut: 8.6,
						avgCredits: 1.4,
						gameSessionsPerHour: {
							9: 2,
							10: 3,
							11: 5,
						},
						paymentMethods: {
							BILL: {
								m: 50,
								c: 5,
							},
							COIN: {
								m: 50,
								c: 5,
							},
						},
					}),
				}),
				new PlayfieldStats({
					id: 'stat2',
					playfieldId: 'playfield1',
					startDate: new Date('2025-01-02T00:00:00Z'),
					endDate: new Date('2025-01-02T23:59:59Z'),
					range: 'DAY',
					stats: new StatisticsData({
						countGameSessions: 8,
						sumCredits: 12,
						sumMoneyIn: 80,
						sumMoneyOut: 68,
						sumProfit: 12,
						sumPlayTime: 480,
						minPlayTime: 20,
						minMoneyIn: 4,
						minMoneyOut: 2,
						minCredits: 1,
						maxPlayTime: 100,
						maxMoneyIn: 15,
						maxMoneyOut: 13,
						maxCredits: 2,
						avgPlayTime: 60,
						avgMoneyIn: 10,
						avgMoneyOut: 8.5,
						avgCredits: 1.5,
						gameSessionsPerHour: {
							9: 1,
							10: 2,
							11: 5,
						},
					}),
				}),
			] as const satisfies PlayfieldStats[];

			const report = GameTypeStatsReport.fromPlayfieldStats(
				{
					gametypeId: 'gametype1',
					startDate: new Date('2025-01-01T00:00:00Z'),
					endDate: new Date('2025-01-02T23:59:59Z'),
					unit: 'DAY',
				},
				playfieldStats
			);

			expect(report).toBeInstanceOf(GameTypeStatsReport);

			expect(report.gametypeId).toBe('gametype1');
			expect(report.startDate).toEqual(new Date('2025-01-01T00:00:00Z'));
			expect(report.endDate).toEqual(new Date('2025-01-02T23:59:59Z'));
			expect(report.unit).toBe('DAY');
			expect(report.aggregatedData.toJSON()).toEqual(
				StatisticsData.aggregate([
					playfieldStats[0].stats,
					playfieldStats[1].stats,
				]).toJSON()
			);

			expect(report.data).toHaveLength(2);
			expect(report.data[0]).toBeInstanceOf(GameTypeStats);

			const firstStat = report.data[0] as GameTypeStats;
			expect(firstStat.gametypeId).toBe('gametype1');
			expect(firstStat.startDate).toEqual(new Date('2025-01-01T00:00:00Z'));
			expect(firstStat.endDate).toEqual(new Date('2025-01-01T23:59:59Z'));
			expect(firstStat.stats.toJSON()).toEqual(
				playfieldStats[0].stats.toJSON()
			);

			expect(report.data[1]).toBeInstanceOf(GameTypeStats);

			const secondStat = report.data[1] as GameTypeStats;
			expect(secondStat.gametypeId).toBe('gametype1');
			expect(secondStat.startDate).toEqual(new Date('2025-01-02T00:00:00Z'));
			expect(secondStat.endDate).toEqual(new Date('2025-01-02T23:59:59Z'));
			expect(secondStat.stats.toJSON()).toEqual(
				playfieldStats[1].stats.toJSON()
			);
		});

		it('should handle empty PlayfieldStats', () => {
			const playfieldStats: PlayfieldStats[] = [];

			const report = GameTypeStatsReport.fromPlayfieldStats(
				{
					gametypeId: 'gametype1',
					startDate: new Date('2025-01-01T00:00:00Z'),
					endDate: new Date('2025-01-02T23:59:59Z'),
					unit: 'DAY',
				},
				playfieldStats
			);

			expect(report).toBeInstanceOf(GameTypeStatsReport);
			expect(report.gametypeId).toBe('gametype1');
			expect(report.startDate).toEqual(new Date('2025-01-01T00:00:00Z'));
			expect(report.endDate).toEqual(new Date('2025-01-02T23:59:59Z'));
			expect(report.unit).toBe('DAY');
			expect(report.aggregatedData.toJSON()).toEqual(
				StatisticsData.aggregate([]).toJSON()
			);
			expect(report.data).toHaveLength(0);
		});
	});

	describe('fromGameTypeStats', () => {
		it('should create a GameTypeStatsReport from GameTypeStats', () => {
			const gameTypeStats = [
				new GameTypeStats(
					'gametype1',
					new Date('2025-01-01T00:00:00Z'),
					new Date('2025-01-01T23:59:59Z'),
					'DAY',
					new StatisticsData({
						countGameSessions: 10,
						sumCredits: 14,
						sumMoneyIn: 100,
						sumMoneyOut: 86,
						sumProfit: 14,
						sumPlayTime: 600,
						minPlayTime: 30,
						minMoneyIn: 5,
						minMoneyOut: 3,
						minCredits: 1,
						maxPlayTime: 120,
						maxMoneyIn: 20,
						maxMoneyOut: 18,
						maxCredits: 3,
						avgPlayTime: 60,
						avgMoneyIn: 10,
						avgMoneyOut: 8.6,
						avgCredits: 1.4,
					})
				),
				new GameTypeStats(
					'gametype1',
					new Date('2025-01-02T00:00:00Z'),
					new Date('2025-01-02T23:59:59Z'),
					'DAY',
					new StatisticsData({
						countGameSessions: 8,
						sumCredits: 12,
						sumMoneyIn: 80,
						sumMoneyOut: 68,
						sumProfit: 12,
						sumPlayTime: 480,
						minPlayTime: 20,
						minMoneyIn: 4,
						minMoneyOut: 2,
						minCredits: 1,
						maxPlayTime: 100,
						maxMoneyIn: 15,
						maxMoneyOut: 13,
						maxCredits: 2,
						avgPlayTime: 60,
						avgMoneyIn: 10,
						avgMoneyOut: 8.5,
						avgCredits: 1.5,
					})
				),
			] as const satisfies GameTypeStats[];

			const report = GameTypeStatsReport.fromGameTypeStats(
				{
					gametypeId: 'gametype1',
					startDate: new Date('2025-01-01T00:00:00Z'),
					endDate: new Date('2025-01-02T23:59:59Z'),
					unit: 'DAY',
				},
				gameTypeStats
			);

			expect(report).toBeInstanceOf(GameTypeStatsReport);
			expect(report.gametypeId).toBe('gametype1');
			expect(report.startDate).toEqual(new Date('2025-01-01T00:00:00Z'));
			expect(report.endDate).toEqual(new Date('2025-01-02T23:59:59Z'));
			expect(report.unit).toBe('DAY');
			expect(report.aggregatedData.toJSON()).toEqual(
				StatisticsData.aggregate([
					gameTypeStats[0].stats,
					gameTypeStats[1].stats,
				]).toJSON()
			);
			expect(report.data).toHaveLength(2);
			expect(report.data[0]).toBeInstanceOf(GameTypeStats);
			const firstStat = report.data[0] as GameTypeStats;
			expect(firstStat.gametypeId).toBe('gametype1');
			expect(firstStat.startDate).toEqual(new Date('2025-01-01T00:00:00Z'));
			expect(firstStat.endDate).toEqual(new Date('2025-01-01T23:59:59Z'));
			expect(firstStat.stats.toJSON()).toEqual(gameTypeStats[0].stats.toJSON());

			expect(report.data[1]).toBeInstanceOf(GameTypeStats);
			const secondStat = report.data[1] as GameTypeStats;
			expect(secondStat.gametypeId).toBe('gametype1');
			expect(secondStat.startDate).toEqual(new Date('2025-01-02T00:00:00Z'));
			expect(secondStat.endDate).toEqual(new Date('2025-01-02T23:59:59Z'));
			expect(secondStat.stats.toJSON()).toEqual(
				gameTypeStats[1].stats.toJSON()
			);
		});

		it('should handle empty GameTypeStats', () => {
			const gameTypeStats: GameTypeStats[] = [];

			const report = GameTypeStatsReport.fromGameTypeStats(
				{
					gametypeId: 'gametype1',
					startDate: new Date('2025-01-01T00:00:00Z'),
					endDate: new Date('2025-01-02T23:59:59Z'),
					unit: 'DAY',
				},
				gameTypeStats
			);

			expect(report).toBeInstanceOf(GameTypeStatsReport);
			expect(report.gametypeId).toBe('gametype1');
			expect(report.startDate).toEqual(new Date('2025-01-01T00:00:00Z'));
			expect(report.endDate).toEqual(new Date('2025-01-02T23:59:59Z'));
			expect(report.unit).toBe('DAY');
			expect(report.aggregatedData.toJSON()).toEqual(
				StatisticsData.aggregate([]).toJSON()
			);
			expect(report.data).toHaveLength(0);
		});
	});

	describe('toJSON', () => {
		it('should convert a GametypeStatsReport instance to json', () => {
			const report = new GameTypeStatsReport(
				{
					gametypeId: 'gametype1',
					startDate: new Date('2025-01-01T00:00:00Z'),
					endDate: new Date('2025-01-02T23:59:59Z'),
					unit: 'DAY',
				},
				[
					new GameTypeStats(
						'gametype1',
						new Date('2025-01-01T00:00:00Z'),
						new Date('2025-01-01T23:59:59Z'),
						'DAY',
						new StatisticsData({
							countGameSessions: 10,
							sumCredits: 14,
							sumMoneyIn: 100,
							sumMoneyOut: 86,
							sumProfit: 14,
							sumPlayTime: 600,
							minPlayTime: 30,
							minMoneyIn: 5,
							minMoneyOut: 3,
							minCredits: 1,
							maxPlayTime: 120,
							maxMoneyIn: 20,
							maxMoneyOut: 18,
							maxCredits: 3,
							avgPlayTime: 60,
							avgMoneyIn: 10,
							avgMoneyOut: 8.6,
							avgCredits: 1.4,
						})
					),
				]
			);

			const json = report.toJSON();

			const expectedValue: ReturnType<GameTypeStatsReport['toJSON']> = {
				gametypeId: 'gametype1',
				startDate: new Date('2025-01-01T00:00:00Z'),
				endDate: new Date('2025-01-02T23:59:59Z'),
				unit: 'DAY',

				countGameSessions: 10,
				sumMoneyIn: 100,
				sumMoneyOut: 86,
				sumProfit: 14,
				sumCredits: 14,
				returnToPlayer: 86,
				avgPlayTime: 60,
				sumPlayTime: 600,
				avgMoneyIn: 10,
				avgMoneyOut: 8.6,
				avgCredits: 1.4,
				maxPlayTime: 120,
				minPlayTime: 30,
				maxMoneyIn: 20,
				minMoneyIn: 5,
				minMoneyOut: 3,
				maxMoneyOut: 18,
				maxCredits: 3,
				minCredits: 1,
				paymentMethods: undefined,
				gameSessionsOverTime: [
					{
						date: new Date('2025-01-01T00:00:00Z'),
						countGameSessions: 10,
						sumMoneyIn: 100,
						sumMoneyOut: 86,
						sumProfit: 14,
						sumCredits: 14,
					},
				],
				gameSessionsPerHourOfDay: undefined,
				popularPrizes: [],
				popularPlayfields: [],
			};

			expect(json).toEqual(expectedValue);
		});
	});
});
