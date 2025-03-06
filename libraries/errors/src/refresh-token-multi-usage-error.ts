import type {RefreshToken} from '@lib/models/refresh-token';

class RefreshTokenMultiUsageError extends Error {
	token: RefreshToken;

	constructor(refreshToken: RefreshToken) {
		super('Refresh token has been used before');
		this.name = 'RefreshTokenMultiUsageError';
		this.token = refreshToken;
	}
}

export {RefreshTokenMultiUsageError};
