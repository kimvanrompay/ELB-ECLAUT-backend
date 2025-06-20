import {
	LoginVerificationCode,
	type LoginVerificationCodeDBType,
} from '@lib/models/login-verification-code';

import {LoginVerificationCodeRepository} from '../../src/login-verification-code/login-verification-code.repository';
import {runSQLFiles} from '../test-utils';

const db = global.knex;

beforeEach(async () => {
	await runSQLFiles(db, [
		'./test/test-data/login-verification-code.test-data.sql',
	]);
});

afterEach(async () => {
	await runSQLFiles(db, ['./test/test-data/reset.sql']);

	vi.resetAllMocks();
});

// TODO: tests for errors

describe('LoginVerificationCodeRepository', () => {
	describe('getLoginVerificationCode', () => {
		it('should return a LoginVerificationCode object', async () => {
			const loginVerificationCodeRepository =
				new LoginVerificationCodeRepository(db);

			const verificationCode =
				await loginVerificationCodeRepository.getLoginVerificationCode(
					'admin@example.com',
					'123456'
				);

			expect(verificationCode).toBeDefined();
			expect(verificationCode instanceof LoginVerificationCode).toBe(true);

			expect(verificationCode?.code).toBe('123456');
			expect(verificationCode?.email).toBe('admin@example.com');
		});
	});

	describe('createLoginVerificationCode', () => {
		it('should create a login verification code', async () => {
			const loginVerificationCodeRepository =
				new LoginVerificationCodeRepository(db);

			const verificationCode: LoginVerificationCodeDBType = {
				code: '456789',
				email: 'test@example.com',
				expires_at: new Date().toISOString(),
				created_at: new Date().toISOString(),
			};

			const result =
				await loginVerificationCodeRepository.createLoginVerificationCode(
					verificationCode
				);

			expect(result.toDBType()).toEqual(verificationCode);

			const savedVerificationCode =
				await loginVerificationCodeRepository.getLoginVerificationCode(
					verificationCode.email,
					verificationCode.code
				);

			expect(savedVerificationCode).toEqual(
				LoginVerificationCode.fromDBType(verificationCode)
			);
		});
	});

	describe('removeExpiredLoginVerificationCodes', () => {
		it('should remove expired login verification codes', async () => {
			const loginVerificationCodeRepository =
				new LoginVerificationCodeRepository(db);

			const expiredVerificationCode: LoginVerificationCodeDBType = {
				code: '456789',
				email: 'admin@example.com',
				expires_at: new Date('2020-01-01').toISOString(),
				created_at: new Date().toISOString(),
			};

			const nonExpiredVerificationCode: LoginVerificationCodeDBType = {
				code: '798032',
				email: 'admin@example.com',
				expires_at: new Date('2030-01-01').toISOString(),
				created_at: new Date().toISOString(),
			};

			await loginVerificationCodeRepository.createLoginVerificationCode(
				expiredVerificationCode
			);
			await loginVerificationCodeRepository.createLoginVerificationCode(
				nonExpiredVerificationCode
			);

			const expiredVerificationCodeFromDB =
				await loginVerificationCodeRepository.getLoginVerificationCode(
					expiredVerificationCode.email,
					expiredVerificationCode.code
				);

			const nonExpiredVerificationCodeFromDB =
				await loginVerificationCodeRepository.getLoginVerificationCode(
					nonExpiredVerificationCode.email,
					nonExpiredVerificationCode.code
				);

			expect(expiredVerificationCodeFromDB).toBeDefined();
			expect(nonExpiredVerificationCodeFromDB).toBeDefined();

			await loginVerificationCodeRepository.removeExpiredLoginVerificationCodes();

			const expiredVerificationCodeAfterRemoval =
				await loginVerificationCodeRepository.getLoginVerificationCode(
					expiredVerificationCode.email,
					expiredVerificationCode.code
				);

			const nonExpiredVerificationCodeAfterRemoval =
				await loginVerificationCodeRepository.getLoginVerificationCode(
					nonExpiredVerificationCode.email,
					nonExpiredVerificationCode.code
				);

			expect(expiredVerificationCodeAfterRemoval).toBeUndefined();
			expect(nonExpiredVerificationCodeAfterRemoval).toBeDefined();
		});
	});
});
