import {v4 as uuid} from 'uuid';

import {
	CreateUserLocationNotAllowedError,
	CreateUserTenantNotAllowedError,
	NotFoundError,
	UnauthorizedError,
} from '@lib/errors';
import type {
	AppUser,
	AppUserCreateDTOType,
	AppUserUpdateDTOType,
} from '@lib/models/app-user';
import type {IAppUserRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';

import {AuthorizationService} from '../authorization-service/authorization.service';
import {type AppContext, isAuthenticatedContext} from '../types';
import type {IAppUserService} from './app-user.service.types';

class AppUserService implements IAppUserService {
	private readonly logger: PinoLogger;
	private readonly appUserRepositoryProxyWithContext: IAppUserRepository;

	constructor(
		private appUserRepository: IAppUserRepository,
		private context: AppContext
	) {
		this.appUserRepository = appUserRepository;
		this.context = context;
		this.logger = context.logger.getChildLogger(
			{
				name: 'app-user-service',
			},
			{}
		);
	}

	private getContextArgs() {
		const auth = this.context.auth;

		if (!auth) {
			return [undefined, undefined] as const;
		}

		return [
			AuthorizationService.isTenantBound(auth.role) ? auth.tenantId : undefined,
			AuthorizationService.isLocationBound(auth.role)
				? auth.locationIds
				: undefined,
		] as const;
	}

	async blockUser(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(
			id,
			{
				is_blocked: true,
			},
			...this.getContextArgs()
		);
	}

	async findUserByFilters(filters?: DatabaseQueryFilters): Promise<AppUser[]> {
		try {
			return await this.appUserRepository.findUsersByFilters(
				filters,
				...this.getContextArgs()
			);
		} catch (e) {
			this.logger.error(e);
			return Promise.resolve([]);
		}
	}

	getUserById(id: string): Promise<AppUser | undefined> {
		return this.appUserRepository.getUserById(id, ...this.getContextArgs());
	}

	getUserByEmail(email: string): Promise<AppUser | undefined> {
		return this.appUserRepository.getUserByEmail(
			email,
			...this.getContextArgs()
		);
	}

	updateUserLastSeen(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(
			id,
			{
				last_seen: new Date().toISOString(),
			},
			...this.getContextArgs()
		);
	}

	updateUserLastLogin(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(
			id,
			{
				last_login: new Date().toISOString(),
				last_seen: new Date().toISOString(),
			},
			...this.getContextArgs()
		);
	}

	async createUser(user: AppUserCreateDTOType): Promise<AppUser> {
		if (!isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		const loggedInTenantId = this.context.auth.tenantId;
		const loggedInLocationIds = this.context.auth.locationIds;

		const shouldAddUserToTenant = AuthorizationService.isTenantBound(
			this.context.auth.role
		);

		const shouldAddUserToLocation = AuthorizationService.isLocationBound(
			this.context.auth.role
		);

		const isTenantAllowed = shouldAddUserToTenant
			? user.tenantId === loggedInTenantId
			: true;
		let isLocationAllowed = !shouldAddUserToLocation;
		if (shouldAddUserToLocation) {
			isLocationAllowed = user.locationIds.every((locationId) =>
				loggedInLocationIds.includes(locationId)
			);
		}

		if (!isTenantAllowed) {
			throw new CreateUserTenantNotAllowedError('Tenant not allowed');
		}

		if (!isLocationAllowed) {
			throw new CreateUserLocationNotAllowedError('Location not allowed');
		}

		// A user can only create a user with a role that is lower or equal than their own
		if (
			!AuthorizationService.isAllowedToEditUserRole(
				this.context.auth.role,
				user.role
			)
		) {
			throw new UnauthorizedError('Unauthorized');
		}

		const id = uuid();
		await this.appUserRepository.createUser({
			id,
			username: user.username,
			role: user.role,
			email: user.email,
			tenant_id: user.tenantId,
		});

		// TODO: add user to locations via location service

		const createdUser = await this.getUserById(id);

		if (!createdUser) {
			throw new NotFoundError('User not created');
		}

		return createdUser;
	}

	async updateUser(id: string, user: AppUserUpdateDTOType): Promise<AppUser> {
		return await this.appUserRepository.transaction(async (trx) => {
			const appUserRepoScoped = this.appUserRepository.withTransaction(trx);

			// Change the 'this.db' value to the current transaction within the getUserById call for once
			const currentUser = await appUserRepoScoped.getUserByIdForUpdate(
				id,
				...this.getContextArgs()
			);

			if (!currentUser) {
				throw new NotFoundError('User not found');
			}

			if (
				!this.context.isAuthenticated ||
				!this.context.auth ||
				!AuthorizationService.isAllowedToEditUserRole(
					this.context.auth.role,
					currentUser.role
				)
			) {
				throw new UnauthorizedError('Unauthorized');
			}

			// TODO: add or remove user to locations via location service

			const {locationIds, ...userWithoutLocations} = user;

			return await appUserRepoScoped.updateUser(
				id,
				userWithoutLocations,
				...this.getContextArgs()
			);
		});
	}
}

export {AppUserService};
