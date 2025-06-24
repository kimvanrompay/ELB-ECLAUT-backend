import {z} from '@hono/zod-openapi';

import {
	BaseStatsReportDTOSchema,
	GameSessionsOverTimeSchema,
	GameSessionsPerHourOfDaySchema,
	PaymentMethodsSchema,
	PopularGametypeSchema,
	PopularPlayfieldCategoriesSchema,
	PopularPlayfieldsSchema,
	PopularPrizesSchema,
} from '../helpers';

const TenantLocationStatsReportDTOSchema = BaseStatsReportDTOSchema.extend({
	tenantId: z.string(),
	tenantLocationId: z.string(),

	paymentMethods: PaymentMethodsSchema,

	gameSessionsOverTime: GameSessionsOverTimeSchema,

	gameSessionsPerHourOfDay: GameSessionsPerHourOfDaySchema,

	popularPrizes: PopularPrizesSchema,

	popularPlayfields: PopularPlayfieldsSchema,

	popularGametypes: PopularGametypeSchema,

	popularPlayfieldCategories: PopularPlayfieldCategoriesSchema,
});

type TenantLocationStatsReportDTOType = z.infer<
	typeof TenantLocationStatsReportDTOSchema
>;

export {TenantLocationStatsReportDTOSchema};
export type {TenantLocationStatsReportDTOType};
