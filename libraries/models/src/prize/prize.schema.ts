import {z} from '@hono/zod-openapi';

const PrizeDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	description: z.string().optional(),
	name: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
	playfields: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			serialNumber: z.string(),
		})
	),
});

const PrizeDTOSchema = z
	.object({
		id: z.string(),
		tenant: z.object({
			id: z.string(),
			name: z.string(),
		}),
		name: z.string(),
		description: z.string().optional(),
		createdAt: z.date(),
		updatedAt: z.date(),
		playfields: z.array(
			z.object({
				id: z.string(),
				name: z.string(),
				serialNumber: z.string(),
			})
		),
	})
	.openapi('Prize');

const PrizePlayfieldDBSchema = z.object({
	id: z.string(),
	prize_id: z.string(),
	playfield_id: z.string(),
	added_at: z.date(),
	removed_at: z.date().optional(),
});

const PrizeInsertDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	name: z.string(),
	description: z.string().optional(),
});

const PrizeUpdateDBSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

const PrizePlayfieldInsertDBSchema = z.object({
	id: z.string(),
	prize_id: z.string(),
	playfield_id: z.string(),
});

const PrizePlayfieldUpdateDBSchema = z.object({
	id: z.string(),
	prize_id: z.string(),
	playfield_id: z.string(),
});

const PrizeCreateDTOSchema = z.object({
	name: z.string(),
	tenantId: z.string(),
	description: z.string().optional(),
});

const PrizeUpdateDTOSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

type PrizeDBType = z.infer<typeof PrizeDBSchema>;
type PrizeDTOType = z.infer<typeof PrizeDTOSchema>;
type PrizePlayfieldDBType = z.infer<typeof PrizePlayfieldDBSchema>;
type PrizeInsertDBType = z.infer<typeof PrizeInsertDBSchema>;
type PrizeUpdateDBType = z.infer<typeof PrizeUpdateDBSchema>;
type PrizePlayfieldInsertDBType = z.infer<typeof PrizePlayfieldInsertDBSchema>;
type PrizePlayfieldUpdateDBType = z.infer<typeof PrizePlayfieldUpdateDBSchema>;
type PrizeCreateDTOType = z.infer<typeof PrizeCreateDTOSchema>;
type PrizeUpdateDTOType = z.infer<typeof PrizeUpdateDTOSchema>;

export {
	PrizeDBSchema,
	PrizeDTOSchema,
	PrizePlayfieldDBSchema,
	PrizeInsertDBSchema,
	PrizeUpdateDBSchema,
	PrizePlayfieldInsertDBSchema,
	PrizePlayfieldUpdateDBSchema,
	PrizeCreateDTOSchema,
	PrizeUpdateDTOSchema,
};
export type {
	PrizeDBType,
	PrizeDTOType,
	PrizePlayfieldDBType,
	PrizeInsertDBType,
	PrizeUpdateDBType,
	PrizePlayfieldInsertDBType,
	PrizePlayfieldUpdateDBType,
	PrizeCreateDTOType,
	PrizeUpdateDTOType,
};
