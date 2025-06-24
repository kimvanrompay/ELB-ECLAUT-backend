import {AppSecurityGroup, AppUser} from '@lib/models/app-user';
import {Client} from '@lib/models/client';

import {type AuthenticatedAppContext} from '../types';

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
	INITIALIZE_GAMESESSIONS = 'initialize:gamesessions',

	READ_TENANTS = 'read:tenants',
	CREATE_TENANTS = 'create:tenants',
	UPDATE_TENANTS = 'update:tenants',
	DELETE_TENANTS = 'delete:tenants',

	READ_PRIZES = 'read:prizes',
	CREATE_PRIZES = 'create:prizes',
	UPDATE_PRIZES = 'update:prizes',
	DELETE_PRIZES = 'delete:prizes',

	READ_PLAYFIELD_CATEGORIES = 'read:playfield-categories',
	CREATE_PLAYFIELD_CATEGORIES = 'create:playfield-categories',
	UPDATE_PLAYFIELD_CATEGORIES = 'update:playfield-categories',
	DELETE_PLAYFIELD_CATEGORIES = 'delete:playfield-categories',

	READ_PLAYERZONE_PROFILES = 'read:playerzone-profiles',
	READ_PLAYERZONE_LEADERBOARDS = 'read:playerzone-leaderboards',
}

const AppSecurityGroupToSecurityClaims: Record<
	AppSecurityGroup,
	AppSecurityScopes[]
> = {
	[AppSecurityGroup.ELAUT_ADMIN]: [...Object.values(AppSecurityScopes)],
	[AppSecurityGroup.ELAUT_SERVICE]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.READ_TENANT_LOCATIONS,
		AppSecurityScopes.READ_MACHINES,
		AppSecurityScopes.READ_TENANTS,
	],
	[AppSecurityGroup.ELAUT_DEVELOPER]: [...Object.values(AppSecurityScopes)],
	[AppSecurityGroup.ELAUT_QC]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.READ_MACHINES,
	],
	[AppSecurityGroup.DISTRIBUTOR]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
		AppSecurityScopes.READ_TENANTS,
		AppSecurityScopes.READ_MACHINES,
	],
	[AppSecurityGroup.TENANT_ADMIN]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
		AppSecurityScopes.READ_TENANTS,
		AppSecurityScopes.READ_MACHINES,
	],
	[AppSecurityGroup.TENANT_GLOBAL_MANAGER]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
		AppSecurityScopes.READ_TENANTS,
		AppSecurityScopes.READ_MACHINES,
	],
	[AppSecurityGroup.TENANT_ARCADE_MANAGER]: [
		AppSecurityScopes.READ_USERS,
		AppSecurityScopes.CREATE_USERS,
		AppSecurityScopes.UPDATE_USERS,
		AppSecurityScopes.DELETE_USERS,
		AppSecurityScopes.READ_TENANTS,
		AppSecurityScopes.READ_MACHINES,
	],
	[AppSecurityGroup.TENANT_ARCADE_TECHNICIAN]: [
		AppSecurityScopes.READ_TENANTS,
		AppSecurityScopes.READ_MACHINES,
	],
	[AppSecurityGroup.TENANT_ARCADE_EMPLOYEE]: [
		AppSecurityScopes.READ_TENANTS,
		AppSecurityScopes.READ_MACHINES,
	],

	// Client security groups
	[AppSecurityGroup.MACHINE]: [
		AppSecurityScopes.READ_MACHINES,
		AppSecurityScopes.READ_GAMESESSIONS,
		AppSecurityScopes.CREATE_GAMESESSIONS,
		AppSecurityScopes.READ_TENANT_LOCATIONS,
	],
	[AppSecurityGroup.INITIALIZE_GAMESESSION]: [
		AppSecurityScopes.INITIALIZE_GAMESESSIONS,
	],
};

class AuthorizationService {
	static hasAccessToScope(
		securityGroupOrUserOrClient: AppSecurityGroup | AppUser | Client,
		claim: AppSecurityScopes
	): boolean {
		if (
			securityGroupOrUserOrClient instanceof Client ||
			securityGroupOrUserOrClient instanceof AppUser
		) {
			return AppSecurityGroupToSecurityClaims[
				securityGroupOrUserOrClient.securityGroup
			].includes(claim);
		}

		const doesGroupExist = Object.values(AppSecurityGroup).includes(
			securityGroupOrUserOrClient as AppSecurityGroup
		);

		if (doesGroupExist) {
			return AppSecurityGroupToSecurityClaims[
				securityGroupOrUserOrClient as AppSecurityGroup
			].includes(claim);
		}

		return false;
	}

	static hasAccessToScopes(
		roleOrUser: AppUser | AppSecurityGroup | Client,
		claims: AppSecurityScopes[]
	): boolean {
		return claims.every((claim) => this.hasAccessToScope(roleOrUser, claim));
	}

	static hasAccessToSomeScope(
		roleOrUser: AppUser | AppSecurityGroup | Client,
		claims: AppSecurityScopes[]
	): boolean {
		return claims.some((claim) => this.hasAccessToScope(roleOrUser, claim));
	}

	static isTenantBound(securityGroup: AppSecurityGroup): boolean {
		// Warning: write this in negative form to avoid accidentally not updating this function
		return ![
			AppSecurityGroup.ELAUT_ADMIN,
			AppSecurityGroup.ELAUT_SERVICE,
			AppSecurityGroup.ELAUT_DEVELOPER,
			// AppSecurityGroup.ELAUT_QC,

			// Client security groups
			AppSecurityGroup.INITIALIZE_GAMESESSION,
		].includes(securityGroup);
	}

	static isLocationBound(securityGroup: AppSecurityGroup): boolean {
		// Warning: write this in negative form to avoid accidentally not updating this function
		return ![
			AppSecurityGroup.ELAUT_ADMIN,
			AppSecurityGroup.ELAUT_SERVICE,
			AppSecurityGroup.ELAUT_DEVELOPER,
			// AppSecurityGroup.ELAUT_QC,
			AppSecurityGroup.DISTRIBUTOR,
			AppSecurityGroup.TENANT_GLOBAL_MANAGER,
			AppSecurityGroup.TENANT_ADMIN,

			// Client security groups
			AppSecurityGroup.INITIALIZE_GAMESESSION,
		].includes(securityGroup);
	}

	static isAllowedToEditUserRole(
		loggedInUserRole: AppSecurityGroup,
		userRole: AppSecurityGroup
	): boolean {
		const isElautRole = userRole.startsWith('ELAUT');
		const isDistributorRole = userRole === AppSecurityGroup.DISTRIBUTOR;

		if (
			loggedInUserRole === AppSecurityGroup.ELAUT_ADMIN ||
			loggedInUserRole === AppSecurityGroup.ELAUT_DEVELOPER
		) {
			return true;
		}

		if (loggedInUserRole === AppSecurityGroup.ELAUT_SERVICE) {
			return !isElautRole;
		}

		if (loggedInUserRole === AppSecurityGroup.DISTRIBUTOR) {
			return !isElautRole;
		}

		if (loggedInUserRole === AppSecurityGroup.TENANT_ADMIN) {
			return !isElautRole && !isDistributorRole;
		}

		if (loggedInUserRole === AppSecurityGroup.TENANT_GLOBAL_MANAGER) {
			return (
				!isElautRole &&
				!isDistributorRole &&
				![
					AppSecurityGroup.TENANT_ADMIN,
					AppSecurityGroup.TENANT_GLOBAL_MANAGER,
				].includes(userRole)
			);
		}

		if (loggedInUserRole === AppSecurityGroup.TENANT_ARCADE_MANAGER) {
			return (
				!isElautRole &&
				!isDistributorRole &&
				![
					AppSecurityGroup.TENANT_ADMIN,
					AppSecurityGroup.TENANT_GLOBAL_MANAGER,
					AppSecurityGroup.TENANT_ARCADE_MANAGER,
				].includes(userRole)
			);
		}

		return false;
	}

	// TODO: distributors will have a list of tenants they can access
	static isAllowedToAccessTenant(
		loggedInUser: {
			securityGroup: AppSecurityGroup;
			tenantId: string | undefined;
		},
		tenantId: string
	) {
		if (this.isTenantBound(loggedInUser.securityGroup)) {
			return loggedInUser.tenantId === tenantId;
		}

		return true;
	}

	static isAllowedToAccessLocation(
		loggedInUser: {
			securityGroup: AppSecurityGroup;
			locationIds: string[];
		},
		locationId: string
	) {
		if (this.isLocationBound(loggedInUser.securityGroup)) {
			return loggedInUser.locationIds.includes(locationId);
		}

		return true;
	}

	static isAllowedToAccessLocations(
		loggedInUser: {
			securityGroup: AppSecurityGroup;
			locationIds: string[];
		},
		locations: string[]
	) {
		if (this.isLocationBound(loggedInUser.securityGroup)) {
			return locations.every((location) =>
				loggedInUser.locationIds.includes(location)
			);
		}

		return true;
	}

	static getTenantAndLocationFromContext(context: AuthenticatedAppContext) {
		const auth = context.auth;

		if (!auth) {
			return [undefined, undefined] as const;
		}

		return [
			AuthorizationService.isTenantBound(auth.securityGroup)
				? auth.tenantId
				: undefined,
			AuthorizationService.isLocationBound(auth.securityGroup)
				? auth.locationIds
				: undefined,
		] as const;
	}
}

export {AuthorizationService, AppSecurityScopes};
