import {v4 as uuid} from 'uuid';

import {mapArrayOrSingleItem} from '@lib/utils';

import {
	AppSecurityGroup,
	AppUserCreateDTOSchema,
	type AppUserCreateDTOType,
	AppUserDBSchema,
	type AppUserDBType,
	AppUserDTOSchema,
	type AppUserDTOType,
	AppUserInsertDBSchema,
	type AppUserInsertDBType,
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
	securityGroup: AppSecurityGroup;
	isBlocked: boolean;
	isActive: boolean;
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
		securityGroup: AppSecurityGroup,
		locationIds: string[] = [],
		isBlocked = false,
		isActive = true,
		lastSeen: Date | undefined = undefined,
		lastLogin: Date | undefined = undefined
	) {
		this.id = id;
		this.email = email;
		this.tenant = tenant;
		this.securityGroup = securityGroup;
		this.locationIds = locationIds;
		this.username = username;
		this.isBlocked = isBlocked;
		this.lastSeen = lastSeen;
		this.lastLogin = lastLogin;
		this.isActive = isActive;
	}

	toJSON(): AppUserDTOType {
		return {
			id: this.id,
			email: this.email,
			username: this.username,
			tenant: this.tenant,
			role: this.securityGroup,
			locationIds: this.locationIds,
			isBlocked: this.isBlocked,
			lastLogin: this.lastLogin?.toISOString(),
			lastSeen: this.lastSeen?.toISOString(),
			isActive: this.isActive,
		};
	}

	toDBType(): AppUserDBType {
		return {
			id: this.id,
			email: this.email,
			tenant_id: this.tenant.id,
			tenant_name: this.tenant.name,
			username: this.username,
			role: this.securityGroup,
			is_blocked: this.isBlocked,
			last_login: this.lastLogin?.toISOString(),
			last_seen: this.lastSeen?.toISOString(),
			location_ids: JSON.stringify(this.locationIds),
			is_active: this.isActive,
		};
	}

	toInsertDBType(): AppUserInsertDBType {
		return {
			id: this.id,
			email: this.email,
			tenant_id: this.tenant.id,
			username: this.username,
			role: this.securityGroup,
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
				isActive,
			} = item;
			return new AppUser(
				id,
				email,
				username,
				tenant,
				role,
				locationIds,
				isBlocked,
				isActive,
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
				is_active,
				last_seen,
				last_login,
				location_ids,
			} = item;

			const parsed_location_ids =
				typeof location_ids === 'string'
					? JSON.parse(location_ids)
					: location_ids;

			return new AppUser(
				id,
				email,
				username,
				{id: tenant_id, name: tenant_name},
				role,
				parsed_location_ids,
				is_blocked,
				is_active,
				last_seen ? new Date(last_seen) : undefined,
				last_login ? new Date(last_login) : undefined
			);
		});
	}

	static create(data: AppUserCreateDTOType): AppUser {
		const generatedId = uuid();

		const validatedData = AppUserCreateDTOSchema.parse(data);

		return new AppUser(
			generatedId,
			validatedData.email,
			validatedData.username,
			{id: validatedData.tenantId, name: ''},
			validatedData.securityGroup,
			[],
			false,
			true
		);
	}

	static update(data: AppUserUpdateDTOType): AppUserUpdateDBType {
		const updateData: AppUserUpdateDBType = {};

		if (data.email) {
			updateData.email = data.email;
		}

		if (data.username) {
			updateData.username = data.username;
		}

		if (data.securityGroup) {
			updateData.role = data.securityGroup;
		}

		if (data.isBlocked) {
			updateData.is_blocked = data.isBlocked;
		}

		return updateData;
	}
}

export {AppUser, AppSecurityGroup};

export type {
	AppUserDBType,
	AppUserDTOType,
	AppUserUpdateDBType,
	AppUserUpdateDTOType,
	AppUserInsertDBType,
	AppUserCreateDTOType,
};
