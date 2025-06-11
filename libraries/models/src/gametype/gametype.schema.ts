import {z} from '@hono/zod-openapi';

const GametypeDTOSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		description: z.string().optional(),
		createdAt: z.date(),
		// amountOfMachinesCreated: z.number(),
		// amountOfMachinesRegistered: z.number(),
		// hasCabinetSettings: z.boolean(),
		// hasPlayfieldSettings: z.boolean(),
	})
	.openapi('Gametype');

const GametypeDBSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	created_at: z.date(),
});

const GametypeCreateDTOSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
});

const GametypeInsertDBSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
});

const GametypeUpdateDTOSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
});

const GametypeUpdateDBSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
});

type GametypeDTOType = z.infer<typeof GametypeDTOSchema>;
type GametypeCreateDTOType = z.infer<typeof GametypeCreateDTOSchema>;
type GametypeUpdateDTOType = z.infer<typeof GametypeUpdateDTOSchema>;
type GametypeDBType = z.infer<typeof GametypeDBSchema>;
type GametypeInsertDBType = z.infer<typeof GametypeInsertDBSchema>;
type GametypeUpdateDBType = z.infer<typeof GametypeUpdateDBSchema>;

export {
	GametypeDTOSchema,
	GametypeDBSchema,
	GametypeCreateDTOSchema,
	GametypeInsertDBSchema,
	GametypeUpdateDTOSchema,
	GametypeUpdateDBSchema,
};

export type {
	GametypeDTOType,
	GametypeCreateDTOType,
	GametypeUpdateDTOType,
	GametypeDBType,
	GametypeInsertDBType,
	GametypeUpdateDBType,
};
