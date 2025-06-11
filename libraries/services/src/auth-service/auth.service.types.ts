import {AppSecurityGroup, type AppUser} from '@lib/models/app-user';

type UserTokenPayload = {
	userId: string;
	email: string;
	securityGroup: AppSecurityGroup;
	tenantId: string;
	locationIds: string[];
};

type ClientTokenPayload = {
	clientId: string;
	securityGroup: AppSecurityGroup;
	tenantId: string;
	locationIds: string[];
};

interface IAuthService {
	authenticateJwtAccessToken(
		token: string
	): Promise<UserTokenPayload | ClientTokenPayload>;

	refreshJwtTokens(refreshToken: string): Promise<{
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
	}>;

	getJwtTokensByEmail(email: string): Promise<{
		user: AppUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
	}>;
}

export type {IAuthService, UserTokenPayload, ClientTokenPayload};
