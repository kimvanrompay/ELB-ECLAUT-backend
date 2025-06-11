import type {Knex} from 'knex';

import {DatabaseRetrieveError, DatabaseUpdateError} from '@lib/errors';
import {PinoLogger} from '@lib/utils';

import {RefreshTokenRepository} from '../../src/refresh-token/refresh-token.repository';
import {runSQLFiles} from '../test-utils';

const db = global.knex;

const context = {
	requestId: 'test-request-id',
	logger: new PinoLogger(
		{
			requestId: 'test-request-id',
		},
		{}
	),
};

beforeEach(async () => {
	await runSQLFiles(db, [
		'./test/test-data/tenant.test-data.sql',
		'./test/test-data/app-user.test-data.sql',
		'./test/test-data/refresh-token.test-data.sql',
	]);
});

afterEach(async () => {
	await runSQLFiles(db, ['./test/test-data/reset.sql']);

	vi.resetAllMocks();
});

// TODO: test for errors

describe('RefreshTokenRepository', () => {
	describe('getRefreshTokenByToken', () => {
		it('should return a RefreshToken object', async () => {
			const repo = new RefreshTokenRepository(db, context);
			const refreshToken = await repo.getRefreshTokenById(
				'test-jwt-token-string'
			);

			expect(refreshToken).toBeDefined();
			expect(refreshToken?.id).toBe('test-jwt-token-string');
		});

		it('should return undefined if no RefreshToken is found', async () => {
			const repo = new RefreshTokenRepository(db, context);
			const refreshToken = await repo.getRefreshTokenById(
				'invalid-jwt-token-string'
			);

			expect(refreshToken).toBeUndefined();
		});

		it('should throw an error if the database query fails', async () => {
			const repo = new RefreshTokenRepository({} as unknown as Knex, context);

			await expect(
				repo.getRefreshTokenById('test-jwt-token-string')
			).rejects.toThrowError(DatabaseRetrieveError);
		});
	});

	describe('deleteRefreshTokenByToken', () => {
		it('should delete a RefreshToken', async () => {
			const repo = new RefreshTokenRepository(db, context);
			const refreshToken = await repo.getRefreshTokenById(
				'test-jwt-token-string'
			);

			expect(refreshToken).toBeDefined();

			await repo.deleteRefreshTokenByToken('test-jwt-token-string');

			const deletedRefreshToken = await repo.getRefreshTokenById(
				'test-jwt-token-string'
			);

			expect(deletedRefreshToken).toBeUndefined();
		});
	});

	describe('updateRefreshTokenUsageCount', () => {
		it('should increment the usage count of a RefreshToken', async () => {
			const repo = new RefreshTokenRepository(db, context);
			const refreshToken = await repo.getRefreshTokenById(
				'test-jwt-token-string'
			);

			expect(refreshToken).toBeDefined();
			expect(refreshToken?.usageCount).toBe(0);

			await repo.updateRefreshTokenUsageCount('test-jwt-token-string');

			const updatedRefreshToken = await repo.getRefreshTokenById(
				'test-jwt-token-string'
			);

			expect(updatedRefreshToken).toBeDefined();
			expect(updatedRefreshToken?.usageCount).toBe(1);
		});

		it('should throw an error if token is not found', async () => {
			const repo = new RefreshTokenRepository(db, context);

			await expect(
				repo.updateRefreshTokenUsageCount('invalid-jwt-token-string')
			).rejects.toThrowError(DatabaseUpdateError);
		});

		it('should throw an error if the database query fails', async () => {
			const repo = new RefreshTokenRepository({} as unknown as Knex, context);

			await expect(
				repo.updateRefreshTokenUsageCount('test-jwt-token-string')
			).rejects.toThrowError(DatabaseUpdateError);
		});
	});

	describe('createRefreshToken', () => {
		it('should create a new RefreshToken', async () => {
			const repo = new RefreshTokenRepository(db, context);
			const refreshToken = await repo.getRefreshTokenById(
				'new-jwt-token-string'
			);

			expect(refreshToken).toBeUndefined();

			await repo.createRefreshToken({
				id: 'new-jwt-token-string',
				userId: '00000000-0000-0000-0000-000000000001',
				usageCount: 0,
				createdAt: new Date(),
				isUserToken: () => true,
				isClientToken: () => false,
				clientId: undefined,
			});

			const newRefreshToken = await repo.getRefreshTokenById(
				'new-jwt-token-string'
			);

			expect(newRefreshToken).toBeDefined();
			expect(newRefreshToken?.id).toBe('new-jwt-token-string');
		});
	});

	describe('invalidateAllRefreshTokensForUser', () => {
		it('should invalidate all RefreshTokens for a user', async () => {
			const repo = new RefreshTokenRepository(db, context);

			await repo.createRefreshToken({
				id: 'new-jwt-token-string',
				userId: '00000000-0000-0000-0000-000000000001',
				usageCount: 0,
				createdAt: new Date(),
				isUserToken: () => true,
				isClientToken: () => false,
				clientId: undefined,
			});

			await repo.createRefreshToken({
				id: 'new-jwt-token-string-2',
				userId: '00000000-0000-0000-0000-000000000001',
				usageCount: 0,
				createdAt: new Date(),
				isUserToken: () => true,
				isClientToken: () => false,
				clientId: undefined,
			});

			await repo.createRefreshToken({
				id: 'new-jwt-token-string-3',
				userId: '00000000-0000-0000-0000-000000000002',
				usageCount: 0,
				createdAt: new Date(),
				isUserToken: () => true,
				isClientToken: () => false,
				clientId: undefined,
			});

			const refreshToken = await repo.getRefreshTokenById(
				'new-jwt-token-string'
			);
			const refreshToken2 = await repo.getRefreshTokenById(
				'new-jwt-token-string-2'
			);
			const refreshToken3 = await repo.getRefreshTokenById(
				'new-jwt-token-string-3'
			);

			expect(refreshToken).toBeDefined();
			expect(refreshToken2).toBeDefined();
			expect(refreshToken3).toBeDefined();

			await repo.invalidateAllRefreshTokensForUser(
				'00000000-0000-0000-0000-000000000001'
			);

			const deletedRefreshToken = await repo.getRefreshTokenById(
				'new-jwt-token-string'
			);
			const deletedRefreshToken2 = await repo.getRefreshTokenById(
				'new-jwt-token-string-2'
			);
			const refreshToken3AfterDelete = await repo.getRefreshTokenById(
				'new-jwt-token-string-3'
			);

			expect(deletedRefreshToken).toBeDefined();
			expect(deletedRefreshToken2).toBeDefined();
			expect(refreshToken3AfterDelete).toBeDefined();

			expect(deletedRefreshToken?.usageCount).toBe(1);
			expect(deletedRefreshToken2?.usageCount).toBe(1);
			expect(refreshToken3AfterDelete?.usageCount).toBe(0);
		});
	});
});
