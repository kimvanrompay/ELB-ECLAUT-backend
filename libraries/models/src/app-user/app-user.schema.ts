import {z} from '@hono/zod-openapi';

enum AppUserRole {
	ELAUT_ADMIN = 'ELAUT_ADMIN',
	ELAUT_SERVICE = 'ELAUT_SERVICE',
	ELAUT_DEVELOPER = 'ELAUT_DEVELOPER',
	ELAUT_QC = 'ELAUT_QC',

	DISTRIBUTOR = 'DISTRIBUTOR',

	TENANT_ADMIN = 'TENANT_ADMIN',
	TENANT_GLOBAL_MANAGER = 'TENANT_GLOBAL_MANAGER',
	TENANT_ARCADE_MANAGER = 'TENANT_ARCADE_MANAGER',
	TENANT_ARCADE_TECHNICIAN = 'TENANT_ARCADE_TECHNICIAN',
	TENANT_ARCADE_EMPLOYEE = 'TENANT_ARCADE_EMPLOYEE',
}

const AppUserDTOSchema = z
	.object({
		id: z.string().uuid(),
		email: z.string().email(),
		username: z.string().uuid(),
		tenant: z.object({
			id: z.string().uuid(),
			name: z.string().uuid(),
		}),
		role: z.nativeEnum(AppUserRole),
		isBlocked: z.boolean(),
		lastLogin: z.string().optional(),
		lastSeen: z.string().optional(),
	})
	.openapi('User');

const AppUserDBSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	username: z.string(),
	role: z.nativeEnum(AppUserRole),
	is_blocked: z.boolean(),
	last_login: z.string().optional(),
	last_seen: z.string().optional(),
});

const AppUserCreateDTOSchema = z.object({
	email: z.string().email(),
	username: z.string(),
	tenantId: z.string().uuid(),
	role: z.nativeEnum(AppUserRole),
});

const AppUserInsertDBSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	tenant_id: z.string().uuid(),
	username: z.string(),
	role: z.nativeEnum(AppUserRole),
});

const AppUserUpdateDTOSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
	role: z.nativeEnum(AppUserRole).optional(),
	isBlocked: z.boolean().optional(),
});

const AppUserUpdateDBSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
	role: z.nativeEnum(AppUserRole).optional(),
	is_blocked: z.boolean().optional(),
	last_login: z.string().optional(),
	last_seen: z.string().optional(),
});

type AppUserDTOType = z.infer<typeof AppUserDTOSchema>;
type AppUserDBType = z.infer<typeof AppUserDBSchema>;
type AppUserCreateDTOType = z.infer<typeof AppUserCreateDTOSchema>;
type AppUserInsertDBType = z.infer<typeof AppUserInsertDBSchema>;
type AppUserUpdateDTOType = z.infer<typeof AppUserUpdateDTOSchema>;
type AppUserUpdateDBType = z.infer<typeof AppUserUpdateDBSchema>;

export {
	AppUserRole,
	AppUserDTOSchema,
	AppUserDBSchema,
	AppUserCreateDTOSchema,
	AppUserInsertDBSchema,
	AppUserUpdateDTOSchema,
	AppUserUpdateDBSchema,
};

export type {
	AppUserDTOType,
	AppUserDBType,
	AppUserCreateDTOType,
	AppUserInsertDBType,
	AppUserUpdateDTOType,
	AppUserUpdateDBType,
};
