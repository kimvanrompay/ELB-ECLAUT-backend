import {mapArrayOrSingleItem} from '@lib/utils';

import {
	GamePaymentMethod,
	GameSessionDBSchema,
	type GameSessionDBType,
	GameSessionDTOSchema,
	type GameSessionDTOType,
	GameSessionInsertDBSchema,
	type GameSessionInsertDBType,
} from './game-session.schema';

class GameSession {
	static schemas = {
		DTOSchema: GameSessionDTOSchema,
		CreateDTOSchema: GameSessionInsertDBSchema,
		DBSchema: GameSessionDBSchema,
	};

	constructor(
		public id: string,
		public playfieldId: string,
		public tenantId: string,
		public tenantLocationId: string,
		public prizeId: string | undefined,
		public startedAt: Date | undefined,
		public endedAt: Date | undefined,
		public result: Record<string, unknown> | undefined,
		public amountMoneyIn: number | undefined,
		public amountCredits: number | undefined,
		public amountMoneyOut: number | undefined,
		public paymentMethod: string | undefined,
		public createdAt: Date,
		public updatedAt: Date,
		public serialNumber: string,
		public playerId?: string
	) {}

	static fromDBType(data: GameSessionDBType[]): GameSession[];
	static fromDBType(data: GameSessionDBType): GameSession;
	static fromDBType(
		data: GameSessionDBType | GameSessionDBType[]
	): GameSession | GameSession[] {
		return mapArrayOrSingleItem(data, (item) => {
			try {
				// Postgres Node driver does parsing for us, but in case the driver suddenly stops doing that, we have a fallback.
				const parsedResult =
					typeof item.result === 'string'
						? JSON.parse(item.result)
						: item.result;

				return new GameSession(
					item.id,
					item.playfield_id,
					item.tenant_id,
					item.tenant_location_id,
					item.prize_id,
					item.started_at,
					item.ended_at,
					parsedResult,
					item.amount_money_in,
					item.amount_credits,
					item.amount_money_out,
					item.payment_method,
					item.created_at,
					item.updated_at,
					item.serial_number,
					item.player_id
				);
			} catch (e) {
				console.error(e);
				throw new Error(
					`Failed to parse result for game session with id ${item.id}`
				);
			}
		});
	}

	static fromJSON(data: GameSessionDTOType[]): GameSession[];
	static fromJSON(data: GameSessionDTOType): GameSession;
	static fromJSON(
		data: GameSessionDTOType | GameSessionDTOType[]
	): GameSession | GameSession[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new GameSession(
				item.id,
				item.playfieldId,
				item.tenantId,
				item.tenantLocationId,
				item.prizeId,
				item.startedAt,
				item.endedAt,
				item.result,
				item.amountMoneyIn,
				item.amountCredits,
				item.amountMoneyOut,
				item.paymentMethod,
				item.createdAt,
				item.updatedAt,
				item.serialNumber,
				undefined
			);
		});
	}

	toJSON(): GameSessionDTOType {
		return {
			id: this.id,
			playfieldId: this.playfieldId,
			tenantId: this.tenantId,
			tenantLocationId: this.tenantLocationId,
			prizeId: this.prizeId,
			startedAt: this.startedAt,
			endedAt: this.endedAt,
			result: this.result ?? {},
			amountMoneyIn: this.amountMoneyIn,
			amountCredits: this.amountCredits,
			amountMoneyOut: this.amountMoneyOut,
			paymentMethod: (this.paymentMethod ??
				GamePaymentMethod.OTHER) as GamePaymentMethod,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			serialNumber: this.serialNumber,
		};
	}
}

export {GameSession, GamePaymentMethod};

export type {GameSessionDBType, GameSessionDTOType, GameSessionInsertDBType};
