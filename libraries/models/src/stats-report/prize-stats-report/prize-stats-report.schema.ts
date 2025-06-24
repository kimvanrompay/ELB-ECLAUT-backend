import {z} from '@hono/zod-openapi';

import {
	BaseStatsReportDTOSchema,
	GameSessionsOverTimeSchema,
	GameSessionsPerHourOfDaySchema,
	PaymentMethodsSchema,
	PopularLocationsSchema,
	PopularPlayfieldsSchema,
} from '../helpers';

const PrizeStatsReportDTOSchema = BaseStatsReportDTOSchema.extend({
	prizeId: z.string(),

	paymentMethods: PaymentMethodsSchema,
	gameSessionsOverTime: GameSessionsOverTimeSchema,
	gameSessionsPerHourOfDay: GameSessionsPerHourOfDaySchema,

	popularPlayfields: PopularPlayfieldsSchema,

	popularLocations: PopularLocationsSchema,
});

type PrizeStatsReportDTOType = z.infer<typeof PrizeStatsReportDTOSchema>;

export {PrizeStatsReportDTOSchema};
export type {PrizeStatsReportDTOType};
