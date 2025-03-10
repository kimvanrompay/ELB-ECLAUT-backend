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
		id: z.string(),
		email: z.string().email(),
		username: z.string(),
		tenant: z.object({
			id: z.string(),
			name: z.string(),
		}),
		role: z.nativeEnum(AppUserRole),
		locationIds: z.array(z.string()),
		isBlocked: z.boolean(),
		lastLogin: z.string().optional(),
		lastSeen: z.string().optional(),
	})
	.openapi('User');

const AppUserDBSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	tenant_id: z.string(),
	tenant_name: z.string(),
	username: z.string(),
	role: z.nativeEnum(AppUserRole),
	location_ids: z.string(),
	is_blocked: z.boolean(),
	last_login: z.string().optional(),
	last_seen: z.string().optional(),
});

const AppUserCreateDTOSchema = z
	.object({
		email: z.string().email(),
		username: z.string(),
		tenantId: z.string(),
		role: z.nativeEnum(AppUserRole),
		locationIds: z.array(z.string()),
	})
	.refine(
		(data) => {
			const rolesWithoutLocations = [
				AppUserRole.ELAUT_ADMIN,
				AppUserRole.ELAUT_SERVICE,
				AppUserRole.ELAUT_DEVELOPER,
				AppUserRole.ELAUT_QC,
				AppUserRole.TENANT_ADMIN,
				AppUserRole.TENANT_GLOBAL_MANAGER,
				AppUserRole.DISTRIBUTOR,
			];

			if (!rolesWithoutLocations.includes(data.role)) {
				return data.locationIds.length > 0;
			}

			return true;
		},
		{
			message: 'Location IDs are required for the chosen user role',
		}
	);

const AppUserInsertDBSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	tenant_id: z.string(),
	username: z.string(),
	role: z.nativeEnum(AppUserRole),
});

const AppUserUpdateDTOSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
	role: z.nativeEnum(AppUserRole).optional(),
	isBlocked: z.boolean().optional(),
	locationIds: z.array(z.string()).optional(),
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
