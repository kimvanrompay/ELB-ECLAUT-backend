import {z} from '@hono/zod-openapi';

const StatisticsDataDBSchema = z.object({
	count_game_sessions: z.coerce.number(),

	sum_play_time: z.number(),
	sum_credits: z.number(),
	sum_money_in: z.number(),
	sum_money_out: z.number(),

	sum_profit: z.number(),

	avg_play_time: z.number(),
	avg_money_in: z.number(),
	avg_money_out: z.number(),
	avg_credits: z.number(),

	min_play_time: z.number(),
	min_money_in: z.number(),
	min_money_out: z.number(),
	min_credits: z.number(),

	max_play_time: z.number(),
	max_money_in: z.number(),
	max_money_out: z.number(),
	max_credits: z.number(),

	game_sessions_per_hour: z
		.record(z.number().min(0).max(23), z.number())
		.optional(),
	payment_methods: z
		.record(
			z.string(),
			z.object({
				m: z.number(),
				c: z.number(),
			})
		)
		.optional(),
});

const StatisticsDataSchema = z.object({
	countGameSessions: z.number(),

	sumPlayTime: z.number(),
	sumCredits: z.number(),
	sumMoneyIn: z.number(),
	sumMoneyOut: z.number(),

	sumProfit: z.number(),

	returnToPlayer: z.number(),

	avgPlayTime: z.number(),
	avgMoneyIn: z.number(),
	avgMoneyOut: z.number(),
	avgCredits: z.number(),

	minPlayTime: z.number(),
	minMoneyIn: z.number(),
	minMoneyOut: z.number(),
	minCredits: z.number(),

	maxPlayTime: z.number(),
	maxMoneyIn: z.number(),
	maxMoneyOut: z.number(),
	maxCredits: z.number(),

	gameSessionsPerHour: z
		.record(z.number().min(0).max(23), z.number())
		.optional(),
	paymentMethods: z
		.record(
			z.string(),
			z.object({
				moneyIn: z.number(),
				countGameSessions: z.number(),
			})
		)
		.optional(),
});

const PlayfieldStatsDBSchema = StatisticsDataDBSchema.extend({
	id: z.string(),
	range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	start_date: z.date(),
	end_date: z.date(),

	tenant_id: z.string(),
	tenant_location_id: z.string(),
	serial_number: z.string(),
	playfield_id: z.string(),
	gametype_id: z.string(),
});

const PlayfieldStatsSchema = StatisticsDataSchema.extend({
	id: z.string(),
	range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	startDate: z.date(),
	endDate: z.date(),

	tenantId: z.string(),
	tenantLocationId: z.string(),
	serialNumber: z.string(),
	playfieldId: z.string(),
	gametypeId: z.string(),
});

type StatisticsDataDBType = z.infer<typeof StatisticsDataDBSchema>;
type StatisticsDataType = z.infer<typeof StatisticsDataSchema>;
type PlayfieldStatsDBType = z.infer<typeof PlayfieldStatsDBSchema>;
type PlayfieldStatsType = z.infer<typeof PlayfieldStatsSchema>;

export {
	PlayfieldStatsDBSchema,
	StatisticsDataDBSchema,
	StatisticsDataSchema,
	PlayfieldStatsSchema,
};
export type {
	PlayfieldStatsDBType,
	StatisticsDataDBType,
	StatisticsDataType,
	PlayfieldStatsType,
};
