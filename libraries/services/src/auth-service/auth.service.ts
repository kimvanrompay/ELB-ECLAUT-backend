import {UnauthorizedError} from '@lib/errors';
import type {IRefreshTokenRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import type {IAppUserService} from '../app-user-service/app-user.service.types';
import type {IClientService} from '../client-service/client.service.types';
import {JwtAuthService} from '../jwt-service/jwt.service';
import type {IJwtService} from '../jwt-service/jwt.service.types';
import type {IPasswordResetTokenService} from '../password-reset-token-service/password-reset-token.service.types';
import type {
	AppContext,
	ILoginVerificationCodeService,
	ITenantLocationService,
} from '../types';
import {
	ACCESS_TOKEN_EXPIRATION_MINUTES,
	REFRESH_TOKEN_EXPIRATION_DAYS,
} from './auth.service.constants';
import type {
	ClientTokenPayload,
	IAuthService,
	UserTokenPayload,
} from './auth.service.types';
import {ClientAuthService} from './client-auth.service';
import {UserAuthService} from './user-auth.service';

class AuthService implements IAuthService {
	private jwtService: IJwtService;
	private logger: PinoLogger;
	public clientAuthService: ClientAuthService;
	public userAuthService: UserAuthService;

	constructor(
		jwtSeed: string,
		refreshTokenRepository: IRefreshTokenRepository,
		appUserService: IAppUserService,
		tenantLocationService: ITenantLocationService,
		loginVerificationCodeService: ILoginVerificationCodeService,
		passwordResetTokenService: IPasswordResetTokenService,
		clientService: IClientService,
		appContext: AppContext
	) {
		const jwtService = new JwtAuthService(refreshTokenRepository, {
			secretSeed: jwtSeed,
			refreshTokenExpiration: `${REFRESH_TOKEN_EXPIRATION_DAYS}d`,
			accessTokenExpiration: `${ACCESS_TOKEN_EXPIRATION_MINUTES}min`,
			issuer: 'elaut',
			audience: 'eclaut-api',
		});

		this.jwtService = jwtService;

		this.clientAuthService = new ClientAuthService(
			jwtService,
			clientService,
			tenantLocationService,
			appContext
		);

		this.userAuthService = new UserAuthService(
			jwtService,
			appUserService,
			tenantLocationService,
			loginVerificationCodeService,
			passwordResetTokenService,
			appContext
		);

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
				UserTokenPayload | ClientTokenPayload
			>(token);
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedError('Invalid token');
		}
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
			return this.userAuthService.refreshUserJwtTokens(
				parsedRefreshToken as any
			);
		}

		// Refresh tokens don't actually exist for clients, since they are redundant in Client Credentials flow,
		// we handle them just in case we change the implementation in the future
		if (parsedRefreshToken.dbToken.clientId) {
			return this.clientAuthService.refreshClientJwtTokens(
				parsedRefreshToken as any
			);
		}

		throw new UnauthorizedError('Invalid refresh token');
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
