import {z} from '@hono/zod-openapi';

import {PlayfieldPrizeDTOSchema} from '../../playfield-prize/playfield-prize.schema';
import {
	BaseStatsReportDTOSchema,
	GameSessionsOverTimeSchema,
	GameSessionsPerHourOfDaySchema,
	PaymentMethodsSchema,
	PopularPrizesSchema,
} from '../helpers';

const PlayfieldStatsReportDBSchema = z.object({
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

const PlayfieldStatsReportDTOSchema = BaseStatsReportDTOSchema.extend({
	playfieldId: z.string(),
	prizeId: z.string().optional(),

	gameSessionsOverTime: GameSessionsOverTimeSchema,
	gameSessionsPerHourOfDay: GameSessionsPerHourOfDaySchema,
	popularPrizes: PopularPrizesSchema,
	prizeHistory: z.array(PlayfieldPrizeDTOSchema),
	paymentMethods: PaymentMethodsSchema,
});

type PlayfieldStatsReportDBType = z.infer<typeof PlayfieldStatsReportDBSchema>;

type PlayfieldStatsReportDTOType = z.infer<
	typeof PlayfieldStatsReportDTOSchema
>;

export {PlayfieldStatsReportDBSchema, PlayfieldStatsReportDTOSchema};

export type {PlayfieldStatsReportDBType, PlayfieldStatsReportDTOType};
