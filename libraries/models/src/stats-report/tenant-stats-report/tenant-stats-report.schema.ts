import {z} from '@hono/zod-openapi';

import {
	BaseStatsReportDTOSchema,
	GameSessionsOverTimeSchema,
	GameSessionsPerHourOfDaySchema,
	PaymentMethodsSchema,
	PopularGametypeSchema,
	PopularLocationsSchema,
	PopularPlayfieldsSchema,
	PopularPrizesSchema,
} from '../helpers';

const TenantStatsReportDTOSchema = BaseStatsReportDTOSchema.extend({
	tenantId: z.string(),

	paymentMethods: PaymentMethodsSchema,

	gameSessionsOverTime: GameSessionsOverTimeSchema,

	gameSessionsPerHourOfDay: GameSessionsPerHourOfDaySchema,

	popularPrizes: PopularPrizesSchema,

	popularPlayfields: PopularPlayfieldsSchema,

	popularGametypes: PopularGametypeSchema,

	popularLocations: PopularLocationsSchema,
});

type TenantStatsReportDTO = z.infer<typeof TenantStatsReportDTOSchema>;

export {TenantStatsReportDTOSchema};
export type {TenantStatsReportDTO};
