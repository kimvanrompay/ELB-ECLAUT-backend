import type {Knex} from 'knex';

import {
	PlayfieldStats,
	type PopularGametypeStats,
	type PopularLocationStats,
	type PopularPlayfieldCategoryStats,
	type PopularPlayfieldStats,
	type PopularPrizeStats,
} from '@lib/models/playfield-stats';

import type {IKnexRepository} from '../internal-types';

interface IPlayfieldStatsRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IPlayfieldStatsRepository;

	findPlayfieldStatsByRange(
		unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH',
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		groupBy: (
			| 'playfield_id'
			| 'tenant_location_id'
			| 'tenant_id'
			| 'gametype_id'
			| 'serial_number'
			| 'prize_id'
			| 'playfield_category_id'
		)[],
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PlayfieldStats[] | undefined>;

	getPlayfieldStatsPerHour(
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		groupBy: (
			| 'playfield_id'
			| 'tenant_location_id'
			| 'tenant_id'
			| 'gametype_id'
			| 'serial_number'
			| 'prize_id'
			| 'playfield_category_id'
		)[],
		startDate: Date,
		endDate: Date
	): Promise<PlayfieldStats[] | undefined>;

	getPlayfieldStatsByUnitMoreThanADay(
		unit: 'WEEK' | 'MONTH' | 'YEAR',
		groupBy:
			| 'playfield_id'
			| 'tenant_location_id'
			| 'tenant_id'
			| 'gametype_id'
			| 'serial_number'
			| 'prize_id'
			| 'playfield_category_id',
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date
	): Promise<PlayfieldStats[] | undefined>;

	generateAndSavePlayfieldStatsForDate(
		playfieldId: string,
		date: Date
	): Promise<void>;

	getPopularPrizeStatsForRange(
		where: {
			playfieldId?: string;
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularPrizeStats[]>;

	getPopularPlayfieldStatsForRange(
		where: {
			tenantLocationId?: string;
			tenantId?: string;
			gametypeId?: string;
			serialNumber?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularPlayfieldStats[]>;

	getPopularGametypeStatsForRange(
		where: {
			tenantLocationId?: string;
			tenantId?: string;
			serialNumber?: string;
			prizeId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularGametypeStats[]>;

	getPopularLocationStatsForRange(
		where: {
			tenantId?: string;
			gametypeId?: string;
			prizeId?: string;
			playfieldCategoryId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularLocationStats[]>;

	getPopularPlayfieldCategoryStatsForRange(
		where: {
			tenantLocationId?: string;
			tenantId?: string;
			serialNumber?: string;
			prizeId?: string;
		},
		startDate: Date,
		endDate: Date,
		loggedInTenantId?: string,
		loggedInLocationIds?: string[],
		limit?: number,
		orderBy?: `${string} ${'asc' | 'desc'}`
	): Promise<PopularPlayfieldCategoryStats[]>;
}

export type {IPlayfieldStatsRepository};
