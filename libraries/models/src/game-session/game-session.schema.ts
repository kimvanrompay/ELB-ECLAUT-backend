import {z} from '@hono/zod-openapi';

enum GamePaymentMethod {
	COIN = 'COIN',
	BILL = 'BILL',
	CARD = 'CARD',
	CASHLESS = 'CASHLESS',
	OTHER = 'OTHER',
}

const GameSessionDBSchema = z.object({
	id: z.string(),
	playfield_id: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	prize_id: z.string().optional(),

	// Messages arrive in separate events, so we need to be able to insert gamesessions with mostly optional properties.
	started_at: z.date().optional(),
	payment_method: z.nativeEnum(GamePaymentMethod).optional(),
	amount_money_in: z.number().optional(),
	amount_money_out: z.number().optional(),
	amount_credits: z.number().optional(),
	ended_at: z.date().optional(),

	result: z.object({}).passthrough(),

	created_at: z.date(),
	updated_at: z.date(),
});

const GameSessionDTOSchema = z.object({
	id: z.string(),
	playfieldId: z.string(),
	tenantId: z.string(),
	tenantLocationId: z.string(),
	prizeId: z.string().optional(),

	startedAt: z.date().optional(),
	paymentMethod: z.nativeEnum(GamePaymentMethod).optional(),
	amountMoneyIn: z.number().optional(),
	amountMoneyOut: z.number().optional(),
	amountCredits: z.number().optional(),
	endedAt: z.date().optional(),

	result: z.object({}).passthrough(),

	createdAt: z.date(),
	updatedAt: z.date(),
});

/**
 * We can receive gamesession events in the wrong order. Therefore, we need to be able to insert gamesessions with mostly optional properties.
 */
const GameSessionInsertDBSchema = z.object({
	id: z.string(),
	playfield_id: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	prize_id: z.string().optional(),

	started_at: z.date().optional(),
	ended_at: z.date().optional(),
	payment_method: z.nativeEnum(GamePaymentMethod).optional(),
	amount_money_in: z.number().optional(),
	amount_money_out: z.number().optional(),
	amount_credits: z.number().optional(),

	result: z.object({}).passthrough().optional(),

	updated_at: z.date(),
});

type GameSessionDBType = z.infer<typeof GameSessionDBSchema>;
type GameSessionDTOType = z.infer<typeof GameSessionDTOSchema>;
type GameSessionInsertDBType = z.infer<typeof GameSessionInsertDBSchema>;

export {
	GameSessionDBSchema,
	GameSessionDTOSchema,
	GameSessionInsertDBSchema,
	GamePaymentMethod,
};

export type {GameSessionDBType, GameSessionDTOType, GameSessionInsertDBType};
