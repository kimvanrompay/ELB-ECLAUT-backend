import {v4 as uuid} from 'uuid';

import {mapArrayOrSingleItem} from '@lib/utils';
import {getLanguageOrDefault} from '@lib/utils/language';

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
	static schema = {
		AppUserDTOSchema,
		AppUserDBSchema,
		AppUserCreateDTOSchema,
		AppUserInsertDBSchema,
		AppUserUpdateDTOSchema,
		AppUserUpdateDBSchema,
	};

	public constructor(
		public id: string,
		public email: string,
		public username: string,
		public tenant: {
			id: string;
			name: string;
		},
		public securityGroup: AppSecurityGroup,
		public settings: {
			allowPasswordLogin: boolean;
			language: string;
		},
		public locationIds: string[] = [],
		public isBlocked = false,
		public isActive = true,
		public lastSeen: Date | undefined = undefined,
		public lastLogin: Date | undefined = undefined,
		public hasTempPassword = false,
		public hashedPassword = ''
	) {}

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
			hasTempPassword: this.hasTempPassword,
			settings: {
				allowPasswordLogin: true, // Default value, can be changed later
				language: 'en', // Default value, can be changed later
			},
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
			hashed_password: this.hashedPassword,
			has_temp_password: this.hasTempPassword,
			language: this.settings.language,
			allow_password_login: this.settings.allowPasswordLogin,
		};
	}

	toInsertDBType(): AppUserInsertDBType {
		return {
			id: this.id,
			email: this.email,
			tenant_id: this.tenant.id,
			username: this.username,
			role: this.securityGroup,
			language: this.settings.language,
			has_temp_password: this.hasTempPassword,
			allow_password_login: this.settings.allowPasswordLogin,
			hashed_password: this.hashedPassword,
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
				hasTempPassword,
				settings,
			} = item;
			return new AppUser(
				id,
				email,
				username,
				tenant,
				role,
				settings,
				locationIds,
				isBlocked,
				isActive,
				lastSeen ? new Date(lastSeen) : undefined,
				lastLogin ? new Date(lastLogin) : undefined,
				hasTempPassword
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
				allow_password_login,
				has_temp_password,
				hashed_password,
				language,
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
				{
					allowPasswordLogin: allow_password_login,
					language: language || 'en',
				},
				parsed_location_ids,
				is_blocked,
				is_active,
				last_seen ? new Date(last_seen) : undefined,
				last_login ? new Date(last_login) : undefined,
				has_temp_password,
				hashed_password || ''
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
			{
				allowPasswordLogin: validatedData.settings?.allowPasswordLogin ?? true,
				language: getLanguageOrDefault(validatedData.settings?.language),
			},
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
