import type {Knex} from 'knex';

import {PlayfieldStats} from '@lib/models/playfield-stats';

import type {IKnexRepository} from '../internal-types';

interface IPlayfieldStatsRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IPlayfieldStatsRepository;

	getPlayfieldStatsByPlayfieldIdBetweenDatePerHour(
		playfieldId: string,
		startDate: Date,
		endDate: Date
	): Promise<PlayfieldStats[] | undefined>;

	getPlayfieldStatsByPlayfieldIdBetweenDatePerDay(
		playfieldId: string,
		startDate: Date,
		endDate: Date
	): Promise<PlayfieldStats[] | undefined>;

	generateAndSavePlayfieldStatsForDate(
		playfieldId: string,
		date: Date
	): Promise<void>;
}

export type {IPlayfieldStatsRepository};
