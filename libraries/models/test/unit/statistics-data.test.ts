import {describe} from 'vitest';

import type {StatisticsDataDBType} from '../../src/stats-report/playfield-stats/playfield-stats.schema';
import {StatisticsData} from '../../src/stats-report/playfield-stats/statistics-data';

describe('StatisticsData', () => {
	describe('fromDBType', () => {
		it('should convert a StatisticsDataDBType to StatisticsData', () => {
			const dbData: StatisticsDataDBType = {
				count_game_sessions: 20,
				sum_money_in: 1000,
				sum_money_out: 500,
				sum_credits: 200,
				sum_play_time: 3600,
				min_money_in: 50,
				min_money_out: 10,
				min_credits: 1,
				min_play_time: 60,
				max_money_in: 300,
				max_money_out: 200,
				max_credits: 50,
				max_play_time: 7200,
				avg_money_in: 200,
				avg_money_out: 100,
				avg_credits: 20,
				avg_play_time: 1800,
				sum_profit: 500,
				payment_methods: {
					COIN: {m: 500, c: 5},
					BILL: {m: 500, c: 10},
				},
				game_sessions_per_hour: {
					9: 10,
					10: 15,
					11: 20,
					12: 25,
					13: 30,
					14: 35,
					15: 40,
					16: 45,
					17: 50,
					18: 55,
					19: 60,
				},
			};

			const result = StatisticsData.fromDBType(dbData);
			expect(result).toBeDefined();
			expect(result).toBeInstanceOf(StatisticsData);
			expect(result.countGameSessions).toBe(20);
			expect(result.sumMoneyIn).toBe(1000);
			expect(result.sumMoneyOut).toBe(500);
			expect(result.sumCredits).toBe(200);
			expect(result.sumPlayTime).toBe(3600);
			expect(result.minMoneyIn).toBe(50);
			expect(result.minMoneyOut).toBe(10);
			expect(result.minCredits).toBe(1);
			expect(result.minPlayTime).toBe(60);
			expect(result.maxMoneyIn).toBe(300);
			expect(result.maxMoneyOut).toBe(200);
			expect(result.maxCredits).toBe(50);
			expect(result.maxPlayTime).toBe(7200);
			expect(result.avgMoneyIn).toBe(200);
			expect(result.avgMoneyOut).toBe(100);
			expect(result.avgCredits).toBe(20);
			expect(result.avgPlayTime).toBe(1800);
			expect(result.sumProfit).toBe(500);
			expect(result.paymentMethods!.COIN).toBeDefined();
			expect(result.paymentMethods!.COIN!.moneyIn).toBe(500);
			expect(result.paymentMethods!.COIN!.countGameSessions).toBe(5);
			expect(result.paymentMethods!.BILL).toBeDefined();
			expect(result.paymentMethods!.BILL!.moneyIn).toBe(500);
			expect(result.paymentMethods!.BILL!.countGameSessions).toBe(10);
			expect(result.gameSessionsPerHour).toEqual({
				9: 10,
				10: 15,
				11: 20,
				12: 25,
				13: 30,
				14: 35,
				15: 40,
				16: 45,
				17: 50,
				18: 55,
				19: 60,
			});
		});

		it('should handle empty payment methods and game sessions per hour', () => {
			const dbData: StatisticsDataDBType = {
				count_game_sessions: 0,
				sum_money_in: 0,
				sum_money_out: 0,
				sum_credits: 0,
				sum_play_time: 0,
				min_money_in: 0,
				min_money_out: 0,
				min_credits: 0,
				min_play_time: 0,
				max_money_in: 0,
				max_money_out: 0,
				max_credits: 0,
				max_play_time: 0,
				avg_money_in: 0,
				avg_money_out: 0,
				avg_credits: 0,
				avg_play_time: 0,
				sum_profit: 0,
				payment_methods: {},
				game_sessions_per_hour: {},
			};

			const result = StatisticsData.fromDBType(dbData);
			expect(result).toBeDefined();
			expect(result.paymentMethods).toEqual({});
			expect(result.gameSessionsPerHour).toEqual({});
		});

		it('should throw an error for invalid data', () => {
			const dbData: any = {
				count_game_sessions: 'invalid',
				sum_money_in: 1000,
				sum_money_out: 500,
				sum_credits: 200,
				sum_play_time: 3600,
				min_money_in: 50,
				min_money_out: 10,
				min_credits: 1,
				min_play_time: 60,
				max_money_in: 300,
				max_money_out: 200,
				max_credits: 50,
				max_play_time: 7200,
				avg_money_in: 200,
				avg_money_out: 100,
				avg_credits: 20,
				avg_play_time: 1800,
				sum_profit: 500,
			};

			expect(() => StatisticsData.fromDBType(dbData)).toThrow();
		});
	});

	describe('toJSON', () => {
		it('should convert a StatisticsData instance to JSON', () => {
			const stats = new StatisticsData({
				countGameSessions: 20,
				sumMoneyIn: 1000,
				sumMoneyOut: 500,
				sumCredits: 200,
				sumPlayTime: 3600,
				minMoneyIn: 50,
				minMoneyOut: 10,
				minCredits: 1,
				minPlayTime: 60,
				maxMoneyIn: 300,
				maxMoneyOut: 200,
				maxCredits: 50,
				maxPlayTime: 7200,
				avgMoneyIn: 200,
				avgMoneyOut: 100,
				avgCredits: 20,
				avgPlayTime: 1800,
				sumProfit: 500,
				paymentMethods: {
					COIN: {m: 500, c: 5},
					BILL: {m: 500, c: 10},
				},
				gameSessionsPerHour: {
					9: 10,
					10: 15,
					11: 20,
					12: 25,
					13: 30,
					14: 35,
					15: 40,
					16: 45,
					17: 50,
					18: 55,
					19: 60,
				},
			});

			const json = stats.toJSON();
			expect(json).toEqual({
				countGameSessions: 20,
				sumMoneyIn: 1000,
				sumMoneyOut: 500,
				sumCredits: 200,
				sumPlayTime: 3600,
				minMoneyIn: 50,
				minMoneyOut: 10,
				minCredits: 1,
				minPlayTime: 60,
				maxMoneyIn: 300,
				maxMoneyOut: 200,
				maxCredits: 50,
				maxPlayTime: 7200,
				avgMoneyIn: 200,
				avgMoneyOut: 100,
				avgCredits: 20,
				avgPlayTime: 1800,
				sumProfit: 500,
				paymentMethods: {
					COIN: {moneyIn: 500, countGameSessions: 5},
					BILL: {moneyIn: 500, countGameSessions: 10},
				},
				gameSessionsPerHour: {
					9: 10,
					10: 15,
					11: 20,
					12: 25,
					13: 30,
					14: 35,
					15: 40,
					16: 45,
					17: 50,
					18: 55,
					19: 60,
				},
				returnToPlayer: 50,
			});
		});

		it('should handle empty payment methods and game sessions per hour in JSON', () => {
			const stats = new StatisticsData({
				countGameSessions: 0,
				sumMoneyIn: 0,
				sumMoneyOut: 0,
				sumCredits: 0,
				sumPlayTime: 0,
				minMoneyIn: 0,
				minMoneyOut: 0,
				minCredits: 0,
				minPlayTime: 0,
				maxMoneyIn: 0,
				maxMoneyOut: 0,
				maxCredits: 0,
				maxPlayTime: 0,
				avgMoneyIn: 0,
				avgMoneyOut: 0,
				avgCredits: 0,
				avgPlayTime: 0,
				sumProfit: 0,
				paymentMethods: undefined,
				gameSessionsPerHour: undefined,
			});

			const json = stats.toJSON();
			expect(json).toEqual({
				countGameSessions: 0,
				sumMoneyIn: 0,
				sumMoneyOut: 0,
				sumCredits: 0,
				sumPlayTime: 0,
				minMoneyIn: 0,
				minMoneyOut: 0,
				minCredits: 0,
				minPlayTime: 0,
				maxMoneyIn: 0,
				maxMoneyOut: 0,
				maxCredits: 0,
				maxPlayTime: 0,
				avgMoneyIn: 0,
				avgMoneyOut: 0,
				avgCredits: 0,
				avgPlayTime: 0,
				sumProfit: 0,
				paymentMethods: undefined,
				gameSessionsPerHour: undefined,
				returnToPlayer: 0,
			});
		});
	});

	describe('returnToPlayer', () => {
		it('should calculate return to player correctly', () => {
			const stats = new StatisticsData({
				countGameSessions: 20,
				sumMoneyIn: 1000,
				sumMoneyOut: 349,
				sumCredits: 200,
				sumPlayTime: 3600,
				minMoneyIn: 50,
				minMoneyOut: 10,
				minCredits: 1,
				minPlayTime: 60,
				maxMoneyIn: 300,
				maxMoneyOut: 200,
				maxCredits: 50,
				maxPlayTime: 7200,
				avgMoneyIn: 200,
				avgMoneyOut: 100,
				avgCredits: 20,
				avgPlayTime: 1800,
				sumProfit: 651,
			});

			expect(stats.returnToPlayer).toBe(34.9); // (sumMoneyOut / sumMoneyIn) * 100
		});

		it('should handle zero money in', () => {
			const stats = new StatisticsData({
				countGameSessions: 20,
				sumMoneyIn: 0,
				sumMoneyOut: 500,
				sumCredits: 200,
				sumPlayTime: 3600,
				minMoneyIn: 0,
				minMoneyOut: 10,
				minCredits: 1,
				minPlayTime: 60,
				maxMoneyIn: 0,
				maxMoneyOut: 200,
				maxCredits: 50,
				maxPlayTime: 7200,
				avgMoneyIn: 0,
				avgMoneyOut: 100,
				avgCredits: 20,
				avgPlayTime: 1800,
				sumProfit: -500, // Loss
			});

			expect(stats.returnToPlayer).toBe(0); // No return if no money in
		});

		it('should handle zero money out', () => {
			const stats = new StatisticsData({
				countGameSessions: 20,
				sumMoneyIn: 1000,
				sumMoneyOut: 0,
				sumCredits: 200,
				sumPlayTime: 3600,
				minMoneyIn: 50,
				minMoneyOut: 0,
				minCredits: 1,
				minPlayTime: 60,
				maxMoneyIn: 300,
				maxMoneyOut: 0,
				maxCredits: 50,
				maxPlayTime: 7200,
				avgMoneyIn: 200,
				avgMoneyOut: 0,
				avgCredits: 20,
				avgPlayTime: 1800,
				sumProfit: 1000, // All money in is profit
			});

			expect(stats.returnToPlayer).toBe(0); // No return if no money out
		});
	});

	describe('aggregate', () => {
		it('should aggregate multiple StatisticsData instances', () => {
			const stats1 = new StatisticsData({
				countGameSessions: 10,
				sumMoneyIn: 500,
				sumMoneyOut: 200,
				sumCredits: 100,
				sumPlayTime: 1800,
				minMoneyIn: 50,
				minMoneyOut: 10,
				minCredits: 1,
				minPlayTime: 60,
				maxMoneyIn: 300,
				maxMoneyOut: 150,
				maxCredits: 50,
				maxPlayTime: 3600,
				avgMoneyIn: 100,
				avgMoneyOut: 25,
				avgCredits: 10,
				avgPlayTime: 180,
				sumProfit: 300,
				paymentMethods: {
					COIN: {m: 200, c: 2},
					BILL: {m: 300, c: 8},
				},
				gameSessionsPerHour: {
					9: 5,
					10: 5,
					11: 10,
					12: 15,
					13: 20,
				},
			});

			const stats2 = new StatisticsData({
				countGameSessions: 5,
				sumMoneyIn: 300,
				sumMoneyOut: 100,
				sumCredits: 50,
				sumPlayTime: 1200,
				minMoneyIn: 30,
				minMoneyOut: 5,
				minCredits: 1,
				minPlayTime: 30,
				maxMoneyIn: 200,
				maxMoneyOut: 80,
				maxCredits: 30,
				maxPlayTime: 2400,
				avgMoneyIn: 60,
				avgMoneyOut: 20,
				avgCredits: 10,
				avgPlayTime: 240,
				sumProfit: 200,
				paymentMethods: {
					COIN: {m: 100, c: 1},
					BILL: {m: 200, c: 4},
				},
				gameSessionsPerHour: {
					9: 2,
					10: 3,
					11: 5,
					12: 7,
					13: 8,
				},
			});

			const aggregated = StatisticsData.aggregate([stats1, stats2]);
			expect(aggregated.countGameSessions).toBe(15);
			expect(aggregated.sumMoneyIn).toBe(800);
			expect(aggregated.sumMoneyOut).toBe(300);
			expect(aggregated.sumCredits).toBe(150);
			expect(aggregated.sumPlayTime).toBe(3000);
			expect(aggregated.minMoneyIn).toBe(30);
			expect(aggregated.minMoneyOut).toBe(5);
			expect(aggregated.minCredits).toBe(1);
			expect(aggregated.minPlayTime).toBe(30);
			expect(aggregated.maxMoneyIn).toBe(300);
			expect(aggregated.maxMoneyOut).toBe(150);
			expect(aggregated.maxCredits).toBe(50);
			expect(aggregated.maxPlayTime).toBe(3600);
			expect(aggregated.avgMoneyIn).toBeCloseTo(86.66, 1);
			expect(aggregated.avgMoneyOut).toBeCloseTo(23.33, 1);
			expect(aggregated.avgCredits).toBeCloseTo(10, 1);
			expect(aggregated.avgPlayTime).toBeCloseTo(200, 1);
			expect(aggregated.sumProfit).toBe(500);
			expect(aggregated.returnToPlayer).toBeCloseTo(37.5, 2); // (sumMoneyOut / sumMoneyIn) * 100

			expect(aggregated.paymentMethods).toEqual({
				COIN: {moneyIn: 300, countGameSessions: 3},
				BILL: {moneyIn: 500, countGameSessions: 12},
			});

			expect(aggregated.gameSessionsPerHour).toEqual({
				9: 7,
				10: 8,
				11: 15,
				12: 22,
				13: 28,
			});
		});
	});
});
