import type {AppUser} from '@lib/models/app-user';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

interface IAppUserService {
	findUserByFilters(filters?: DatabaseQueryFilters): Promise<AppUser[]>;

	getUserById(id: string): Promise<AppUser | undefined>;

	getUserByEmail(email: string): Promise<AppUser | undefined>;

	updateUserLastSeen(id: string): Promise<AppUser>;

	updateUserLastLogin(id: string): Promise<AppUser>;

	blockUser(id: string): Promise<AppUser>;
}

export type {IAppUserService};
