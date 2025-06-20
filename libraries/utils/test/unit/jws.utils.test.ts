import {generateJwtToken, verifyJwtToken} from '../../src/jwt.utils';

describe('JWS Utils', () => {
	describe('generateJwtToken', () => {
		it('should generate a JWT token', async () => {
			const data = {name: 'John Doe'};
			const options = {
				issuer: 'test',
				audience: 'test',
				secretKey: new Uint8Array(32).fill(0),
				expiresIn: '1h',
			};

			const token = await generateJwtToken(data, options);

			expect(token).toBeDefined();
			const regex = /^(?:[\w-]*\.){2}[\w-]*$/;

			expect(regex.test(token)).toBe(true);
		});
	});

	describe('verifyJwtToken', () => {
		it('should verify a JWT token', async () => {
			const data = {name: 'John Doe'};
			const options = {
				issuer: 'test',
				audience: 'test',
				secretKey: new Uint8Array(32).fill(0),
				expiresIn: '1h',
			};

			const token = await generateJwtToken(data, options);
			const payload = await verifyJwtToken(
				token,
				options.secretKey,
				options.issuer,
				options.audience
			);

			expect(payload).toEqual({
				aud: 'test',
				exp: expect.any(Number),
				iat: expect.any(Number),
				iss: 'test',
				name: 'John Doe',
			});
		});
	});
});
