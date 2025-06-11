import {describe, expect} from 'vitest';

import {
	PlayfieldStats,
	type PlayfieldStatsDBType,
	StatisticsData,
} from '@lib/models/playfield-stats';
import type {AppContext} from '@lib/services/types';
import {PinoLogger} from '@lib/utils';

import {PlayfieldStatsRepository} from '../../src/playfield-stats/playfield-stats.repository';
import {TEST_PLAYFIELD_1_1} from '../test-data/machine.test-data';
import {
	PLAYFIELD_STATS_1_1_2025_02_01,
	PLAYFIELD_STATS_1_1_2025_02_02,
	PLAYFIELD_STATS_1_1_2025_02_03,
} from '../test-data/playfield-stats.test-data';
import {TEST_PRIZE_1, TEST_PRIZE_2} from '../test-data/prize.test-data';
import {TEST_TENANT_1_LOCATION_1} from '../test-data/tenant.test-data';
import {runSQLFiles} from '../test-utils';

const db = global.knex;

beforeEach(async () => {
	await runSQLFiles(db, [
		'./test/test-data/tenant.test-data.sql',
		'./test/test-data/gametype.test-data.sql',
		'./test/test-data/prize.test-data.sql',
		'./test/test-data/machine.test-data.sql',
		'./test/test-data/game-session.test-data.sql',
		'./test/test-data/playfield-stats.test-data.sql',
	]);
});

afterEach(async () => {
	await runSQLFiles(db, ['./test/test-data/reset.sql']);

	vi.resetAllMocks();
});

const CONTEXT: AppContext = {
	logger: new PinoLogger({}, {}),
};

describe('PlayfieldStatsRepository', () => {
	describe('generateAndSavePlayfieldStatsForDate', () => {
		it('should not save playfield stats for a specific date with no game sessions', async () => {
			const playfieldStatsRepository = new PlayfieldStatsRepository(
				db,
				CONTEXT
			);

			const dateWithoutGameSessions = new Date('2000-01-01T00:00:00Z');
			const endDateWithoutGameSessions = new Date('2000-01-01T23:59:59Z');

			await playfieldStatsRepository.generateAndSavePlayfieldStatsForDate(
				TEST_PLAYFIELD_1_1.id,
				dateWithoutGameSessions
			);

			const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
				'DAY',
				{
					playfieldId: TEST_PLAYFIELD_1_1.id,
				},
				['playfield_id'],
				dateWithoutGameSessions,
				endDateWithoutGameSessions
			);

			expect(result).not.toBeDefined();
		});

		it('should save playfield stats for a specific date with game sessions', async () => {
			const playfieldStatsRepository = new PlayfieldStatsRepository(
				db,
				CONTEXT
			);

			await db('game_session').insert({
				id: 'test-game-session-id',
				playfield_id: TEST_PLAYFIELD_1_1.id,
				tenant_id: TEST_TENANT_1_LOCATION_1.tenant.id,
				tenant_location_id: TEST_TENANT_1_LOCATION_1.id,
				prize_id: TEST_PRIZE_1.id,
				started_at: new Date('2025-03-01T00:00:00Z'),
				ended_at: new Date('2025-03-01T00:00:34Z'),
				result: {m: 0},
				amount_money_in: 200,
				amount_credits: 2,
				amount_money_out: 0,
				payment_method: 'COIN',
				created_at: new Date('2025-03-01T00:00:00Z'),
				updated_at: new Date('2025-03-01T23:59:59Z'),
			});

			await db('game_session').insert({
				id: TEST_PLAYFIELD_1_1.id,
				playfield_id: TEST_PLAYFIELD_1_1.id,
				tenant_id: TEST_TENANT_1_LOCATION_1.tenant.id,
				tenant_location_id: TEST_TENANT_1_LOCATION_1.id,
				prize_id: TEST_PRIZE_1.id,
				started_at: new Date('2025-03-01T00:02:00Z'),
				ended_at: new Date('2025-03-01T00:02:44Z'),
				result: {m: 600},
				amount_money_in: 300,
				amount_credits: 3,
				amount_money_out: 600,
				payment_method: 'COIN',
				created_at: new Date('2025-03-01T00:00:00Z'),
				updated_at: new Date('2025-03-01T23:59:59Z'),
			});

			const dateWithGameSessions = new Date('2025-03-01T00:00:00Z');
			const endDateWithGameSessions = new Date('2025-03-01T23:59:59Z');

			await playfieldStatsRepository.generateAndSavePlayfieldStatsForDate(
				TEST_PLAYFIELD_1_1.id,
				dateWithGameSessions
			);

			const result = await db('playfield_stats')
				.where({
					playfield_id: TEST_PLAYFIELD_1_1.id,
					start_date: dateWithGameSessions,
					end_date: endDateWithGameSessions,
				})
				.first();

			expect(result).toBeDefined();

			const playfieldStats = result as PlayfieldStatsDBType;

			expect(playfieldStats.playfield_id).toBe(TEST_PLAYFIELD_1_1.id);
			expect(playfieldStats.start_date).toEqual(
				new Date('2025-03-01T00:00:00Z')
			);
			expect(playfieldStats.end_date).toEqual(new Date('2025-03-00:00:00'));
			expect(playfieldStats.range).toBe('DAY');
			expect(playfieldStats.count_game_sessions).toEqual(2);
			expect(playfieldStats.sum_money_in).toEqual(500);
			expect(playfieldStats.sum_money_out).toEqual(600);
			expect(playfieldStats.sum_credits).toEqual(5);
			expect(playfieldStats.sum_play_time).toEqual(78);
			expect(playfieldStats.min_money_in).toEqual(200);
			expect(playfieldStats.min_money_out).toEqual(0);
			expect(playfieldStats.min_credits).toEqual(2);
			expect(playfieldStats.min_play_time).toEqual(34);
			expect(playfieldStats.max_money_in).toEqual(300);
			expect(playfieldStats.max_money_out).toEqual(600);
			expect(playfieldStats.max_credits).toEqual(3);
			expect(playfieldStats.max_play_time).toEqual(44);
			expect(playfieldStats.avg_money_in).toEqual(250);
			expect(playfieldStats.avg_money_out).toEqual(300);
			expect(playfieldStats.avg_credits).toEqual(2.5 * 100);
			expect(playfieldStats.avg_play_time).toEqual(39);
			expect(playfieldStats.prize_id).toBe(TEST_PRIZE_1.id);
		});

		it('should save two playfield stats for a specific date with game sessions with two different prizes', async () => {
			const playfieldStatsRepository = new PlayfieldStatsRepository(
				db,
				CONTEXT
			);

			await db('game_session').insert({
				id: 'test-game-session-id-1',
				playfield_id: TEST_PLAYFIELD_1_1.id,
				tenant_id: TEST_TENANT_1_LOCATION_1.tenant.id,
				tenant_location_id: TEST_TENANT_1_LOCATION_1.id,
				prize_id: TEST_PRIZE_1.id,
				started_at: new Date('2025-03-01T00:00:00Z'),
				ended_at: new Date('2025-03-01T00:00:34Z'),
				result: {m: 0},
				amount_money_in: 200,
				amount_credits: 2,
				amount_money_out: 0,
				payment_method: 'COIN',
				created_at: new Date('2025-03-01T00:00:00Z'),
				updated_at: new Date('2025-03-01T23:59:59Z'),
			});

			await db('game_session').insert({
				id: 'test-game-session-id-2',
				playfield_id: TEST_PLAYFIELD_1_1.id,
				tenant_id: TEST_TENANT_1_LOCATION_1.tenant.id,
				tenant_location_id: TEST_TENANT_1_LOCATION_1.id,
				prize_id: TEST_PRIZE_2.id,
				started_at: new Date('2025-03-01T00:02:00Z'),
				ended_at: new Date('2025-03-01T00:02:44Z'),
				result: {m: 600},
				amount_money_in: 300,
				amount_credits: 3,
				amount_money_out: 600,
				payment_method: 'COIN',
				created_at: new Date('2025-03-01T00:00:00Z'),
				updated_at: new Date('2025-03-01T23:59:59Z'),
			});

			const dateWithGameSessions = new Date('2025-03-01T00:00:00Z');
			const endDateWithGameSessions = new Date('2025-03-01T23:59:59Z');

			await playfieldStatsRepository.generateAndSavePlayfieldStatsForDate(
				TEST_PLAYFIELD_1_1.id,
				dateWithGameSessions
			);

			const results: PlayfieldStatsDBType[] = await db('playfield_stats').where(
				{
					playfield_id: TEST_PLAYFIELD_1_1.id,
					start_date: dateWithGameSessions,
					end_date: endDateWithGameSessions,
				}
			);

			expect(results).toBeDefined();
			expect(results).toHaveLength(2);

			const playfieldStats1 = results!.find(
				(r) => r.prize_id === TEST_PRIZE_1.id
			);

			const playfieldStats2 = results!.find(
				(r) => r.prize_id === TEST_PRIZE_2.id
			);

			expect(playfieldStats1).toBeDefined();
			expect(playfieldStats1!.playfield_id).toBe(TEST_PLAYFIELD_1_1.id);
			expect(playfieldStats1!.start_date).toEqual(
				new Date('2025-03-01T00:00:00Z')
			);
			expect(playfieldStats1!.end_date).toEqual(
				new Date('2025-03-01T00:00:00Z')
			); // DB only stores the date, not the time
			expect(playfieldStats1!.range).toBe('DAY');
			expect(playfieldStats1!.count_game_sessions).toEqual(1);
			expect(playfieldStats1!.sum_money_in).toEqual(200);
			expect(playfieldStats1!.sum_money_out).toEqual(0);
			expect(playfieldStats1!.sum_credits).toEqual(2);
			expect(playfieldStats1!.sum_play_time).toEqual(34);
			expect(playfieldStats1!.min_money_in).toEqual(200);
			expect(playfieldStats1!.min_money_out).toEqual(0);
			expect(playfieldStats1!.min_credits).toEqual(2);
			expect(playfieldStats1!.min_play_time).toEqual(34);
			expect(playfieldStats1!.max_money_in).toEqual(200);
			expect(playfieldStats1!.max_money_out).toEqual(0);
			expect(playfieldStats1!.max_credits).toEqual(2);
			expect(playfieldStats1!.max_play_time).toEqual(34);
			expect(playfieldStats1!.avg_money_in).toEqual(200);
			expect(playfieldStats1!.avg_money_out).toEqual(0);
			expect(playfieldStats1!.avg_credits).toEqual(2 * 100);
			expect(playfieldStats1!.avg_play_time).toEqual(34);

			expect(playfieldStats2).toBeDefined();
			expect(playfieldStats2!.playfield_id).toBe(TEST_PLAYFIELD_1_1.id);
			expect(playfieldStats2!.start_date).toEqual(
				new Date('2025-03-01T00:00:00Z')
			);
			expect(playfieldStats2!.end_date).toEqual(
				new Date('2025-03-01T00:00:00Z')
			); // DB only stores the date, not the time
			expect(playfieldStats2!.range).toBe('DAY');
			expect(playfieldStats2!.count_game_sessions).toEqual(1);
			expect(playfieldStats2!.sum_money_in).toEqual(300);
			expect(playfieldStats2!.sum_money_out).toEqual(600);
			expect(playfieldStats2!.sum_credits).toEqual(3);
			expect(playfieldStats2!.sum_play_time).toEqual(44);
			expect(playfieldStats2!.min_money_in).toEqual(300);
			expect(playfieldStats2!.min_money_out).toEqual(600);
			expect(playfieldStats2!.min_credits).toEqual(3);
			expect(playfieldStats2!.min_play_time).toEqual(44);
			expect(playfieldStats2!.max_money_in).toEqual(300);
			expect(playfieldStats2!.max_money_out).toEqual(600);
			expect(playfieldStats2!.max_credits).toEqual(3);
			expect(playfieldStats2!.max_play_time).toEqual(44);
			expect(playfieldStats2!.avg_money_in).toEqual(300);
			expect(playfieldStats2!.avg_money_out).toEqual(600);
			expect(playfieldStats2!.avg_credits).toEqual(3 * 100);
			expect(playfieldStats2!.avg_play_time).toEqual(44);
		});
	});

	describe('findPlayfieldStatsByRange', () => {
		describe('grouped by playfield', () => {
			it('should return playfield stats per DAY for a specific playfield and day', async () => {
				const playfieldStatsRepository = new PlayfieldStatsRepository(
					db,
					CONTEXT
				);

				const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
					'DAY',
					{
						playfieldId: TEST_PLAYFIELD_1_1.id,
					},
					['playfield_id'],
					new Date('2025-02-01T00:00:00Z'),
					new Date('2025-02-01T23:59:59Z')
				);

				expect(result).toBeDefined();

				const playfieldStatsArray = result as PlayfieldStats[];
				const playfieldStats = playfieldStatsArray[0]!;

				expect(playfieldStatsArray.length).toBe(1);
				expect(playfieldStats).toBeInstanceOf(PlayfieldStats);
				expect(playfieldStats.playfieldId).toBe(TEST_PLAYFIELD_1_1.id);
				expect(playfieldStats.startDate).toEqual(
					new Date('2025-02-01T00:00:00Z')
				);
				expect(playfieldStats.endDate).toEqual(
					new Date('2025-02-01T23:59:59Z')
				);
				expect(playfieldStats.range).toBe('DAY');

				expect(playfieldStats.stats.toJSON()).toEqual(
					PLAYFIELD_STATS_1_1_2025_02_01.stats.toJSON()
				);
			});

			it('should return playfield stats per DAY for a specific playfield and multiple days', async () => {
				const playfieldStatsRepository = new PlayfieldStatsRepository(
					db,
					CONTEXT
				);

				const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
					'DAY',
					{
						playfieldId: TEST_PLAYFIELD_1_1.id,
					},
					['playfield_id'],
					new Date('2025-02-01T00:00:00Z'),
					new Date('2025-02-03T23:59:59Z')
				);

				expect(result).toBeDefined();

				const playfieldStatsArray = result as PlayfieldStats[];
				expect(playfieldStatsArray.length).toBe(3);

				const expectedStats = [
					PLAYFIELD_STATS_1_1_2025_02_01,
					PLAYFIELD_STATS_1_1_2025_02_02,
					PLAYFIELD_STATS_1_1_2025_02_03,
				];

				playfieldStatsArray.forEach((playfieldStats, index) => {
					expect(playfieldStats).toBeInstanceOf(PlayfieldStats);
					expect(playfieldStats.playfieldId).toBe(TEST_PLAYFIELD_1_1.id);
					expect(playfieldStats.startDate).toEqual(
						new Date(`2025-02-0${index + 1}T00:00:00Z`)
					);
					expect(playfieldStats.endDate).toEqual(
						new Date(`2025-02-0${index + 1}T23:59:59Z`)
					);
					expect(playfieldStats.range).toBe('DAY');

					expect(playfieldStats.stats.toJSON()).toEqual(
						expectedStats[index]!.stats.toJSON()
					);
				});
			});

			it('should return playfield stats per WEEK for a specific playfield', async () => {
				const playfieldStatsRepository = new PlayfieldStatsRepository(
					db,
					CONTEXT
				);

				const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
					'WEEK',
					{
						playfieldId: TEST_PLAYFIELD_1_1.id,
					},
					['playfield_id'],
					new Date('2025-02-01T00:00:00Z'),
					new Date('2025-02-07T23:59:59Z')
				);

				expect(result).toBeDefined();

				const playfieldStatsArray = result as PlayfieldStats[];
				expect(playfieldStatsArray.length).toBe(2);

				const playfieldStats1 = playfieldStatsArray[0]!;
				const playfieldStats2 = playfieldStatsArray[1]!;

				expect(playfieldStats1).toBeInstanceOf(PlayfieldStats);
				expect(playfieldStats1.playfieldId).toBe(TEST_PLAYFIELD_1_1.id);
				expect(playfieldStats1.startDate).toEqual(
					new Date('2025-01-27T00:00:00Z')
				);
				expect(playfieldStats1.endDate).toEqual(
					new Date('2025-02-02T23:59:59Z')
				);
				expect(playfieldStats1.range).toBe('WEEK');
				expect(playfieldStats1.stats.toJSON()).toEqual(
					StatisticsData.aggregate([
						PLAYFIELD_STATS_1_1_2025_02_01.stats,
						PLAYFIELD_STATS_1_1_2025_02_02.stats,
					]).toJSON()
				);

				expect(playfieldStats2).toBeInstanceOf(PlayfieldStats);
				expect(playfieldStats2.playfieldId).toBe(TEST_PLAYFIELD_1_1.id);
				expect(playfieldStats2.startDate).toEqual(
					new Date('2025-02-03T00:00:00Z')
				);
				expect(playfieldStats2.endDate).toEqual(
					new Date('2025-02-09T23:59:59Z')
				);
				expect(playfieldStats2.range).toBe('WEEK');
				expect(playfieldStats2.stats.toJSON()).toEqual(
					PLAYFIELD_STATS_1_1_2025_02_03.stats.toJSON()
				);
			});

			it('should return playfield stats per MONTH for a specific playfield', async () => {
				const playfieldStatsRepository = new PlayfieldStatsRepository(
					db,
					CONTEXT
				);

				const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
					'MONTH',
					{
						playfieldId: TEST_PLAYFIELD_1_1.id,
					},
					['playfield_id'],
					new Date('2025-02-01T00:00:00Z'),
					new Date('2025-02-28T23:59:59Z')
				);

				expect(result).toBeDefined();

				const playfieldStatsArray = result as PlayfieldStats[];
				expect(playfieldStatsArray.length).toBe(1);

				const playfieldStats = playfieldStatsArray[0]!;

				expect(playfieldStats).toBeInstanceOf(PlayfieldStats);
				expect(playfieldStats.playfieldId).toBe(TEST_PLAYFIELD_1_1.id);
				expect(playfieldStats.startDate).toEqual(
					new Date('2025-02-01T00:00:00Z')
				);
				expect(playfieldStats.endDate).toEqual(
					new Date('2025-02-28T23:59:59Z')
				);
				expect(playfieldStats.range).toBe('MONTH');
				expect(playfieldStats.stats.toJSON()).toEqual(
					StatisticsData.aggregate([
						PLAYFIELD_STATS_1_1_2025_02_01.stats,
						PLAYFIELD_STATS_1_1_2025_02_02.stats,
						PLAYFIELD_STATS_1_1_2025_02_03.stats,
					]).toJSON()
				);
			});

			it('should return playfield stats per HOUR for a specific playfield', async () => {
				const playfieldStatsRepository = new PlayfieldStatsRepository(
					db,
					CONTEXT
				);

				const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
					'HOUR',
					{
						playfieldId: TEST_PLAYFIELD_1_1.id,
					},
					['playfield_id'],
					new Date('2025-02-01T00:00:00Z'),
					new Date('2025-02-01T23:59:59Z')
				);

				expect(result).toBeDefined();

				const playfieldStatsArray = result as PlayfieldStats[];

				expect(playfieldStatsArray.length).toBe(12);

				// TODO: assert each hour's stats
			});

			it('should return undefined if no stats are found for the given range', async () => {
				const playfieldStatsRepository = new PlayfieldStatsRepository(
					db,
					CONTEXT
				);

				const result = await playfieldStatsRepository.findPlayfieldStatsByRange(
					'DAY',
					{
						playfieldId: 'non-existing-playfield-id',
					},
					['playfield_id'],
					new Date('2025-02-01T00:00:00Z'),
					new Date('2025-02-01T23:59:59Z')
				);

				expect(result).not.toBeDefined();
			});
		});
	});
});
