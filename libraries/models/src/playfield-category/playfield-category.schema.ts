import {z} from '@hono/zod-openapi';

const PlayfieldCategoryDTOSchema = z
	.object({
		id: z.string(),
		tenant: z.object({
			id: z.string(),
			name: z.string(),
		}),
		name: z.string(),
		description: z.string().max(500).optional(),
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
	.openapi('PlayfieldCategory');

const PlayfieldCategoryDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	name: z.string(),
	description: z.string().max(500).optional(),
	created_at: z.string(),
	updated_at: z.string(),
	playfields: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			serialNumber: z.string(),
		})
	),
});

const PlayfieldCategoryCreateDTOSchema = z.object({
	name: z.string(),
	description: z.string().max(500).optional(),
	tenantId: z.string(),
});

const PlayfieldCategoryUpdateDTOSchema = z.object({
	name: z.string(),
	description: z.string().max(500).optional(),
	tenantId: z.string(),
});

const PlayfieldCategoryInsertDBSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().max(500).optional(),
	tenant_id: z.string(),
});

const PlayfieldCategoryUpdateDBSchema = z.object({
	name: z.string(),
	description: z.string().max(500).optional(),
	tenant_id: z.string(),
	updated_at: z.string(),
});

type PlayfieldCategoryDTOType = z.infer<typeof PlayfieldCategoryDTOSchema>;
type PlayfieldCategoryDBType = z.infer<typeof PlayfieldCategoryDBSchema>;
type PlayfieldCategoryCreateDTOType = z.infer<
	typeof PlayfieldCategoryCreateDTOSchema
>;
type PlayfieldCategoryUpdateDTOType = z.infer<
	typeof PlayfieldCategoryUpdateDTOSchema
>;
type PlayfieldCategoryInsertDBType = z.infer<
	typeof PlayfieldCategoryInsertDBSchema
>;
type PlayfieldCategoryUpdateDBType = z.infer<
	typeof PlayfieldCategoryUpdateDBSchema
>;

export {
	PlayfieldCategoryDTOSchema,
	PlayfieldCategoryDBSchema,
	PlayfieldCategoryCreateDTOSchema,
	PlayfieldCategoryUpdateDTOSchema,
	PlayfieldCategoryInsertDBSchema,
	PlayfieldCategoryUpdateDBSchema,
};

export type {
	PlayfieldCategoryDTOType,
	PlayfieldCategoryDBType,
	PlayfieldCategoryCreateDTOType,
	PlayfieldCategoryUpdateDTOType,
	PlayfieldCategoryInsertDBType,
	PlayfieldCategoryUpdateDBType,
};
