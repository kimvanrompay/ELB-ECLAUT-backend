import {describe, vi} from 'vitest';

import {
	LocationNotAllowedError,
	NotFoundError,
	TenantNotAllowedError,
	UnauthorizedError,
} from '@lib/errors';
import {AppUser, AppUserRole} from '@lib/models/app-user';
import type {IAppUserRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import {AppUserService} from '../../src/app-user-service/app-user.service';
import {AuthorizationService} from '../../src/authorization-service/authorization.service';
import type {AppContext, AuthenticatedAppContext} from '../../src/types';

const authContext: AppContext['auth'] = {
	userId: '00000000-0000-0000-0000-000000000001',
	role: AppUserRole.ELAUT_ADMIN,
	email: 'admin@example.com',
	locationIds: [],
	tenantId: '00000000-0000-0000-0000-000000000001',
	isElaut: true,
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
};

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
	describe('findUserByFilters', () => {
		it('should return all users when no filters are given', async () => {
			mockAppUserRepository.findUsersByFilters.mockResolvedValue([]);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					role: AppUserRole.TENANT_ARCADE_MANAGER,
					isElaut: false,
					locationIds: ['00000000-0000-0000-0000-9999'],
				},
			});

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

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					role: AppUserRole.ELAUT_ADMIN,
					isElaut: true,
					locationIds: ['00000000-0000-0000-0000-9999'],
				},
			});

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

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					role: AppUserRole.TENANT_ARCADE_MANAGER,
					isElaut: false,
					locationIds: ['00000000-0000-0000-0000-9999'],
				},
			});

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
			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'user@example.com',
				role: AppUserRole.TENANT_ARCADE_EMPLOYEE,
				isBlocked: true,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'user',
				locationIds: ['00000000-0000-0000-0000-000000000009'],
			});
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

		it('sshould pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'user@example.com',
				role: AppUserRole.TENANT_ARCADE_EMPLOYEE,
				isBlocked: true,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'user',
				locationIds: ['00000000-0000-0000-0000-000000000009'],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					role: AppUserRole.TENANT_ARCADE_MANAGER,
					isElaut: false,
					locationIds: ['00000000-0000-0000-0000-9999'],
				},
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.TENANT_ARCADE_MANAGER,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: ['00000000-0000-0000-0000-000000000009'],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					role: AppUserRole.TENANT_ARCADE_MANAGER,
					isElaut: false,
					locationIds: ['00000000-0000-0000-0000-9999'],
				},
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.getUserByEmail.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

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
			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				isAuthenticated: false,
			});

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(UnauthorizedError);
		});

		it('should throw an error when the tenantId of the user does not match the tenantId of the logged in user', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					tenantId: '00000000-0000-0000-0000-000000000002',
				},
			});

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000099',
					locationIds: [],
				})
			).rejects.toThrowError(TenantNotAllowedError);
		});

		it('should throw an error when the locationIds of the user does not match the locationIds of the logged in user', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);
			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(true);

			const appUserService = new AppUserService(mockAppUserRepository, {
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
			});

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: ['00000000-0000-0000-0000-000000000099'],
				})
			).rejects.toThrowError(LocationNotAllowedError);

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
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
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.createUser.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

			const result = await appUserService.createUser({
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				username: 'admin',
				tenantId: '00000000-0000-0000-0000-000000000001',
				locationIds: [],
			});

			expect(result).toEqual(user);

			expect(mockAppUserRepository.createUser).toHaveBeenCalledWith({
				id: expect.any(String),
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				username: 'admin',
				tenant_id: '00000000-0000-0000-0000-000000000001',
			});

			// TODO: test for locations
		});

		it('should throw a not found error when the user is not found', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				isBlocked: false,
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				username: 'admin',
				locationIds: [],
			});

			mockAppUserRepository.createUser.mockResolvedValue(user);
			mockAppUserRepository.getUserById.mockResolvedValue(undefined);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

			await expect(
				appUserService.createUser({
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(NotFoundError);
		});

		it('should throw an unauthorized error when a user attempts to create a user with a role above them', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				auth: {
					...authContext,
					role: AppUserRole.TENANT_ARCADE_MANAGER,
					isElaut: false,
					locationIds: [],
				},
			});

			await expect(
				appUserService.createUser({
					email: 'newuser@example.com',
					role: AppUserRole.TENANT_ADMIN,
					username: 'newuser',
					tenantId: '00000000-0000-0000-0000-000000000001',
					locationIds: [],
				})
			).rejects.toThrowError(UnauthorizedError);
		});
	});

	describe('updateUser', () => {
		it('should throw an not found error when the user is not found', async () => {
			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue(undefined);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				})
			).rejects.toThrowError(NotFoundError);
		});

		it('should throw an error when the context is not authenticated', async () => {
			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				isAuthenticated: false,
				auth: undefined,
			});

			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.ELAUT_ADMIN,
				username: 'admin',
				locationIds: [],
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				})
			).rejects.toThrowError(UnauthorizedError);
		});

		it('should throw an unauthorized error when a user attempts to update a user with a role above them', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValueOnce(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValueOnce(
				false
			);

			vi.spyOn(
				AuthorizationService,
				'isAllowedToEditUserRole'
			).mockReturnValueOnce(false);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
				isAuthenticated: true,
				auth: {
					...authContext,
					role: AppUserRole.TENANT_ARCADE_MANAGER,
					isElaut: false,
					locationIds: [],
				},
			});

			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				role: AppUserRole.TENANT_ADMIN,
				username: 'admin',
				locationIds: [],
			});

			await expect(
				appUserService.updateUser('00000000-0000-0000-0000-000000000009', {
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
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

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				role: AppUserRole.ELAUT_ADMIN,
				username: 'admin',
				locationIds: [],
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				isBlocked: false,
			});

			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				}
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
				},
				undefined,
				undefined
			);
		});

		it('should pass the tenantId from the context to the repository if the logged in user is tenant bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(false);

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				role: AppUserRole.ELAUT_ADMIN,
				username: 'admin',
				locationIds: [],
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				isBlocked: false,
			});

			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				}
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserByIdForUpdate).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				context.auth.tenantId,
				undefined
			);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
				},
				context.auth.tenantId,
				undefined
			);
		});

		it('should pass the locationIds from the context to the repository if the logged in user is location bound', async () => {
			vi.spyOn(AuthorizationService, 'isTenantBound').mockReturnValue(true);

			vi.spyOn(AuthorizationService, 'isLocationBound').mockReturnValue(true);

			const user = AppUser.fromJSON({
				id: '00000000-0000-0000-0000-000000000009',
				email: 'admin@example.com',
				tenant: {
					id: '00000000-0000-0000-0000-000000000001',
					name: 'Test Tenant',
				},
				role: AppUserRole.ELAUT_ADMIN,
				username: 'admin',
				locationIds: [],
				lastSeen: '2021-01-01T00:00:00.000Z',
				lastLogin: '2021-01-01T00:00:00.000Z',
				isBlocked: false,
			});

			mockAppUserRepository.getUserByIdForUpdate.mockResolvedValue(user);
			mockAppUserRepository.updateUser.mockResolvedValue(user);

			const appUserService = new AppUserService(mockAppUserRepository, {
				...context,
			});

			const result = await appUserService.updateUser(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
					locationIds: [],
				}
			);

			expect(result).toEqual(user);

			expect(mockAppUserRepository.getUserByIdForUpdate).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				context.auth.tenantId,
				context.auth.locationIds
			);

			expect(mockAppUserRepository.updateUser).toHaveBeenCalledWith(
				'00000000-0000-0000-0000-000000000009',
				{
					email: 'admin@example.com',
					role: AppUserRole.ELAUT_ADMIN,
					username: 'admin',
				},
				context.auth.tenantId,
				context.auth.locationIds
			);
		});
	});
});
