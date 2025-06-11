import {z} from '@hono/zod-openapi';

enum AppSecurityGroup {
	// User roles
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
		role: z.nativeEnum(AppSecurityGroup),
		locationIds: z.array(z.string()),
		isBlocked: z.boolean(),
		isActive: z.boolean(),
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
	role: z.nativeEnum(AppSecurityGroup),
	location_ids: z.string(),
	is_blocked: z.boolean(),
	is_active: z.boolean(),
	last_login: z.string().optional(),
	last_seen: z.string().optional(),
});

const AppUserCreateDTOSchema = z.object({
	email: z.string().email(),
	username: z.string(),
	tenantId: z.string(),
	securityGroup: z.nativeEnum(AppSecurityGroup),
	locationIds: z.array(z.string()).optional(),
});
// .refine(
// 	(data) => {
// 		const rolesWithoutLocations = [
// 			AppUserRole.ELAUT_ADMIN,
// 			AppUserRole.ELAUT_SERVICE,
// 			AppUserRole.ELAUT_DEVELOPER,
// 			AppUserRole.ELAUT_QC,
// 			AppUserRole.TENANT_ADMIN,
// 			AppUserRole.TENANT_GLOBAL_MANAGER,
// 			AppUserRole.DISTRIBUTOR,
// 		];
//
// 		if (!rolesWithoutLocations.includes(data.role)) {
// 			return data.locationIds.length > 0;
// 		}
//
// 		return true;
// 	},
// 	{
// 		message: 'Location IDs are required for the chosen user role',
// 	}
// );

const AppUserInsertDBSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	tenant_id: z.string(),
	username: z.string(),
	role: z.nativeEnum(AppSecurityGroup),
});

const AppUserUpdateDTOSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
	securityGroup: z.nativeEnum(AppSecurityGroup).optional(),
	isBlocked: z.boolean().optional(),
	locationIds: z.array(z.string()).optional(),
});

const AppUserUpdateDBSchema = z.object({
	email: z.string().email().optional(),
	username: z.string().optional(),
	role: z.nativeEnum(AppSecurityGroup).optional(),
	is_blocked: z.boolean().optional(),
	last_login: z.string().optional(),
	last_seen: z.string().optional(),
	is_active: z.boolean().optional(),
});

type AppUserDTOType = z.infer<typeof AppUserDTOSchema>;
type AppUserDBType = z.infer<typeof AppUserDBSchema>;
type AppUserCreateDTOType = z.infer<typeof AppUserCreateDTOSchema>;
type AppUserInsertDBType = z.infer<typeof AppUserInsertDBSchema>;
type AppUserUpdateDTOType = z.infer<typeof AppUserUpdateDTOSchema>;
type AppUserUpdateDBType = z.infer<typeof AppUserUpdateDBSchema>;

export {
	AppSecurityGroup,
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
