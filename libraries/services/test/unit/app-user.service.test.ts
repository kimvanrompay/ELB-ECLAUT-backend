import {describe, vi} from 'vitest';

import {
	ForbiddenError,
	LocationNotAllowedError,
	NotFoundError,
	TenantNotAllowedError,
	UnauthorizedError,
	UserAlreadyExistsError,
} from '@lib/errors';
import {AppSecurityGroup, AppUser} from '@lib/models/app-user';
import type {TenantLocation} from '@lib/models/tenant-location';
import type {
	IAppUserRepository,
	ITenantLocationRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import {AppUserService} from '../../src/app-user-service/app-user.service';
import {AuthorizationService} from '../../src/authorization-service/authorization.service';
import type {AppContext, AuthenticatedAppContext} from '../../src/types';

const authContext: AppContext['auth'] = {
	userId: '00000000-0000-0000-0000-000000000001',
	securityGroup: AppSecurityGroup.ELAUT_ADMIN,
	email: 'admin@example.com',
	locationIds: [],
	tenantId: '00000000-0000-0000-0000-000000000001',
	isElaut: true,
	type: 'USER',
	clientId: undefined,
};

const context: AuthenticatedAppContext = {
	auth: authContext,
	isAuthenticated: true,
	requestId: 'test-request-id',
	logger: new PinoLogger(
		{
			requestId: 'test-request-id',
		},
		{}
	),
};

const mockAppUserRepositoryBase = {
	findUsersByFilters: vi.fn(),
	createUser: vi.fn(),
	updateUser: vi.fn(),
	getUserById: vi.fn(),
	getUserByEmail: vi.fn(),
	getUserByIdForUpdate: vi.fn(),
	transaction: vi.fn((fn) => fn()),
	countUsersByFilters: vi.fn(),
} satisfies Omit<IAppUserRepository, 'withTransaction'>;

const mockTenantLocationRepositoryBase = {
	findTenantLocations: vi.fn(),
	findTenantLocationsByUserId: vi.fn(),
	getTenantLocationById: vi.fn(),
	createTenantLocation: vi.fn(),
	updateUserTenantLocations: vi.fn(),
	addUserToTenantLocation: vi.fn(),
	removeUserFromTenantLocation: vi.fn(),
	transaction: vi.fn((fn) => fn()),
	findTenantLocationsByUserIdForUpdate: vi.fn(),
	addUserToTenantLocations: vi.fn(),
	removeUserFromTenantLocations: vi.fn(),
	inactivateTenantLocation: vi.fn(),
	updateTenantLocation: vi.fn(),
	countTenantLocations: vi.fn(),
	findTenantLocationsByClientId: vi.fn(),
} satisfies Omit<ITenantLocationRepository, 'withTransaction'>;

const mockTenantLocationRepository = {
	...mockTenantLocationRepositoryBase,
	withTransaction: vi.fn(() => ({
		...mockTenantLocationRepositoryBase,
		withTransaction: vi.fn(),
	})),
} satisfies ITenantLocationRepository;

const mockAppUserRepository = {
	...mockAppUserRepositoryBase,
	withTransaction: vi.fn(() => ({
		...mockAppUserRepositoryBase,
		withTransaction: vi.fn(),
	})),
} satisfies IAppUserRepository;

afterEach(() => {
	vi.resetAllMocks();
});

describe('AppUserService', () => {
	let appUserService: AppUserService;

	beforeEach(() => {
		appUserService = new AppUserService(
			mockAppUserRepository,
			mockTenantLocationRepository,
			{
				...context,
			}
		);
	});

	describe('findUserByFilters', () => {
		it('should return all users when no filters are given', async () => {
			mockAppUserRepository.findUsersByFilters.mockResolvedValue([]);

			const result = await appUserService.findUserByFilters();

			expect(result).toEqual([]);
			expect(mockAppUserRepository.findUsersByFilters).toHaveBeenCalledWith(
				undefined,
				undefined,
				undefined
			);
		});

		it('should passthrough the filters to the repository', async () => {
			mockAppUserRepository.findUsersByFilters.mockResolvedValue([]);

			const result = await appUserService.findUserByFilters({
				where: [
					{
						columnName: 'email',
						type: 'eq',
						value: 'admin@example.com',
					},
				],
			});

			expect(result).toEqual([]);
			expect(mockAppUserRepository.findUsersByFilters).toHaveBeenCalledWith(
				{
					where: [
						{
							columnName: 'email',
							type: 'eq',
							value: 'admin@example.com',
						},
					],
				},
				undefined,
				undefined
			);
		});

		it('should return an empty array when the repository throws an error', async () => {
			mockAppUserRepository.findUsersByFilters.mockRejectedValue(
				new Error('Test error')
			);

			const result = await appUserService.findUserByFilters();

			expect(result).toEqual([]);
			expect(mockAppUserRepository.findUsersByFilters).toHaveBeenCalledWith(
				undefined,
				undefined,
				undefined
			);
		});

		it('should pass the tenantId and locationIds from the context to the repository', async () => {
			mockAppUserRepository.findUsersByFilters.mockResolvedValue([]);

			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-9999'],
					},
				}
			);

			const result = await appUserService.findUserByFilters();

			expect(result).toEqual([]);
			expect(mockAppUserRepository.findUsersByFilters).toHaveBeenCalledWith(
				undefined,
				authContext.tenantId,
				['00000000-0000-0000-0000-9999']
			);
		});

		it('should not pass tenantId to the repository when the user is not tenant bound', async () => {
			mockAppUserRepository.findUsersByFilters.mockResolvedValue([]);

			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.ELAUT_ADMIN,
						isElaut: true,
						locationIds: ['00000000-0000-0000-0000-9999'],
					},
				}
			);

			const result = await appUserService.findUserByFilters();

			expect(result).toEqual([]);
			expect(mockAppUserRepository.findUsersByFilters).toHaveBeenCalledWith(
				undefined,
				undefined,
				undefined
			);
		});

		it('should not pass locationIds to the repository when the user is not location bound', async () => {
			mockAppUserRepository.findUsersByFilters.mockResolvedValue([]);

			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-9999'],
					},
				}
			);

			const result = await appUserService.findUserByFilters();

			expect(result).toEqual([]);
			expect(mockAppUserRepository.findUsersByFilters).toHaveBeenCalledWith(
				undefined,
				authContext.tenantId,
				undefined
			);
		});
	});

	describe('blockUser', () => {
		it('should call the repository with the correct arguments', async () => {
			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'user@example.com',
				'user',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				['00000000-0000-0000-0000-000000000009'],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.blockUser(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);
			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					is_blocked: true,
				},
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'user@example.com',
				'user',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				['00000000-0000-0000-0000-000000000009'],
				true,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-9999'],
					},
				}
			);

			const result = await appUserService.blockUser(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);
			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					is_blocked: true,
				},
				authContext.tenantId,
				undefined
			);
		});

		it('should pass the locationIds from the context to the repository if the logged in user is location bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_MANAGER,
				['00000000-0000-0000-0000-000000000009'],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-9999'],
					},
				}
			);

			const result = await appUserService.blockUser(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					is_blocked: true,
				},
				authContext.tenantId,
				['00000000-0000-0000-0000-9999']
			);
		});
	});

	describe('getUserById', () => {
		it('should call the repository with the correct arguments', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const result = await appUserService.getUserById(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const result = await appUserService.getUserById(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				context.auth.tenantId,
				undefined
			);
		});

		it('should pass the locationId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const result = await appUserService.getUserById(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				context.auth.tenantId,
				context.auth.locationIds
			);
		});
	});

	describe('getUserByEmail', () => {
		it('should call the repository with the correct arguments', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);

			const result = await appUserService.getUserByEmail('admin@example.com');

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserByEmail).toHaveBeenCalledWith(
				'admin@example.com',
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);

			const result = await appUserService.getUserByEmail('admin@example.com');

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserByEmail).toHaveBeenCalledWith(
				'admin@example.com',
				context.auth.tenantId,
				undefined
			);
		});

		it('should pass the locationId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);

			const result = await appUserService.getUserByEmail('admin@example.com');

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserByEmail).toHaveBeenCalledWith(
				'admin@example.com',
				context.auth.tenantId,
				context.auth.locationIds
			);
		});
	});

	describe('updateUserLastSeen', () => {
		it('should call the repository with the correct arguments', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.updateUserLastSeen(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					last_seen: expect.any(String),
				},
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.updateUserLastSeen(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					last_seen: expect.any(String),
				},
				context.auth.tenantId,
				undefined
			);
		});

		it('should pass the locationId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.updateUserLastSeen(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					last_seen: expect.any(String),
				},
				context.auth.tenantId,
				context.auth.locationIds
			);
		});
	});

	describe('updateUserLastLogin', () => {
		it('should call the repository with the correct arguments', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.updateUserLastLogin(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					last_login: expect.any(String),
					last_seen: expect.any(String),
				},
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.updateUserLastLogin(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					last_login: expect.any(String),
					last_seen: expect.any(String),
				},
				context.auth.tenantId,
				undefined
			);
		});

		it('should pass the locationId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const result = await appUserService.updateUserLastLogin(
				'00000000-0000-0000-0000-000000000009'
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					last_login: expect.any(String),
					last_seen: expect.any(String),
				},
				context.auth.tenantId,
				context.auth.locationIds
			);
		});
	});

	describe('createUser', () => {
		it('should throw an error when the context is not authenticated', async () => {
			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: undefined,
				}
			);

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(UnauthorizedError);
		});

		it('should throw an error when the tenantId of the user does not match the tenantId of the logged in user', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						tenantId: '00000000-0000-0000-0000-000000000002',
					},
				}
			);

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000099',
					locationIds: [],
				})
			).rejects.toThrowError(TenantNotAllowedError);
		});

		it('should throw an error when the locationIds of the user does not match the locationIds of the logged in user', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);
			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						tenantId: '00000000-0000-0000-0000-000000000001',
						locationIds: [
							'00000000-0000-0000-0000-000000000096',
							'00000000-0000-0000-0000-000000000097',
							'00000000-0000-0000-0000-000000000098',
						],
					},
				}
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: ['00000000-0000-0000-0000-000000000099'],
				})
			).rejects.toThrowError(LocationNotAllowedError);

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [
						'00000000-0000-0000-0000-000000000097',
						'00000000-0000-0000-0000-000000000096',
						'00000000-0000-0000-0000-000000000099',
					],
				})
			).rejects.toThrowError(LocationNotAllowedError);
		});

		it('should call the repository with the correct arguments', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.createUser.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const result = await appUserService.createUser({
				email: 'admin@example.com',
				securityGroup: AppSecurityGroup.ELAUT_ADMIN,
				username: 'admin',
				tenantId: '00000000-0000-0000-0000-000000000001',
				locationIds: [],
			});

			expect(result).toEqual(user);

			expect(mockAppUserRepository.createUser).toHaveBeenCalledWith({
				id: expect.any(String),
				email: 'admin@example.com',
				role: AppSecurityGroup.ELAUT_ADMIN,
				username: 'admin',
				tenant_id: '00000000-0000-0000-0000-000000000001',
			});

			// TODO: test for locations
		});

		it('should throw a not found error when the user is not found', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.createUser.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValue(undefined);

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(NotFoundError);
		});

		it('should throw an forbidden error when a user attempts to create an user with a role above them', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			await expect(
				appUserService.createUser({
					email: 'newuser@example.com',
					securityGroup: AppSecurityGroup.TENANT_ADMIN,
					username: 'newuser',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(ForbiddenError);
		});

		it('should throw a forbidden error when a user attempts to create an user with locations they do not have access to', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(true);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-9999'],
					},
				}
			);
			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);
			mockAppUserRepository.getUserById.mockResolvedValue(user);

			await expect(
				appUserService.createUser({
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: ['00000000-0000-0000-0000-000000000009'],
				})
			).rejects.toThrowError(LocationNotAllowedError);
		});

		it('should throw a forbidden error when a user attempts to create an user with locations from another tenant', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockImplementation(
				(securityGroup: AppSecurityGroup) => {
					return securityGroup !== AppSecurityGroup.ELAUT_ADMIN;
				}
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.ELAUT_ADMIN,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([]);
			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);
			mockAppUserRepository.getUserById.mockResolvedValue(user);

			await expect(
				appUserService.createUser({
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: ['00000000-0000-0000-0000-000000000009'],
				})
			).rejects.toThrowError(LocationNotAllowedError);

			expect(
				mockTenantLocationRepository.findTenantLocations
			).toHaveBeenCalledWith(
				{
					where: [
						{
							columnName: 'tenant_location.id',
							type: 'in',
							value: ['00000000-0000-0000-0000-000000000009'],
						},
					],
				},
				'00000000-0000-0000-0000-000000000001'
			);
		});

		// TODO: security issue
		it('should throw a user already exists error when the user already exists with another tenant', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000002',
					name: 'Test Tenant 2',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValue(user);

			await expect(
				appUserService.createUser({
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(UserAlreadyExistsError);
		});

		it('should throw a user already exists error when the user already exists with the same tenant but different role', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValue(user);

			await expect(
				appUserService.createUser({
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
					username: 'employee',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(UserAlreadyExistsError);
		});

		it('should update the user locationIds when the user already exists with the same tenant and role', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				['00000000-0000-0000-0000-000000000009'],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			const newUser = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[
					'00000000-0000-0000-0000-000000000009',
					'00000000-0000-0000-0000-000000000010',
				],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValueOnce(newUser);

			const result = await appUserService.createUser({
				email: 'employee@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				username: 'employee',
				tenantId: '00000000-0000-0000-0000-000000000001',
				locationIds: ['00000000-0000-0000-0000-000000000010'],
			});

			expect(result).toEqual(newUser);

			expect(mockAppUserRepository.getUserByEmail).toHaveBeenCalledWith(
				'employee@example.com',
				undefined,
				undefined
			);
			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				undefined,
				undefined
			);

			expect(
				mockTenantLocationRepository.updateUserTenantLocations
			).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				[
					'00000000-0000-0000-0000-000000000009',
					'00000000-0000-0000-0000-000000000010',
				],
				undefined
			);
		});
	});

	describe('updateUser', () => {
		it('should throw an not found error when the user is not found', async () => {
			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue(undefined);

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				})
			).rejects.toThrowError(NotFoundError);
		});

		it('should throw an error when the context is not authenticated', async () => {
			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: false,
					auth: undefined,
				}
			);

			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				securityGroup: AppSecurityGroup.ELAUT_ADMIN,
				username: 'admin',
				locationIds: [],
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				})
			).rejects.toThrowError(UnauthorizedError);
		});

		it('should pass the correct arguments to the repository', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([]);

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				}
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
				},
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				[],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([]);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
					},
				}
			);

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				}
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				context.auth.tenantId,
				undefined
			);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
				},
				context.auth.tenantId,
				undefined
			);
		});

		it('should pass the locationIds from the context to the repository if the logged in user is location bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(true);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'admin@example.com',
				'admin',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.ELAUT_ADMIN,
				['00000000-0000-0000-0000-000000000001'],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(user);
			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([
				{
					id: '00000000-0000-0000-0000-000000000001',
				},
			]);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					auth: {
						...authContext,
						locationIds: ['00000000-0000-0000-0000-000000000001'],
					},
				}
			);

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
				}
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				context.auth.tenantId,
				['00000000-0000-0000-0000-000000000001']
			);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
				},
				context.auth.tenantId,
				['00000000-0000-0000-0000-000000000001']
			);
		});

		it('should update the user locationIds when they are given as arguments', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				['00000000-0000-0000-0000-000000000012'],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			const newUser = new AppUser(
				'00000000-0000-0000-0000-000000000009',
				'employee@example.com',
				'employee',
				{
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				[
					'00000000-0000-0000-0000-000000000009',
					'00000000-0000-0000-0000-000000000010',
				],
				false,
				true,
				new Date('2021-01-01T00:00:00.000Z'),
				new Date('2021-01-01T00:00:00.000Z')
			);

			mockAppUserRepository.getUserById.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(newUser);

			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([
				{
					id: '00000000-0000-0000-0000-000000000009',
				},
				{
					id: '00000000-0000-0000-0000-000000000010',
				},
			]);

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					locationIds: [
						'00000000-0000-0000-0000-000000000009',
						'00000000-0000-0000-0000-000000000010',
					],
				}
			);

			expect(result).toEqual(newUser);

			expect(mockAppUserRepository.getUserById).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				undefined,
				undefined
			);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'employee@example.com',
					role: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
				},
				undefined,
				undefined
			);

			expect(
				mockTenantLocationRepository.findTenantLocations
			).toHaveBeenCalledWith(
				{
					where: [
						{
							columnName: 'tenant_location.id',
							type: 'in',
							value: [
								'00000000-0000-0000-0000-000000000009',
								'00000000-0000-0000-0000-000000000010',
							],
						},
					],
				},
				'00000000-0000-0000-0000-000000000001'
			);

			expect(
				mockTenantLocationRepository.updateUserTenantLocations
			).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				[
					'00000000-0000-0000-0000-000000000009',
					'00000000-0000-0000-0000-000000000010',
				],
				undefined
			);
		});

		it('should throw an forbidden error when a user attempts to update a user with a role above them', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				securityGroup: AppSecurityGroup.TENANT_ADMIN,
				username: 'admin',
				locationIds: [],
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				})
			).rejects.toThrowError(ForbiddenError);
		});

		it('should not throw an unauthorized error when a user attempts to update themselves', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(false);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						userId: '00000000-0000-0000-0000-000000000009',
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
				username: 'admin',
				locationIds: [],
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
			});

			mockAppUserRepository.updateUser.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
				username: 'admin2',
				locationIds: [],
			});

			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([]);

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					username: 'admin2',
				})
			).resolves.not.toThrowError();
		});

		it('should throw an forbidden error when a user attempts to update their own role', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: authContext.userId,
				email: 'admin@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
				tenant: {
					id: authContext.tenantId,
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					securityGroup: AppSecurityGroup.TENANT_ADMIN,
					username: 'admin',
					locationIds: [],
				})
			).rejects.toThrowError(ForbiddenError);
		});

		it('should throw an forbidden error when a user attempts to update a user to a role above them', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'employee@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				username: 'employee',
				locationIds: [],
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ADMIN,
					username: 'employee',
					locationIds: [],
				})
			).rejects.toThrowError(ForbiddenError);
		});

		it('should throw an forbidden error when a user attempts to update a user that is from another tenant when they are tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						tenantId: 'SOME_TENANT_ID',
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: [],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'employee@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				username: 'employee',
				locationIds: [],
				tenant: {
					id: 'ANOTHER_TENANT_ID',
					name: 'Test Tenant',
				},
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					locationIds: [],
				})
			).rejects.toThrowError(TenantNotAllowedError);
		});

		it('should throw an location not allowed error when a user attempts to update a user their locations to one from a different tenant', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-000000000001'],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'employee@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				username: 'employee',
				locationIds: ['00000000-0000-0000-0000-000000000001'],
				tenant: {
					id: authContext.tenantId,
					name: 'Test Tenant',
				},
			});

			mockTenantLocationRepository.findTenantLocations.mockResolvedValue([]);

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					locationIds: ['00000000-0000-0000-0000-000000000002'],
				})
			).rejects.toThrowError(LocationNotAllowedError);

			expect(
				mockTenantLocationRepository.findTenantLocations
			).toHaveBeenCalledWith(
				{
					where: [
						{
							columnName: 'tenant_location.id',
							type: 'in',
							value: ['00000000-0000-0000-0000-000000000002'],
						},
					],
				},
				'00000000-0000-0000-0000-000000000001'
			);
		});

		// it('should throw an error when passing an empty locations array to a location bound user', async () => {
		// 	vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);
		//
		// 	vi.spyOn(AuthorizationService, 'isLocationBound').mockImplementation(
		// 		(securityGroup: AppSecurityGroup) => {
		// 			return role === AppSecurityGroup.TENANT_ARCADE_EMPLOYEE;
		// 		}
		// 	);
		//
		// 	vi.spyOn(
		// 		AuthorizationService,
		// 		'isAllowedToEditUserRole'
		// 	).mockReturnValueOnce(true);
		//
		// 	appUserService = new AppUserService(
		// 		mockAppUserRepository,
		// 		mockTenantLocationRepository,
		// 		{
		// 			...context,
		// 			isAuthenticated: true,
		// 			auth: {
		// 				...authContext,
		// 				securityGroup: AppSecurityGroup.TENANT_ADMIN,
		// 				isElaut: false,
		// 				locationIds: [],
		// 			},
		// 		}
		// 	);
		//
		// 	mockAppUserRepository.getUserById.mockResolvedValue({
		// 		id: '00000000-0000-0000-0000-000000000009',
		// 		email: 'employee@example.com',
		// 		securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
		// 		username: 'employee',
		// 		locationIds: ['00000000-0000-0000-0000-000000000001'],
		// 		tenant: {
		// 			id: authContext.tenantId,
		// 			name: 'Test Tenant',
		// 		},
		// 	});
		//
		// 	await expect(
		// 		appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
		// 			email: 'employee@example.com',
		// 			securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
		// 			username: 'employee',
		// 			locationIds: [],
		// 		})
		// 	).rejects.toThrowError(MissingLocationError);
		// });

		it('should throw an error when a location bound user attempts to update a user their location', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				true
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(true);

			appUserService = new AppUserService(
				mockAppUserRepository,
				mockTenantLocationRepository,
				{
					...context,
					isAuthenticated: true,
					auth: {
						...authContext,
						securityGroup: AppSecurityGroup.TENANT_ARCADE_MANAGER,
						isElaut: false,
						locationIds: ['00000000-0000-0000-0000-000000000001'],
					},
				}
			);

			mockAppUserRepository.getUserById.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'employee@example.com',
				securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
				username: 'employee',
				locationIds: ['00000000-0000-0000-0000-000000000002'],
				tenant: {
					id: authContext.tenantId,
					name: 'Test Tenant',
				},
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'employee@example.com',
					securityGroup: AppSecurityGroup.TENANT_ARCADE_EMPLOYEE,
					username: 'employee',
					locationIds: ['00000000-0000-0000-0000-000000000001'],
				})
			).rejects.toThrowError(LocationNotAllowedError);
		});
	});

	//TODO: add tests for add user to location
	//TODO: add tests for remove user from location
});
