import {z} from '@hono/zod-openapi';

import {
	BaseStatsReportDTOSchema,
	GameSessionsOverTimeSchema,
	GameSessionsPerHourOfDaySchema,
	PaymentMethodsSchema,
	PopularLocationsSchema,
	PopularPlayfieldsSchema,
	PopularPrizesSchema,
} from '../helpers';

const PlayfieldCategoryStatsReportDTOSchema = BaseStatsReportDTOSchema.extend({
	playfieldCategoryId: z.string(),

	paymentMethods: PaymentMethodsSchema,
	gameSessionsOverTime: GameSessionsOverTimeSchema,
	gameSessionsPerHourOfDay: GameSessionsPerHourOfDaySchema,
	popularPlayfields: PopularPlayfieldsSchema,
	popularLocations: PopularLocationsSchema,
	popularPrizes: PopularPrizesSchema,
});

type PlayfieldCategoryStatsReportDTOType = z.infer<
	typeof PlayfieldCategoryStatsReportDTOSchema
>;

export {PlayfieldCategoryStatsReportDTOSchema};
export type {PlayfieldCategoryStatsReportDTOType};
