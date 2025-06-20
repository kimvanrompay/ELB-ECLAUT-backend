import {z} from '@hono/zod-openapi';

const tenantDTOSchema = z
	.object({
		id: z.string(),
		name: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	})
	.openapi('Tenant');

const tenantDBSchema = z.object({
	id: z.string(),
	name: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
});

const tenantCreateDTOSchema = z.object({
	name: z.string(),
});

const tenantInsertDBSchema = z.object({
	id: z.string(),
	name: z.string(),
});

const tenantUpdateDTOSchema = z.object({
	name: z.string().optional(),
});

const tenantUpdateDBSchema = z.object({
	name: z.string().optional(),
});

type TenantDTOType = z.infer<typeof tenantDTOSchema>;
type TenantCreateDTOType = z.infer<typeof tenantCreateDTOSchema>;
type TenantUpdateDTOType = z.infer<typeof tenantUpdateDTOSchema>;
type TenantDBType = z.infer<typeof tenantDBSchema>;
type TenantInsertDBType = z.infer<typeof tenantInsertDBSchema>;
type TenantUpdateDBType = z.infer<typeof tenantUpdateDTOSchema>;

export {
	tenantDTOSchema,
	tenantDBSchema,
	tenantCreateDTOSchema,
	tenantInsertDBSchema,
	tenantUpdateDTOSchema,
	tenantUpdateDBSchema,
};

export type {
	TenantDTOType,
	TenantCreateDTOType,
	TenantUpdateDTOType,
	TenantDBType,
	TenantInsertDBType,
	TenantUpdateDBType,
};
