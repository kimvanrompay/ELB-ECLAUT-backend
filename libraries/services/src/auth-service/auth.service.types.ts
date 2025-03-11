import type {AppUser} from '@lib/models/app-user';

interface IAuthService {
	authenticateJwtAccessToken(token: string): Promise<{
		userId: string;
		email: string;
		role: string;
	}>;

	refreshJwtTokens(refreshToken: string): Promise<{
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
	}>;

	getJwtTokens(email: string): Promise<{
		user: AppUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
	}>;
}

export type {IAuthService};
