import {mapArrayOrSingleItem} from '@lib/utils';

import {
	AppUserCreateDTOSchema,
	type AppUserCreateDTOType,
	AppUserDBSchema,
	type AppUserDBType,
	AppUserDTOSchema,
	type AppUserDTOType,
	AppUserInsertDBSchema,
	type AppUserInsertDBType,
	AppUserRole,
	AppUserUpdateDBSchema,
	type AppUserUpdateDBType,
	AppUserUpdateDTOSchema,
	type AppUserUpdateDTOType,
} from './app-user.schema';

class AppUser {
	id: string;
	email: string;
	username: string;
	tenant: {
		id: string;
		name: string;
	};
	locationIds: string[];
	role: AppUserRole;
	isBlocked: boolean;
	lastLogin: Date | undefined;
	lastSeen: Date | undefined;

	static schema = {
		AppUserDTOSchema,
		AppUserDBSchema,
		AppUserCreateDTOSchema,
		AppUserInsertDBSchema,
		AppUserUpdateDTOSchema,
		AppUserUpdateDBSchema,
	};

	public constructor(
		id: string,
		email: string,
		username: string,
		tenant: {
			id: string;
			name: string;
		},
		role: AppUserRole,
		locationIds: string[] = [],
		isBlocked = false,
		lastSeen: Date | undefined = undefined,
		lastLogin: Date | undefined = undefined
	) {
		this.id = id;
		this.email = email;
		this.tenant = tenant;
		this.role = role;
		this.locationIds = locationIds;
		this.username = username;
		this.isBlocked = isBlocked;
		this.lastSeen = lastSeen;
		this.lastLogin = lastLogin;
	}

	toJSON(): AppUserDTOType {
		return {
			id: this.id,
			email: this.email,
			username: this.username,
			tenant: this.tenant,
			role: this.role,
			locationIds: this.locationIds,
			isBlocked: this.isBlocked,
			lastLogin: this.lastLogin?.toISOString(),
			lastSeen: this.lastSeen?.toISOString(),
		};
	}

	toDBType(): AppUserDBType {
		return {
			id: this.id,
			email: this.email,
			tenant_id: this.tenant.id,
			tenant_name: this.tenant.name,
			username: this.username,
			role: this.role,
			is_blocked: this.isBlocked,
			last_login: this.lastLogin?.toISOString(),
			last_seen: this.lastSeen?.toISOString(),
			location_ids: JSON.stringify(this.locationIds),
		};
	}

	static fromJSON(data: AppUserDTOType): AppUser;
	static fromJSON(data: AppUserDTOType[]): AppUser[];
	static fromJSON(
		data: AppUserDTOType | AppUserDTOType[]
	): AppUser | AppUser[] {
		return mapArrayOrSingleItem(data, (item) => {
			const {
				id,
				email,
				username,
				tenant,
				role,
				isBlocked,
				lastSeen,
				lastLogin,
				locationIds,
			} = item;
			return new AppUser(
				id,
				email,
				username,
				tenant,
				role,
				locationIds,
				isBlocked,
				lastSeen ? new Date(lastSeen) : undefined,
				lastLogin ? new Date(lastLogin) : undefined
			);
		});
	}

	static fromDB(data: AppUserDBType): AppUser;
	static fromDB(data: AppUserDBType[]): AppUser[];
	static fromDB(data: AppUserDBType | AppUserDBType[]): AppUser | AppUser[] {
		return mapArrayOrSingleItem(data, (item) => {
			const {
				id,
				email,
				username,
				tenant_id,
				tenant_name,
				role,
				is_blocked,
				last_seen,
				last_login,
				location_ids,
			} = item;

			return new AppUser(
				id,
				email,
				username,
				{id: tenant_id, name: tenant_name},
				role,
				typeof location_ids === 'string' ? JSON.parse(location_ids) : [],
				is_blocked,
				last_seen ? new Date(last_seen) : undefined,
				last_login ? new Date(last_login) : undefined
			);
		});
	}
}

export {AppUser, AppUserRole};

export type {
	AppUserDBType,
	AppUserDTOType,
	AppUserUpdateDBType,
	AppUserUpdateDTOType,
	AppUserInsertDBType,
	AppUserCreateDTOType,
};
