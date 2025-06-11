import {mapArrayOrSingleItem} from '@lib/utils';

import type {
	PlayfieldPrizeDBType,
	PlayfieldPrizeDTOType,
} from './playfield-prize.schema';

class PlayfieldPrize {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public prizeId: string,
		public tenantId: string,
		public playfieldId: string,
		public addedAt: Date,
		public removedAt: Date | undefined,
		public createdAt: Date,
		public updatedAt: Date
	) {}

	static fromDB(data: PlayfieldPrizeDBType[]): PlayfieldPrize[];
	static fromDB(data: PlayfieldPrizeDBType): PlayfieldPrize;
	static fromDB(
		data: PlayfieldPrizeDBType | PlayfieldPrizeDBType[]
	): PlayfieldPrize | PlayfieldPrize[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new PlayfieldPrize(
				item.id,
				item.name,
				item.description ?? '',
				item.prize_id,
				item.tenant_id,
				item.playfield_id,
				item.added_at,
				item.removed_at,
				item.createdAt,
				item.updatedAt
			);
		});
	}

	toJSON(): PlayfieldPrizeDTOType {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			prizeId: this.prizeId,
			tenantId: this.tenantId,
			playfieldId: this.playfieldId,
			addedAt: this.addedAt,
			removedAt: this.removedAt,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export {PlayfieldPrize};
