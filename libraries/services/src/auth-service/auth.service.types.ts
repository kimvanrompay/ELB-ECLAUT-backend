import {AppSecurityGroup} from '@lib/models/app-user';

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
	}>;

	logoutOnAllDevices(userId: string): Promise<void>;

	logoutOnDevice(refreshToken: string): Promise<void>;
}

export type {IAuthService, UserTokenPayload, ClientTokenPayload};
