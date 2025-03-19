import {z} from '@hono/zod-openapi';

const TenantLocationDTOSchema = z
	.object({
		id: z.string(),
		tenant: z.object({
			id: z.string(),
			name: z.string(),
		}),
		name: z.string(),
		address: z.string().optional(),
		city: z.string().optional(),
		state: z.string().optional(),
		zip: z.string().optional(),
		country: z.string().optional(),
		phone: z.string().optional(),
		email: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		isActive: z.boolean(),
	})
	.openapi('TenantLocation');

const TenantLocationDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional().nullable(),
	email: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
	is_active: z.boolean(),
});

const TenantLocationCreateDTOSchema = z.object({
	tenantId: z.string(),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string(),
});

const TenantLocationInsertDBSchema = z.object({
	id: z.string(),
	tenant_id: z.string(),
	name: z.string(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string(),
});

const TenantLocationUpdateDTOSchema = z.object({
	name: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
});

const TenantLocationUpdateDBSchema = z.object({
	name: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
});

type TenantLocationDTOType = z.infer<typeof TenantLocationDTOSchema>;
type TenantLocationCreateDTOType = z.infer<
	typeof TenantLocationCreateDTOSchema
>;
type TenantLocationUpdateDTOType = z.infer<
	typeof TenantLocationUpdateDTOSchema
>;
type TenantLocationDBType = z.infer<typeof TenantLocationDBSchema>;
type TenantLocationInsertDBType = z.infer<typeof TenantLocationInsertDBSchema>;
type TenantLocationUpdateDBType = z.infer<typeof TenantLocationUpdateDTOSchema>;

export {
	TenantLocationDTOSchema,
	TenantLocationDBSchema,
	TenantLocationCreateDTOSchema,
	TenantLocationInsertDBSchema,
	TenantLocationUpdateDTOSchema,
	TenantLocationUpdateDBSchema,
};

export type {
	TenantLocationDTOType,
	TenantLocationCreateDTOType,
	TenantLocationUpdateDTOType,
	TenantLocationDBType,
	TenantLocationInsertDBType,
	TenantLocationUpdateDBType,
};
