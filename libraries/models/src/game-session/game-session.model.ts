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
	id: string;
	playfieldId: string;
	tenantId: string;
	tenantLocationId: string;
	prizeId: string | undefined;
	startedAt: Date | undefined;
	endedAt: Date | undefined;

	result: Record<string, unknown> | undefined;
	amountMoneyIn: number | undefined;
	amountCredits: number | undefined;
	amountMoneyOut: number | undefined;
	paymentMethod: string | undefined;

	createdAt: Date;
	updatedAt: Date;

	static schemas = {
		DTOSchema: GameSessionDTOSchema,
		CreateDTOSchema: GameSessionInsertDBSchema,
		DBSchema: GameSessionDBSchema,
	};

	constructor(
		id: string,
		playfieldId: string,
		tenantId: string,
		tenantLocationId: string,
		prizeId: string | undefined,
		startedAt: Date | undefined,
		endedAt: Date | undefined,
		result: Record<string, unknown> | undefined,
		amountMoneyIn: number | undefined,
		amountCredits: number | undefined,
		amountMoneyOut: number | undefined,
		paymentMethod: string | undefined,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.playfieldId = playfieldId;
		this.tenantId = tenantId;
		this.tenantLocationId = tenantLocationId;
		this.startedAt = startedAt;
		this.endedAt = endedAt;
		this.result = result;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.amountMoneyIn = amountMoneyIn;
		this.amountCredits = amountCredits;
		this.amountMoneyOut = amountMoneyOut;
		this.paymentMethod = paymentMethod;
		this.prizeId = prizeId;
	}

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
					item.updated_at
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
				item.updatedAt
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
		};
	}
}

export {GameSession, GamePaymentMethod};

export type {GameSessionDBType, GameSessionDTOType, GameSessionInsertDBType};
