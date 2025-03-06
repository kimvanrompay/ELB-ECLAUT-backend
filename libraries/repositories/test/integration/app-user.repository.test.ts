import type {Knex} from 'knex';
import {describe, expect} from 'vitest';

import {
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import {AppUser, AppUserRole} from '@lib/models/app-user';

import {AppUserRepository} from '../../src/app-user/app-user.repository';
import {runSQLFiles} from '../test-utils';

const db = global.knex;

beforeEach(async () => {
	await runSQLFiles(db, [
		'./test/test-data/tenant.test-data.sql',
		'./test/test-data/app-user.test-data.sql',
	]);
});

afterEach(async () => {
	await runSQLFiles(db, ['./test/test-data/reset.sql']);

	vi.resetAllMocks();
});

const ADMIN_TEST_USER = AppUser.fromJSON({
	email: 'admin@example.com',
	id: '00000000-0000-0000-0000-000000000001',
	isBlocked: false,
	lastLogin: undefined,
	lastSeen: undefined,
	role: AppUserRole.ELAUT_ADMIN,
	tenant: {
		id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
		name: 'Elaut Group',
	},
	username: 'admin',
});

const DEVELOPER_TEST_USER = AppUser.fromJSON({
	email: 'developer@example.com',
	id: '00000000-0000-0000-0000-000000000002',
	isBlocked: false,
	lastLogin: undefined,
	lastSeen: undefined,
	role: AppUserRole.ELAUT_DEVELOPER,
	tenant: {
		id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
		name: 'Elaut Group',
	},
	username: 'developer',
});

describe('AppUserRepository', () => {
	describe('findUsersByFilters', () => {
		it('should return an array of AppUser objects', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters();

			expect(users).toBeDefined();
			expect(users.length).toBeGreaterThan(0);

			const admin = users.find((user) => user.id === ADMIN_TEST_USER.id);

			expect(admin).toBeDefined();
			expect(admin instanceof AppUser).toBe(true);
			expect(admin?.toJSON()).toEqual(ADMIN_TEST_USER);

			const developer = users.find(
				(user) => user.id === '00000000-0000-0000-0000-000000000002'
			);

			expect(developer).toBeDefined();
			expect(developer instanceof AppUser).toBe(true);
			expect(developer?.toJSON()).toEqual(DEVELOPER_TEST_USER);
		});

		it('should return an empty array if no users are found', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				where: [
					{
						type: 'eq',
						columnName: 'email',
						value: 'yuijko',
					},
				],
			});

			expect(users).toBeDefined();
			expect(users.length).toBe(0);
		});

		it('should be able to apply EQUALS filters', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				where: [
					{
						type: 'eq',
						columnName: 'email',
						value: 'admin@example.com',
					},
					{
						type: 'eq',
						columnName: 'role',
						value: AppUserRole.ELAUT_ADMIN,
					},
				],
			});

			expect(users).toBeDefined();
			expect(users.length).toBe(1);
			expect(users[0] instanceof AppUser).toBe(true);
		});

		it('should be able to apply NOT EQUALS filters', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				where: [
					{
						type: 'neq',
						columnName: 'email',
						value: ADMIN_TEST_USER.email,
					},
				],
			});

			expect(users).toBeDefined();
			expect(users.length).toBeGreaterThan(0);

			const admin = users.find((user) => user.email === ADMIN_TEST_USER.email);

			expect(admin).toBeUndefined();
		});

		it('should be able to apply LIKE filters', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				where: [
					{
						type: 'like',
						columnName: 'username',
						value: 'ad',
					},
				],
			});

			expect(users).toBeDefined();
			expect(users.length).toBe(1);

			expect(users[0]).toBeDefined();
			expect(users[0] instanceof AppUser).toBe(true);
			expect(users[0]?.username).toBe('admin');

			const usersWithSingleWildcard = await repo.findUsersByFilters({
				where: [
					{
						type: 'like',
						columnName: 'username',
						value: 'e?e?o',
					},
				],
			});

			expect(usersWithSingleWildcard).toBeDefined();
			expect(usersWithSingleWildcard.length).toBe(1);
			expect(usersWithSingleWildcard[0] instanceof AppUser).toBe(true);
			expect(usersWithSingleWildcard[0]?.username).toBe('developer');

			const usersWithMultipleWildcard = await repo.findUsersByFilters({
				where: [
					{
						type: 'like',
						columnName: 'username',
						value: 'dev*per',
					},
				],
			});

			expect(usersWithMultipleWildcard).toBeDefined();
			expect(usersWithMultipleWildcard.length).toBe(1);
			expect(usersWithMultipleWildcard[0] instanceof AppUser).toBe(true);
			expect(usersWithMultipleWildcard[0]?.username).toBe('developer');
		});

		it('should be able to apply NOT LIKE filters', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				where: [
					{
						type: 'notLike',
						columnName: 'username',
						value: 'ad',
					},
				],
			});

			expect(users).toBeDefined();
			expect(users.length).toBe(1);

			expect(users[0]).toBeDefined();
			expect(users[0] instanceof AppUser).toBe(true);
			expect(users[0]?.username).toBe('developer');

			const usersWithSingleWildcard = await repo.findUsersByFilters({
				where: [
					{
						type: 'notLike',
						columnName: 'username',
						value: 'e?e?o',
					},
				],
			});

			expect(usersWithSingleWildcard).toBeDefined();
			expect(usersWithSingleWildcard.length).toBe(1);
			expect(usersWithSingleWildcard[0] instanceof AppUser).toBe(true);
			expect(usersWithSingleWildcard[0]?.username).toBe('admin');

			const usersWithMultipleWildcard = await repo.findUsersByFilters({
				where: [
					{
						type: 'notLike',
						columnName: 'username',
						value: 'dev*per',
					},
				],
			});

			expect(usersWithMultipleWildcard).toBeDefined();
			expect(usersWithMultipleWildcard.length).toBe(1);
			expect(usersWithMultipleWildcard[0] instanceof AppUser).toBe(true);
			expect(usersWithMultipleWildcard[0]?.username).toBe('admin');
		});

		it('should be able to limit the number of results returned', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				limit: 1,
				offset: 0,
			});

			const users2 = await repo.findUsersByFilters({
				limit: 1,
				offset: 1,
			});

			expect(users).toBeDefined();

			expect(users.length).toBe(1);
			expect(users[0] instanceof AppUser).toBe(true);

			expect(users2).toBeDefined();
			expect(users2.length).toBe(1);
			expect(users2[0] instanceof AppUser).toBe(true);

			expect(users[0]?.id).not.toBe(users2[0]?.id);
		});

		it('should be able to order the results returned', async () => {
			const repo = new AppUserRepository(db);

			const users = await repo.findUsersByFilters({
				orderBy: [
					{
						columnName: 'email',
						value: 'asc',
					},
				],
			});

			const users2 = await repo.findUsersByFilters({
				orderBy: [
					{
						columnName: 'email',
						value: 'desc',
					},
				],
			});

			expect(users).toBeDefined();
			expect(users.length).toBeGreaterThan(1);

			expect(users2).toBeDefined();
			expect(users2.length).toBeGreaterThan(1);

			expect(users[0]!.email).not.toBe(users2[0]!.email);

			const array = [users2[0]!.email, users[0]!.email].sort();

			expect(users[0]!.email).toBe(array[0]);
			expect(users2[0]!.email).toBe(array[1]);
		});
	});

	describe('getUserById', () => {
		it('should return an AppUser object', async () => {
			const repo = new AppUserRepository(db);

			const user = await repo.getUserById(ADMIN_TEST_USER.id);

			expect(user).toBeDefined();
			expect(user instanceof AppUser).toBe(true);
			expect(user?.toJSON()).toEqual(ADMIN_TEST_USER);
		});

		it('should return undefined if no user is found', async () => {
			const repo = new AppUserRepository(db);

			const user = await repo.getUserById(
				'00000000-0000-0000-0000-000000000003'
			);

			expect(user).toBeUndefined();
		});

		it('should throw a DatabaseRetrieveError if an error occurs', async () => {
			const repo = new AppUserRepository({} as unknown as Knex);

			await expect(repo.getUserById(ADMIN_TEST_USER.id)).rejects.toThrowError(
				DatabaseRetrieveError
			);
		});
	});

	describe('getUserByEmail', () => {
		it('should return an AppUser object', async () => {
			const repo = new AppUserRepository(db);

			const user = await repo.getUserByEmail(ADMIN_TEST_USER.email);

			expect(user).toBeDefined();
			expect(user instanceof AppUser).toBe(true);
			expect(user?.toJSON()).toEqual(ADMIN_TEST_USER);
		});

		it('should return undefined if no user is found', async () => {
			const repo = new AppUserRepository(db);

			const user = await repo.getUserByEmail('notfound@example.com');

			expect(user).toBeUndefined();
		});

		it('should throw a DatabaseRetrieveError if an error occurs', async () => {
			const repo = new AppUserRepository({} as unknown as Knex);

			await expect(
				repo.getUserByEmail(ADMIN_TEST_USER.email)
			).rejects.toThrowError(DatabaseRetrieveError);
		});
	});

	describe('updateUser', () => {
		it('should update the user and return the updated user', async () => {
			const repo = new AppUserRepository(db);

			const updatedUser = await repo.updateUser(ADMIN_TEST_USER.id, {
				is_blocked: true,
			});

			expect(updatedUser).toBeDefined();
			expect(updatedUser instanceof AppUser).toBe(true);
			expect(updatedUser?.isBlocked).toBe(true);
		});

		it('should throw an error if the user is not found', async () => {
			const repo = new AppUserRepository(db);

			await expect(
				repo.updateUser('00000000-0000-0000-0000-000000000003', {
					is_blocked: true,
				})
			).rejects.toThrowError(DatabaseUpdateError);
		});
	});

	describe('createUser', () => {
		it('should create a new user and return the created user', async () => {
			const repo = new AppUserRepository(db);

			const newUser = await repo.createUser({
				email: 'new@example.com',
				username: 'new',
				id: '00000000-0000-0000-0000-000000000003',
				role: AppUserRole.ELAUT_ADMIN,
				tenant_id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
			});

			expect(newUser).toBeDefined();
			expect(newUser instanceof AppUser).toBe(true);

			const createdUser = await repo.getUserById(
				'00000000-0000-0000-0000-000000000003'
			);

			expect(createdUser).toBeDefined();
			expect(createdUser instanceof AppUser).toBe(true);

			expect(createdUser?.toJSON()).toEqual(newUser?.toJSON());
		});

		it('should throw an error if the user cannot be created', async () => {
			const repo = new AppUserRepository({} as unknown as Knex);

			await expect(
				repo.createUser({
					email: 'new@example.com',
					username: 'new',
					id: '00000000-0000-0000-0000-000000000003',
					role: AppUserRole.ELAUT_ADMIN,
					tenant_id: '191e84db-b52f-46f9-bd53-b0b68241b0d2',
				})
			).rejects.toThrowError(DatabaseInsertError);
		});
	});
});
