import {z} from 'zod';

import {
	BaseStatsReportDTOSchema,
	GameSessionsOverTimeSchema,
	GameSessionsPerHourOfDaySchema,
	PaymentMethodsSchema,
	PopularPlayfieldsSchema,
	PopularPrizesSchema,
} from '../helpers';

const GameTypeStatsReportDTOSchema = BaseStatsReportDTOSchema.extend({
	gametypeId: z.string(),

	paymentMethods: PaymentMethodsSchema,

	gameSessionsOverTime: GameSessionsOverTimeSchema,

	gameSessionsPerHourOfDay: GameSessionsPerHourOfDaySchema,
	popularPrizes: PopularPrizesSchema,
	popularPlayfields: PopularPlayfieldsSchema,
});

type GameTypeStatsReportDTOType = z.infer<typeof GameTypeStatsReportDTOSchema>;

export {GameTypeStatsReportDTOSchema};

export type {GameTypeStatsReportDTOType};
