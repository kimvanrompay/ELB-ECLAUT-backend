import {z} from '@hono/zod-openapi';

const ClientDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	securityGroup: z.string(),
	tenantId: z.string().optional(),
	locationsIds: z.array(z.string()).optional(),
	description: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	isActive: z.boolean(),
	isBlocked: z.boolean(),
	lastLoginAt: z.coerce.date().optional(),
});

const ClientDBSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	secret_key: z.string(),
	security_group: z.string(),
	created_at: z.date(),
	updated_at: z.date(),
	tenant_id: z.string().optional(),
	locations_ids: z.array(z.string()).optional(),
	is_active: z.boolean(),
	is_blocked: z.boolean(),
	last_login: z.date().optional(),
});

const ClientUpdateDBSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	security_group: z.string().optional(),
	tenant_id: z.string().optional(),
	locations_ids: z.array(z.string()).optional(),
	is_active: z.boolean().optional(),
	is_blocked: z.boolean().optional(),
	last_login: z.date().optional(),
});

type ClientDTOType = z.infer<typeof ClientDTOSchema>;
type ClientDBType = z.infer<typeof ClientDBSchema>;
type ClientUpdateDBType = z.infer<typeof ClientUpdateDBSchema>;

export {ClientDTOSchema, ClientDBSchema, ClientUpdateDBSchema};
export type {ClientDTOType, ClientDBType, ClientUpdateDBType};
