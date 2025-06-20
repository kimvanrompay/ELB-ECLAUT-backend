import {z} from '@hono/zod-openapi';

import {StatisticsDataSchema} from '../playfield-stats/playfield-stats.schema';

const PlayfieldStatsReportDBSchema = z.object({
	range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	unit: z.enum(['HOUR', 'DAY']),
	start_date: z.date(),
	end_date: z.date(),
	serial_number: z.string(),
	playfield_id: z.string(),
	gametype_id: z.string(),
	tenant_id: z.string(),
	tenant_location_id: z.string(),

	data: z.array(z.any()).optional(),
});

const PlayfieldStatsReportDTOSchema = z.object({
	range: z.enum(['WEEK', 'MONTH', 'YEAR', 'DAY']),
	unit: z.enum(['HOUR', 'DAY']),
	startDate: z.date(),
	endDate: z.date(),
	serialNumber: z.string(),
	playfieldId: z.string(),
	gametypeId: z.string(),
	tenantId: z.string(),
	tenantLocationId: z.string(),

	aggregatedData: StatisticsDataSchema.optional(),

	data: z
		.array(
			StatisticsDataSchema.extend({
				date: z.date(),
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
