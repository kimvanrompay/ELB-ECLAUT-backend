import type {RefreshToken} from '@lib/models/refresh-token';

interface IRefreshTokenRepository {
	getRefreshTokenById(id: string): Promise<RefreshToken | undefined>;

	deleteRefreshTokenByToken(id: string): Promise<void>;

	updateRefreshTokenUsageCount(id: string): Promise<void>;

	invalidateAllRefreshTokensForUser(userId: string): Promise<void>;

	createRefreshToken(refreshToken: RefreshToken): Promise<void>;
}

export type {IRefreshTokenRepository};
