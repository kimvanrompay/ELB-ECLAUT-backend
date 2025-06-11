import {z} from '@hono/zod-openapi';

const PrizeStatsReportDTOSchema = z.object({
	unit: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']),
	startDate: z.date(),
	endDate: z.date(),

	prizeId: z.string(),

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

	paymentMethods: z
		.record(
			z.string(),
			z.object({
				moneyIn: z.number(),
				countGameSessions: z.number(),
			})
		)
		.optional(),

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

	popularPlayfields: z
		.array(
			z.object({
				playfieldId: z.string(),
				playfieldName: z.string(),
				serialNumber: z.string(),
				cabinetName: z.string(),
				gametypeId: z.string(),
				gametypeName: z.string(),
				sumMoneyIn: z.number(),
				sumMoneyOut: z.number(),
				sumProfit: z.number(),
				sumPlayTime: z.number(),
				avgPlayTime: z.number(),
			})
		)
		.optional(),

	popularLocations: z
		.array(
			z.object({
				tenantLocationId: z.string(),
				tenantLocationName: z.string(),
				tenantId: z.string(),
				tenantName: z.string(),
				sumMoneyIn: z.number(),
				sumMoneyOut: z.number(),
				sumProfit: z.number(),
				sumPlayTime: z.number(),
				avgPlayTime: z.number(),
			})
		)
		.optional(),
});

type PrizeStatsReportDTOType = z.infer<typeof PrizeStatsReportDTOSchema>;

export {PrizeStatsReportDTOSchema};
export type {PrizeStatsReportDTOType};
