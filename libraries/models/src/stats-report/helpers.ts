import {z} from '@hono/zod-openapi';

const BaseStatsReportDTOSchema = z.object({
	unit: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']),
	startDate: z.date(),
	endDate: z.date(),

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
});

const PopularPlayfieldsSchema = z
	.array(
		z.object({
			playfieldId: z.string(),
			playfieldName: z.string(),
			serialNumber: z.string(),
			cabinetName: z.string(),
			gametypeId: z.string(),
			gametypeName: z.string(),
			categoryId: z.string().optional(),
			categoryName: z.string().optional(),
			sumMoneyIn: z.number(),
			sumMoneyOut: z.number(),
			sumProfit: z.number(),
			sumPlayTime: z.number(),
			avgPlayTime: z.number(),
		})
	)
	.optional();

const PopularLocationsSchema = z
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
	.optional();

const PopularPrizesSchema = z
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
	.optional();

const PopularGametypeSchema = z
	.array(
		z.object({
			gametypeId: z.string(),
			gametypeName: z.string(),
			sumMoneyIn: z.number(),
			sumMoneyOut: z.number(),
			sumProfit: z.number(),
			sumPlayTime: z.number(),
			avgPlayTime: z.number(),
		})
	)
	.optional();

const PopularPlayfieldCategoriesSchema = z
	.array(
		z.object({
			playfieldCategoryId: z.string(),
			playfieldCategoryName: z.string(),
			sumMoneyIn: z.number(),
			sumMoneyOut: z.number(),
			sumProfit: z.number(),
			sumPlayTime: z.number(),
			avgPlayTime: z.number(),
		})
	)
	.optional();

const GameSessionsPerHourOfDaySchema = z
	.record(z.number().min(0).max(23), z.number())
	.optional();

const GameSessionsOverTimeSchema = z.array(
	z.object({
		date: z.date(),
		countGameSessions: z.number(),
		sumMoneyIn: z.number(),
		sumMoneyOut: z.number(),
		sumProfit: z.number(),
		sumCredits: z.number(),
	})
);

const PaymentMethodsSchema = z
	.record(
		z.string(),
		z.object({
			moneyIn: z.number(),
			countGameSessions: z.number(),
		})
	)
	.optional();

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
	externalId?: string;
	playfieldId: string;
	playfieldName: string;
	serialNumber: string;
	cabinetName: string;
	gametypeId: string;
	gametypeName: string;
	playfieldCategoryId?: string;
	playfieldCategoryName?: string;
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

type PopularPlayfieldCategoryStats = {
	playfieldCategoryId: string;
	playfieldCategoryName: string;
	sumMoneyIn: number;
	sumMoneyOut: number;
	sumProfit: number;
	sumPlayTime: number;
	avgPlayTime: number;
};

export {
	PopularPlayfieldsSchema,
	PopularLocationsSchema,
	PopularPrizesSchema,
	PopularGametypeSchema,
	PopularPlayfieldCategoriesSchema,
	GameSessionsPerHourOfDaySchema,
	GameSessionsOverTimeSchema,
	PaymentMethodsSchema,
	BaseStatsReportDTOSchema,
};

export type {
	PopularPrizeStats,
	PopularPlayfieldStats,
	PopularGametypeStats,
	PopularLocationStats,
	PopularPlayfieldCategoryStats,
};
