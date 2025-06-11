import {compare, hash} from 'bcrypt';
import dayjs from 'dayjs';

import {
	NotFoundError,
	RefreshTokenMultiUsageError,
	UnauthorizedError,
} from '@lib/errors';
import {AppSecurityGroup} from '@lib/models/app-user';
import type {IRefreshTokenRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import type {IAppUserService} from '../app-user-service/app-user.service.types';
import type {IClientService} from '../client-service/client.service.types';
import {JwtAuthService} from '../jwt-service/jwt.service';
import type {IJwtService} from '../jwt-service/jwt.service.types';
import type {AppContext, ITenantLocationService} from '../types';
import type {
	ClientTokenPayload,
	IAuthService,
	UserTokenPayload,
} from './auth.service.types';

const ACCESS_TOKEN_EXPIRATION_MINUTES = 15;
const REFRESH_TOKEN_EXPIRATION_DAYS = 31;

class AuthService implements IAuthService {
	private appUserService: IAppUserService;
	private tenantLocationService: ITenantLocationService;
	private clientService: IClientService;
	private jwtService: IJwtService;
	private logger: PinoLogger;

	constructor(
		jwtSeed: string,
		refreshTokenRepository: IRefreshTokenRepository,
		appUserService: IAppUserService,
		clientService: IClientService,
		tenantLocationService: ITenantLocationService,
		appContext: AppContext
	) {
		this.appUserService = appUserService;
		this.tenantLocationService = tenantLocationService;
		this.clientService = clientService;

		this.jwtService = new JwtAuthService(refreshTokenRepository, {
			secretSeed: jwtSeed,
			refreshTokenExpiration: '7d',
			accessTokenExpiration: '15min',
			issuer: 'elaut',
			audience: 'eclaut-api',
		});

		this.logger = appContext.logger.getChildLogger(
			{
				name: 'auth-service',
			},
			{}
		);
	}

	async authenticateJwtAccessToken(token: string) {
		try {
			return await this.jwtService.authenticate<
				| {
						userId: string;
						email: string;
						securityGroup: AppSecurityGroup;
						tenantId: string;
						locationIds: string[];
				  }
				| {
						clientId: string;
						securityGroup: AppSecurityGroup;
						tenantId: string;
						locationIds: string[];
				  }
			>(token);
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedError('Invalid token');
		}
	}

	private async refreshUserJwtTokens(
		token: Awaited<
			ReturnType<
				typeof JwtAuthService.prototype.authenticateRefreshToken<{
					id: string;
					userId: string;
					email: string;
					securityGroup: string;
					tenantId: string;
					locationIds: string[];
				}>
			>
		>
	) {
		const {dbToken, verifiedToken} = token;

		if (dbToken.usageCount > 0) {
			try {
				await this.appUserService.blockUser(dbToken.userId!);
				await this.jwtService.invalidateAllRefreshTokensForUser(
					dbToken.userId!
				);
				// TODO: notify user and/or tenant admin that the user is possibly compromised.
			} catch {
				// Do nothing
			}
			throw new RefreshTokenMultiUsageError(dbToken);
		}

		await this.jwtService.updateRefreshTokenUsageCount(dbToken.id);

		return this.getJwtTokensByEmail(verifiedToken.email);
	}

	private async refreshClientJwtTokens(
		token: Awaited<
			ReturnType<
				typeof JwtAuthService.prototype.authenticateRefreshToken<{
					id: string;
					clientId: string;
					securityGroup: string;
					tenantId: string;
					locationIds: string[];
				}>
			>
		>
	) {
		const {dbToken, verifiedToken} = token;

		if (dbToken.usageCount > 0) {
			try {
				await this.clientService.blockClient(dbToken.clientId!);
				await this.jwtService.invalidateAllRefreshTokensForClient(
					dbToken.clientId!
				);
			} catch {
				// Do nothing
			}
			throw new RefreshTokenMultiUsageError(dbToken);
		}
		await this.jwtService.updateRefreshTokenUsageCount(dbToken.id);
		return this.getJwtTokensByClientId(verifiedToken.clientId);
	}

	async refreshJwtTokens(refreshToken: string) {
		let parsedRefreshToken: Awaited<
			ReturnType<
				typeof JwtAuthService.prototype.authenticateRefreshToken<
					| {
							id: string;
							userId: string;
							email: string;
							securityGroup: string;
							tenantId: string;
							locationIds: string[];
					  }
					| {
							id: string;
							clientId: string;
							securityGroup: string;
							tenantId: string;
							locationIds: string[];
					  }
				>
			>
		>;

		try {
			parsedRefreshToken =
				await this.jwtService.authenticateRefreshToken(refreshToken);
		} catch {
			throw new UnauthorizedError('Invalid refresh token');
		}

		if (parsedRefreshToken.dbToken.userId) {
			return this.refreshUserJwtTokens(parsedRefreshToken as any);
		}

		// Refresh tokens don't actually exist for clients, since they are redundant in Client Credentials flow,
		// we handle them just in case we change the implementation in the future
		if (parsedRefreshToken.dbToken.clientId) {
			return this.refreshClientJwtTokens(parsedRefreshToken as any);
		}

		throw new UnauthorizedError('Invalid refresh token');
	}

	async getJwtTokensByEmail(email: string) {
		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		if (user.isBlocked) {
			throw new UnauthorizedError('User is blocked');
		}

		try {
			const locations =
				await this.tenantLocationService.findTenantLocationsByUserId(user.id);

			const now = dayjs();
			const newTokens = await this.jwtService.createTokens({
				userId: user.id,
				email: user.email,
				securityGroup: user.securityGroup,
				tenantId: user.tenant.id,
				locationIds: locations.map((l) => l.id),
			});

			return {
				user,
				accessToken: newTokens.accessToken,
				refreshToken: newTokens.refreshToken,
				accessTokenExpiration: now
					.add(ACCESS_TOKEN_EXPIRATION_MINUTES, 'minute')
					.toDate(),
				refreshTokenExpiration: now
					.add(REFRESH_TOKEN_EXPIRATION_DAYS, 'day')
					.toDate(),
			};
		} catch (e) {
			this.logger.error(e.message);
			throw new UnauthorizedError('Failed to create new tokens');
		}
	}

	async getJwtTokensByClientId(clientId: string) {
		const client = await this.clientService.getClientById(clientId);

		if (!client) {
			throw new NotFoundError('Client not found');
		}

		if (client.isBlocked) {
			throw new UnauthorizedError('Client is blocked');
		}

		try {
			const locations =
				await this.tenantLocationService.findTenantLocationsByClientId(
					client.id
				);

			const now = dayjs();
			const newTokens = await this.jwtService.createTokens({
				clientId: client.id,
				securityGroup: client.securityGroup,
				tenantId: client.tenantId,
				locationIds: locations.map((l) => l.id),
			});

			return {
				client,
				accessToken: newTokens.accessToken,
				refreshToken: newTokens.refreshToken,
				accessTokenExpiration: now
					.add(ACCESS_TOKEN_EXPIRATION_MINUTES, 'minute')
					.toDate(),
				refreshTokenExpiration: now
					.add(REFRESH_TOKEN_EXPIRATION_DAYS, 'day')
					.toDate(),
			};
		} catch (e) {
			this.logger.error(e.message);
			throw new UnauthorizedError('Failed to create new tokens');
		}
	}

	async verifyClientSecret(
		clientId: string,
		clientSecret: string
	): Promise<boolean> {
		const client = await this.clientService.getClientById(clientId);

		if (!client) {
			this.logger.debug(`Client with ID ${clientId} not found`);
			throw new UnauthorizedError(
				'Either client not found or invalid credentials'
			);
		}

		if (client.isBlocked) {
			this.logger.debug(`Client with ID ${clientId} is blocked`);
			throw new UnauthorizedError(
				'Either client not found or invalid credentials'
			);
		}

		return compare(clientSecret, client.secret);
	}

	async logoutOnAllDevices(userId: string) {
		await this.jwtService.invalidateAllRefreshTokensForUser(userId);
	}

	async logoutOnDevice(refreshToken: string) {
		try {
			await this.jwtService.invalidateRefreshToken(refreshToken);
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedError('Invalid refresh token');
		}
	}
}

export {AuthService};
export type {IAuthService, UserTokenPayload, ClientTokenPayload};
