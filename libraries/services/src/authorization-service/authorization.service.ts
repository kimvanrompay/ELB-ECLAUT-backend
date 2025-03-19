import {AppUser, AppUserRole} from '@lib/models/app-user';

enum AppSecurityScopes {
	READ_USERS = 'read:users',
	CREATE_USERS = 'create:users',
	UPDATE_USERS = 'update:users',
	DELETE_USERS = 'delete:users',

	READ_TENANT_LOCATIONS = 'read:tenant-locations',
	CREATE_TENANT_LOCATIONS = 'create:tenant-locations',
	UPDATE_TENANT_LOCATIONS = 'update:tenant-locations',
	DELETE_TENANT_LOCATIONS = 'delete:tenant-locations',

	READ_MACHINES = 'read:machines',
	CREATE_MACHINES = 'create:machines',
	UPDATE_MACHINES = 'update:machines',
	DELETE_MACHINES = 'delete:machines',

	READ_GAME_TYPES = 'read:game-types',
	CREATE_GAME_TYPES = 'create:game-types',
	UPDATE_GAME_TYPES = 'update:game-types',
	DELETE_GAME_TYPES = 'delete:game-types',

	READ_GAMESESSIONS = 'read:gamesessions',
	CREATE_GAMESESSIONS = 'create:gamesessions',
	UPDATE_GAMESESSIONS = 'update:gamesessions',
	DELETE_GAMESESSIONS = 'delete:gamesessions',
}

const AppRoleToSecurityClaims: Record<AppUserRole, AppSecurityScopes[]> = {
	[AppUserRole.ELAUT_ADMIN]: [...Object.values(AppSecurityScopes)],
	[AppUserRole.ELAUT_SERVICE]: [AppSecurityScopes.READ_USERS],
	[AppUserRole.ELAUT_DEVELOPER]: [...Object.values(AppSecurityScopes)],
	[AppUserRole.ELAUT_QC]: [AppSecurityScopes.READ_USERS],
	[AppUserRole.DISTRIBUTOR]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
	],
	[AppUserRole.TENANT_ADMIN]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
	],
	[AppUserRole.TENANT_GLOBAL_MANAGER]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
	],
	[AppUserRole.TENANT_ARCADE_MANAGER]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
	],
	[AppUserRole.TENANT_ARCADE_TECHNICIAN]: [],
	[AppUserRole.TENANT_ARCADE_EMPLOYEE]: [],
};

class AuthorizationService {
	static hasAccessToScope(
		roleOrUser: AppUserRole | AppUser,
		claim: AppSecurityScopes
	): boolean {
		if (roleOrUser instanceof AppUser) {
			return AppRoleToSecurityClaims[roleOrUser.role].includes(claim);
		}

		return AppRoleToSecurityClaims[roleOrUser].includes(claim);
	}

	static hasAccessToScopes(
		roleOrUser: AppUserRole | AppUser,
		claims: AppSecurityScopes[]
	): boolean {
		return claims.every((claim) => this.hasAccessToScope(roleOrUser, claim));
	}

	static hasAccessToSomeScope(
		roleOrUser: AppUserRole | AppUser,
		claims: AppSecurityScopes[]
	): boolean {
		return claims.some((claim) => this.hasAccessToScope(roleOrUser, claim));
	}

	static isTenantBound(role: AppUserRole): boolean {
		// Warning: write this in negative form to avoid accidentally not updating this function
		return ![
			AppUserRole.ELAUT_ADMIN,
			AppUserRole.ELAUT_SERVICE,
			AppUserRole.ELAUT_DEVELOPER,
			// AppUserRole.ELAUT_QC,
		].includes(role);
	}

	static isLocationBound(role: AppUserRole): boolean {
		// Warning: write this in negative form to avoid accidentally not updating this function
		return ![
			AppUserRole.ELAUT_ADMIN,
			AppUserRole.ELAUT_SERVICE,
			AppUserRole.ELAUT_DEVELOPER,
			// AppUserRole.ELAUT_QC,
			AppUserRole.DISTRIBUTOR,
			AppUserRole.TENANT_GLOBAL_MANAGER,
			AppUserRole.TENANT_ADMIN,
		].includes(role);
	}

	static isAllowedToEditUserRole(
		loggedInUserRole: AppUserRole,
		userRole: AppUserRole
	): boolean {
		const isElautRole = userRole.startsWith('ELAUT');
		const isDistributorRole = userRole === AppUserRole.DISTRIBUTOR;

		if (
			loggedInUserRole === AppUserRole.ELAUT_ADMIN ||
			loggedInUserRole === AppUserRole.ELAUT_DEVELOPER
		) {
			return true;
		}

		if (loggedInUserRole === AppUserRole.ELAUT_SERVICE) {
			return !isElautRole;
		}

		if (loggedInUserRole === AppUserRole.DISTRIBUTOR) {
			return !isElautRole;
		}

		if (loggedInUserRole === AppUserRole.TENANT_ADMIN) {
			return !isElautRole && !isDistributorRole;
		}

		if (loggedInUserRole === AppUserRole.TENANT_GLOBAL_MANAGER) {
			return (
				!isElautRole &&
				!isDistributorRole &&
				![AppUserRole.TENANT_ADMIN, AppUserRole.TENANT_GLOBAL_MANAGER].includes(
					userRole
				)
			);
		}

		if (loggedInUserRole === AppUserRole.TENANT_ARCADE_MANAGER) {
			return (
				!isElautRole &&
				!isDistributorRole &&
				![
					AppUserRole.TENANT_ADMIN,
					AppUserRole.TENANT_GLOBAL_MANAGER,
					AppUserRole.TENANT_ARCADE_MANAGER,
				].includes(userRole)
			);
		}

		return false;
	}

	// TODO: distributors will have a list of tenants they can access
	static isAllowedToAccessTenant(
		loggedInUser: {
			role: AppUserRole;
			tenantId: string | undefined;
		},
		tenantId: string
	) {
		if (this.isTenantBound(loggedInUser.role)) {
			return loggedInUser.tenantId === tenantId;
		}

		return true;
	}

	static isAllowedToAccessLocation(
		loggedInUser: {
			role: AppUserRole;
			locationIds: string[];
		},
		locationId: string
	) {
		if (this.isLocationBound(loggedInUser.role)) {
			return loggedInUser.locationIds.includes(locationId);
		}

		return true;
	}

	static isAllowedToAccessLocations(
		loggedInUser: {
			role: AppUserRole;
			locationIds: string[];
		},
		locations: string[]
	) {
		if (this.isLocationBound(loggedInUser.role)) {
			return locations.every((location) =>
				loggedInUser.locationIds.includes(location)
			);
		}

		return true;
	}
}

export {AuthorizationService, AppSecurityScopes};
