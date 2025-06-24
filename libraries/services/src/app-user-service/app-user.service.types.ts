import type {
	AppUser,
	AppUserCreateDTOType,
	AppUserUpdateDTOType,
} from '@lib/models/app-user';
import type {
	DatabaseQueryFilters,
	PaginatedDatabaseQueryFilters,
} from '@lib/utils/db/filters';

interface IAppUserService {
	findUserByFilters(filters?: DatabaseQueryFilters): Promise<AppUser[]>;

	findPaginatedUsers(
		filters?: PaginatedDatabaseQueryFilters
	): Promise<PaginatedResult<AppUser>>;

	getUserById(id: string): Promise<AppUser | undefined>;

	getUserByEmail(email: string): Promise<AppUser | undefined>;

	updateUserLastSeen(id: string): Promise<AppUser>;

	updateUserLastLogin(id: string): Promise<AppUser>;

	blockUser(id: string): Promise<AppUser>;

	createUser(user: AppUserCreateDTOType): Promise<AppUser>;

	updateUser(id: string, user: AppUserUpdateDTOType): Promise<AppUser>;

	updateUserPassword(id: string, newPassword: string): Promise<AppUser>;

	inactivateUser(id: string): Promise<void>;
}

export type {IAppUserService};
