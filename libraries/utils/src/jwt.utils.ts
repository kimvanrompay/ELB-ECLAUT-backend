import type {JWTPayload} from 'hono/dist/types/utils/jwt/types';
import {jwtVerify, SignJWT} from 'jose';

const generateJwtToken = async (
	data: Record<string, unknown>,
	options: {
		issuer: string;
		audience: string;
		secretKey: Uint8Array;
		expiresIn: string;
	}
) => {
	// Generate JWT token
	return await new SignJWT(data)
		.setProtectedHeader({alg: 'HS256'})
		.setIssuedAt()
		.setIssuer(options.issuer)
		.setAudience(options.audience)
		.setExpirationTime(options.expiresIn)
		.sign(options.secretKey);
};

const verifyJwtToken = async <Payload extends JWTPayload>(
	token: string,
	secretKey: Uint8Array,
	issuer: string,
	audience: string
) => {
	const result = await jwtVerify<Payload>(token, secretKey, {
		issuer,
		audience,
	});

	return result.payload;
};

export {generateJwtToken, verifyJwtToken};
