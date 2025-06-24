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
		.record(z.coerce.number().min(0).max(23), z.number())
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

	tenant_id: z.string().optional(),
	tenant_location_id: z.string().optional(),
	serial_number: z.string().optional(),
	playfield_id: z.string().optional(),
	gametype_id: z.string().optional(),
	prize_id: z.string().optional(),
});

const PlayfieldStatsSchema = StatisticsDataSchema.extend({
	id: z.string(),
	range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	startDate: z.date(),
	endDate: z.date(),

	tenantId: z.string().optional(),
	tenantLocationId: z.string().optional(),
	serialNumber: z.string().optional(),
	playfieldId: z.string().optional(),
	gametypeId: z.string().optional(),
	prizeId: z.string().optional(),
});

type StatisticsDataDBType = z.infer<typeof StatisticsDataDBSchema>;
type StatisticsDataType = z.infer<typeof StatisticsDataSchema>;
type PlayfieldStatsDBType = z.infer<typeof PlayfieldStatsDBSchema>;
type PlayfieldStatsType = z.infer<typeof PlayfieldStatsSchema>;

type PopularPrizeStats = {
	prizeId: string;
	prizeName: string;
	sumMoneyIn: number;
	sumMoneyOut: number;
	sumProfit: number;
	sumPlayTime: number;
	avgPlayTime: number;
};

type PopularPlayfieldStats = {
	playfieldId: string;
	playfieldName: string;
	serialNumber: string;
	cabinetName: string;
	gametypeId: string;
	gametypeName: string;
	sumMoneyIn: number;
	sumMoneyOut: number;
	sumProfit: number;
	sumPlayTime: number;
	avgPlayTime: number;
};

type PopularGametypeStats = {
	gametypeId: string;
	gametypeName: string;
	sumMoneyIn: number;
	sumMoneyOut: number;
	sumProfit: number;
	sumPlayTime: number;
	avgPlayTime: number;
};

type PopularLocationStats = {
	tenantLocationId: string;
	tenantLocationName: string;
	tenantId: string;
	tenantName: string;
	sumMoneyIn: number;
	sumMoneyOut: number;
	sumProfit: number;
	sumPlayTime: number;
	avgPlayTime: number;
};

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
	PopularPrizeStats,
	PopularPlayfieldStats,
	PopularGametypeStats,
	PopularLocationStats,
};
