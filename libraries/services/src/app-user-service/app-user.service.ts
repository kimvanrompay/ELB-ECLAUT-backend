import type {AppUser} from '@lib/models/app-user';
import type {IAppUserRepository} from '@lib/repositories/types';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import type {IAppUserService} from './app-user.service.types';

class AppUserService implements IAppUserService {
	constructor(private appUserRepository: IAppUserRepository) {}

	async blockUser(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(id, {
			is_blocked: true,
		});
	}

	async findUserByFilters(filters?: DatabaseQueryFilters): Promise<AppUser[]> {
		try {
			return await this.appUserRepository.findUsersByFilters(filters);
		} catch (e) {
			console.error(e);
			return Promise.resolve([]);
		}
	}

	getUserById(id: string): Promise<AppUser | undefined> {
		return this.appUserRepository.getUserById(id);
	}

	getUserByEmail(email: string): Promise<AppUser | undefined> {
		return this.appUserRepository.getUserByEmail(email);
	}

	updateUserLastSeen(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(id, {
			last_seen: new Date().toISOString(),
		});
	}

	updateUserLastLogin(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(id, {
			last_login: new Date().toISOString(),
			last_seen: new Date().toISOString(),
		});
	}
}

export {AppUserService};
