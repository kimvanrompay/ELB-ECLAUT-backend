import {
	AppUser,
	type AppUserInsertDBType,
	type AppUserUpdateDBType,
} from '@lib/models/app-user';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IAppUserRepository {
	findUsersByFilters(filters?: DatabaseQueryFilters): Promise<AppUser[]>;

	getUserById(id: string): Promise<AppUser | undefined>;

	getUserByEmail(email: string): Promise<AppUser | undefined>;

	updateUser(id: string, user: AppUserUpdateDBType): Promise<AppUser>;

	createUser(user: AppUserInsertDBType): Promise<AppUser>;
}

export type {IAppUserRepository};
