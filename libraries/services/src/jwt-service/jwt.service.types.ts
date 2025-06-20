import type {RefreshToken} from '@lib/models/refresh-token';

interface IJwtService {
	authenticate<Data extends {userId: string}>(jwtToken: string): Promise<Data>;

	createTokens<Data extends {userId: string}>(
		data: Data
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}>;

	getRefreshTokenById(id: string): Promise<RefreshToken | undefined>;

	createAccessToken<Data extends {userId: string}>(data: Data): Promise<string>;

	createRefreshToken<Data extends {userId: string}>(
		data: Data
	): Promise<string>;

	invalidateAllRefreshTokensForUser(userId: string): Promise<void>;

	invalidateRefreshToken(refreshToken: string): Promise<void>;

	authenticateRefreshToken<Data extends {userId: string; id: string}>(
		token: string
	): Promise<{
		dbToken: RefreshToken;
		verifiedToken: Data;
	}>;

	updateRefreshTokenUsageCount(id: string): Promise<void>;
}

export type {IJwtService};
