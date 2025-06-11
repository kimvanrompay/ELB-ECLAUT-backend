import type {Knex} from 'knex';
import {v4 as uuid} from 'uuid';

import {
	ForbiddenError,
	LocationNotAllowedError,
	NotFoundError,
	TenantNotAllowedError,
	UnauthorizedError,
	UserAlreadyExistsError,
} from '@lib/errors';
import {
	AppUser,
	type AppUserCreateDTOType,
	type AppUserUpdateDTOType,
} from '@lib/models/app-user';
import type {
	IAppUserRepository,
	ITenantLocationRepository,
} from '@lib/repositories/types';
import {doesArrayHaveAllSameItems} from '@lib/utils/array';
import type {DatabaseQueryFilters} from '@lib/utils/db/filters';
import {PinoLogger} from '@lib/utils/logger';

import {AuthorizationService} from '../authorization-service/authorization.service';
import {type AppContext, isAuthenticatedContext} from '../types';
import type {IAppUserService} from './app-user.service.types';

class AppUserService implements IAppUserService {
	private readonly logger: PinoLogger;

	constructor(
		private appUserRepository: IAppUserRepository,
		private tenantLocationRepository: ITenantLocationRepository,
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

	private getTenantAndLocationFromContext() {
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
			...this.getTenantAndLocationFromContext()
		);
	}

	async findUserByFilters(filters?: DatabaseQueryFilters): Promise<AppUser[]> {
		try {
			return await this.appUserRepository.findUsersByFilters(
				filters,
				...this.getTenantAndLocationFromContext()
			);
		} catch (e) {
			this.logger.error(e);
			return Promise.resolve([]);
		}
	}

	async findPaginatedUsers(
		filters?: DatabaseQueryFilters
	): Promise<PaginatedResult<AppUser>> {
		const entries = await this.appUserRepository.findUsersByFilters(
			filters,
			...this.getTenantAndLocationFromContext()
		);

		const totalEntries = await this.appUserRepository.countUsersByFilters(
			filters,
			...this.getTenantAndLocationFromContext()
		);

		return {
			entries,
			totalEntries,
		};
	}

	getUserById(id: string): Promise<AppUser | undefined> {
		return this.appUserRepository.getUserById(
			id,
			...this.getTenantAndLocationFromContext()
		);
	}

	getUserByEmail(email: string): Promise<AppUser | undefined> {
		return this.appUserRepository.getUserByEmail(
			email,
			...this.getTenantAndLocationFromContext()
		);
	}

	updateUserLastSeen(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(
			id,
			{
				last_seen: new Date().toISOString(),
			},
			...this.getTenantAndLocationFromContext()
		);
	}

	updateUserLastLogin(id: string): Promise<AppUser> {
		return this.appUserRepository.updateUser(
			id,
			{
				last_login: new Date().toISOString(),
				last_seen: new Date().toISOString(),
			},
			...this.getTenantAndLocationFromContext()
		);
	}

	private async checkIfLocationsAreTenantLocations(
		locationIds: string[],
		tenantId: string
	) {
		if (locationIds.length === 0) {
			return;
		}

		const tenantLocations =
			await this.tenantLocationRepository.findTenantLocations(
				{
					where: [
						{
							columnName: 'tenant_location.id',
							type: 'in',
							value: locationIds,
						},
					],
				},
				tenantId
			);

		const isEveryLocationOfTenant =
			tenantLocations.length === locationIds.length;

		if (!isEveryLocationOfTenant) {
			throw new LocationNotAllowedError(
				'You are not allowed to add a user to one or more given locations'
			);
		}
	}

	async createUser(userDTO: AppUserCreateDTOType): Promise<AppUser> {
		if (!this.context.auth || !isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		const [loggedInTenantId] = this.getTenantAndLocationFromContext();

		const isAllowedToCreateRole = AuthorizationService.isAllowedToEditUserRole(
			this.context.auth.role,
			userDTO.role
		);

		if (!isAllowedToCreateRole) {
			throw new ForbiddenError('You are not allowed to perform this action.');
		}

		const isAllowedToAccessTenant =
			AuthorizationService.isAllowedToAccessTenant(
				this.context.auth,
				userDTO.tenantId
			);

		if (!isAllowedToAccessTenant) {
			throw new TenantNotAllowedError(
				'You are not allowed to perform this action.'
			);
		}

		const shouldAddUserToLocations = AuthorizationService.isLocationBound(
			userDTO.role
		);

		let userExists = await this.getUserByEmail(userDTO.email);

		if (!userExists) {
			const newId = await this.appUserRepository.transaction(async (trx) => {
				const appUserRepoScoped = this.appUserRepository.withTransaction(trx);

				const id = uuid();
				await appUserRepoScoped.createUser(
					AppUser.create(userDTO).toInsertDBType()
				);

				if (
					shouldAddUserToLocations &&
					userDTO.locationIds &&
					userDTO.locationIds.length > 0
				) {
					await this.addUserToLocations(id, userDTO.locationIds, trx);
				}

				return id;
			});

			const createdUser = await this.getUserById(newId);

			if (!createdUser) {
				throw new NotFoundError('User not created');
			}
			return createdUser;
		}

		if (userExists.tenant.id !== userDTO.tenantId) {
			// TODO: security issue, should not expose if a user exists or not to another tenant
			throw new UserAlreadyExistsError();
		}

		if (userExists.role !== userDTO.role) {
			throw new UserAlreadyExistsError();
		}

		if (
			userDTO.locationIds &&
			userDTO.locationIds.length > 0 &&
			!doesArrayHaveAllSameItems(userExists.locationIds, userDTO.locationIds)
		) {
			await this.tenantLocationRepository.updateUserTenantLocations(
				userExists.id,
				[...new Set([...userExists.locationIds, ...userDTO.locationIds])],
				loggedInTenantId
			);

			userExists = (await this.getUserById(userExists.id))!;
		}

		return userExists;
	}

	async updateUser(
		id: string,
		userBeingUpdated: AppUserUpdateDTOType
	): Promise<AppUser> {
		if (!this.context.auth || !isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		const [loggedInTenantId, loggedInLocationIds] =
			this.getTenantAndLocationFromContext();

		const isLoggedInUserLocationBound = loggedInLocationIds !== undefined;

		const currentUserBeingUpdated = await this.getUserById(id);

		if (!currentUserBeingUpdated) {
			throw new NotFoundError('User not found');
		}

		const isSelf = this.context.auth.userId === currentUserBeingUpdated.id;

		const isAllowedToEditUserRole =
			AuthorizationService.isAllowedToEditUserRole(
				this.context.auth.role,
				userBeingUpdated.role ?? currentUserBeingUpdated.role
			);

		const isAllowedToAccessTenant =
			AuthorizationService.isAllowedToAccessTenant(
				this.context.auth,
				currentUserBeingUpdated.tenant.id
			);

		const isUserRoleChanged =
			userBeingUpdated.role &&
			userBeingUpdated.role !== currentUserBeingUpdated.role;

		const isUserLocationBound = AuthorizationService.isLocationBound(
			userBeingUpdated.role ?? currentUserBeingUpdated.role
		);

		if (
			(!isSelf && !isAllowedToEditUserRole) ||
			(isSelf && isUserRoleChanged)
		) {
			throw new ForbiddenError('You are not allowed to perform this action.');
		}

		if (!isAllowedToAccessTenant) {
			throw new TenantNotAllowedError(
				'You are not allowed to perform this action.'
			);
		}

		// TODO: check if user is allowed to edit locations
		if (isLoggedInUserLocationBound && userBeingUpdated.locationIds) {
			throw new LocationNotAllowedError(
				'You are not allowed to edit locations'
			);
		}

		await this.checkIfLocationsAreTenantLocations(
			userBeingUpdated.locationIds ?? [],
			currentUserBeingUpdated.tenant.id
		);

		return await this.appUserRepository.transaction(async (trx) => {
			const appUserRepoScoped = this.appUserRepository.withTransaction(trx);
			const tenantLocationServiceScoped =
				this.tenantLocationRepository.withTransaction(trx);

			const locationIds =
				isUserRoleChanged && !isUserLocationBound
					? []
					: userBeingUpdated.locationIds;

			if (locationIds) {
				await tenantLocationServiceScoped.updateUserTenantLocations(
					id,
					locationIds,
					loggedInTenantId
				);
			}

			const toUpdate = AppUser.update(userBeingUpdated);
			const shouldUpdate = Object.keys(toUpdate).length > 0;

			if (!shouldUpdate) {
				const user = await this.appUserRepository.getUserById(
					id,
					loggedInTenantId,
					loggedInLocationIds
				);

				if (!user) {
					throw new NotFoundError('User not found');
				}

				return user;
			}

			return await appUserRepoScoped.updateUser(
				id,
				AppUser.update(userBeingUpdated),
				loggedInTenantId,
				loggedInLocationIds
			);
		});
	}

	async addUserToLocations(
		userId: string,
		locationIds: string[],
		trx?: Knex.Transaction
	): Promise<AppUser> {
		if (!this.context.auth || !isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		const [loggedInTenantId] = this.getTenantAndLocationFromContext();

		const user = await this.getUserById(userId);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		const isAllowedToAccessTenant =
			AuthorizationService.isAllowedToAccessTenant(
				this.context.auth,
				user.tenant.id
			);

		if (!isAllowedToAccessTenant) {
			throw new TenantNotAllowedError(
				'You are not allowed to perform this action.'
			);
		}

		const isAllowedToAddToLocations =
			AuthorizationService.isAllowedToAccessLocations(
				this.context.auth,
				locationIds
			);

		if (!isAllowedToAddToLocations) {
			throw new LocationNotAllowedError(
				'You are not allowed to add a user to one or more given locations'
			);
		}

		const tenantLocationRepo = trx
			? this.tenantLocationRepository.withTransaction(trx)
			: this.tenantLocationRepository;

		await this.checkIfLocationsAreTenantLocations(locationIds, user.tenant.id);

		await tenantLocationRepo.addUserToTenantLocations(
			userId,
			locationIds,
			loggedInTenantId
		);

		const updatedUser = await this.getUserById(userId);

		if (!updatedUser) {
			throw new NotFoundError('User not found');
		}

		return updatedUser;
	}

	async addUserToLocation(
		userId: string,
		locationId: string
	): Promise<AppUser> {
		return this.addUserToLocations(userId, [locationId]);
	}

	async removeUserFromLocations(
		userId: string,
		locationIds: string[]
	): Promise<void> {
		if (!this.context.auth || !isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		const [loggedInTenantId] = this.getTenantAndLocationFromContext();

		const user = await this.getUserById(userId);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		const isAllowedToAccessTenant =
			AuthorizationService.isAllowedToAccessTenant(
				this.context.auth,
				user.tenant.id
			);

		if (!isAllowedToAccessTenant) {
			throw new TenantNotAllowedError(
				'You are not allowed to perform this action.'
			);
		}

		await this.tenantLocationRepository.removeUserFromTenantLocations(
			userId,
			locationIds,
			loggedInTenantId
		);
	}

	async removeUserFromLocation(
		userId: string,
		locationId: string
	): Promise<void> {
		return this.removeUserFromLocations(userId, [locationId]);
	}

	async inactivateUser(id: string): Promise<void> {
		if (!this.context.auth || !isAuthenticatedContext(this.context)) {
			throw new UnauthorizedError('Unauthorized');
		}

		const isSelf = this.context.auth.userId === id;

		if (isSelf) {
			throw new ForbiddenError('You cannot inactivate yourself');
		}

		const user = await this.getUserById(id);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		const [loggedInTenantId, loggedInLocationIds] =
			this.getTenantAndLocationFromContext();

		const isAllowedToAccessTenant =
			AuthorizationService.isAllowedToAccessTenant(
				this.context.auth,
				user.tenant.id
			);

		if (!isAllowedToAccessTenant) {
			throw new TenantNotAllowedError(
				'You are not allowed to perform this action.'
			);
		}

		const userLocationsAfterDeletion = loggedInLocationIds
			? user.locationIds.filter((locationId) => {
					return !loggedInLocationIds.includes(locationId);
				})
			: [];

		return this.appUserRepository.transaction(async (trx) => {
			const appUserRepoScoped = this.appUserRepository.withTransaction(trx);
			const tenantLocationRepoScoped =
				this.tenantLocationRepository.withTransaction(trx);

			await tenantLocationRepoScoped.removeUserFromTenantLocations(
				id,
				user.locationIds.filter((locationId) => {
					return !userLocationsAfterDeletion.includes(locationId);
				}),
				loggedInTenantId
			);

			if (userLocationsAfterDeletion.length === 0) {
				// If user would not have any locations after deletion, inactivate the user
				await appUserRepoScoped.updateUser(
					id,
					{
						is_active: false,
					},
					loggedInTenantId,
					loggedInLocationIds
				);
			}
		});
	}
}

export {AppUserService};
