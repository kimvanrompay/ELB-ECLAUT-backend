import type {Knex} from 'knex';

import type {PlayfieldPrize} from '@lib/models/playfield-prize';
import {
	Prize,
	type PrizeInsertDBType,
	type PrizeUpdateDBType,
} from '@lib/models/prize';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IKnexRepository} from '../internal-types';

interface IPrizeRepository extends IKnexRepository {
	withTransaction(trx: Knex.Transaction): IPrizeRepository;

	findPrizes(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<Prize[]>;

	countPrizes(
		filters?: DatabaseQueryFilters,
		tenantId?: string
	): Promise<number>;

	getPrizeById(id: string, tenantId?: string): Promise<Prize | undefined>;

	createPrize(prize: PrizeInsertDBType): Promise<Prize>;

	updatePrize(
		id: string,
		prize: PrizeUpdateDBType,
		tenantId?: string
	): Promise<Prize | undefined>;

	addPrizeToPlayfield(
		prizeId: string | null,
		playfieldId: string,
		tenantId?: string
	): Promise<Prize | undefined>;

	getPrizesHistoryForPlayfield(
		playfieldId: string,
		startDate: Date,
		endDate: Date,
		tenantId?: string
	): Promise<PlayfieldPrize[]>;
}

export type {IPrizeRepository};
