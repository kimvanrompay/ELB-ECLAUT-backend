import {AppUser, AppUserRole} from '@lib/models/app-user';

enum AppSecurityScopes {
	READ_USERS = 'read:users',
	CREATE_USERS = 'create:users',
	UPDATE_USERS = 'update:users',
	DELETE_USERS = 'delete:users',
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
			return !isElautRole || userRole === AppUserRole.ELAUT_SERVICE;
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
				userRole !== AppUserRole.TENANT_ADMIN
			);
		}

		if (loggedInUserRole === AppUserRole.TENANT_ARCADE_MANAGER) {
			return (
				!isElautRole &&
				!isDistributorRole &&
				userRole !== AppUserRole.TENANT_ADMIN &&
				userRole !== AppUserRole.TENANT_GLOBAL_MANAGER
			);
		}

		return false;
	}
}

export {AuthorizationService, AppSecurityScopes};
