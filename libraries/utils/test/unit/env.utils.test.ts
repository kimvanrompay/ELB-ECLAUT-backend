import {describe} from 'vitest';

import {
	getEnvVariable,
	isDevelopmentBuild,
	isProductionBuild,
} from '../../src/env.utils';

describe('Env Utils', () => {
	describe('getEnvVariable', () => {
		it('should return the value of the environment variable', () => {
			process.env.MY_VAR = 'hello';
			const result = getEnvVariable('MY_VAR', 'default');

			expect(result).toBe('hello');
		});

		it('should return the default value if the environment variable is not set', () => {
			delete process.env.MY_VAR;
			const result = getEnvVariable('MY_VAR', 'default');

			expect(result).toBe('default');
		});
	});

	describe('isProductionBuild', () => {
		it('should return true if the NODE_ENV is set to production', () => {
			process.env.NODE_ENV = 'production';
			const result = isProductionBuild();

			expect(result).toBe(true);
		});

		it('should return false if the NODE_ENV is not set to production', () => {
			process.env.NODE_ENV = 'development';
			const result = isProductionBuild();

			expect(result).toBe(false);
		});
	});

	describe('isDevelopmentBuild', () => {
		it('should return true if the NODE_ENV is set to development', () => {
			process.env.NODE_ENV = 'development';
			const result = isDevelopmentBuild();

			expect(result).toBe(true);
		});

		it('should return false if the NODE_ENV is not set to development', () => {
			process.env.NODE_ENV = 'production';
			const result = isDevelopmentBuild();

			expect(result).toBe(false);
		});
	});
});
