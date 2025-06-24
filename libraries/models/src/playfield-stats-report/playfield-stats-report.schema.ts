import {z} from '@hono/zod-openapi';

import {PlayfieldPrizeDTOSchema} from '../playfield-prize/playfield-prize.schema';

const PlayfieldStatsReportDBSchema = z.object({
	// range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	unit: z.enum(['HOUR', 'DAY']),
	start_date: z.date(),
	end_date: z.date(),
	serial_number: z.string(),
	playfield_id: z.string(),
	gametype_id: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),
	prize_id: z.string().optional(),

	data: z.array(z.any()).optional(),
});

const PlayfieldStatsReportDTOSchema = z.object({
	// range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	unit: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']),
	startDate: z.date(),
	endDate: z.date(),
	playfieldId: z.string(),
	prizeId: z.string().optional(),

	countGameSessions: z.number(),
	sumMoneyIn: z.number(),
	sumMoneyOut: z.number(),
	sumProfit: z.number(),
	sumCredits: z.number(),
	returnToPlayer: z.number(),
	avgPlayTime: z.number(),
	sumPlayTime: z.number(),
	avgMoneyIn: z.number(),
	avgMoneyOut: z.number(),
	avgCredits: z.number(),
	maxPlayTime: z.number(),
	minPlayTime: z.number(),
	maxMoneyIn: z.number(),
	minMoneyIn: z.number(),
	minMoneyOut: z.number(),
	maxMoneyOut: z.number(),
	maxCredits: z.number(),
	minCredits: z.number(),

	gameSessionsOverTime: z.array(
		z.object({
			date: z.date(),
			countGameSessions: z.number(),
			sumMoneyIn: z.number(),
			sumMoneyOut: z.number(),
			sumProfit: z.number(),
			sumCredits: z.number(),
		})
	),

	gameSessionsPerHourOfDay: z
		.record(z.number().min(0).max(23), z.number())
		.optional(),

	popularPrizes: z
		.array(
			z.object({
				prizeId: z.string(),
				prizeName: z.string(),
				sumMoneyIn: z.number(),
				sumMoneyOut: z.number(),
				sumProfit: z.number(),
				sumPlayTime: z.number(),
				avgPlayTime: z.number(),
			})
		)
		.optional(),

	prizeHistory: z.array(PlayfieldPrizeDTOSchema),

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

type PlayfieldStatsReportDBType = z.infer<typeof PlayfieldStatsReportDBSchema>;

type PlayfieldStatsReportDTOType = z.infer<
	typeof PlayfieldStatsReportDTOSchema
>;

export {PlayfieldStatsReportDBSchema, PlayfieldStatsReportDTOSchema};

export type {PlayfieldStatsReportDBType, PlayfieldStatsReportDTOType};
