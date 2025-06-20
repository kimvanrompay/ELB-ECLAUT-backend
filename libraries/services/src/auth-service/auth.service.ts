import dayjs from 'dayjs';

import {
	NotFoundError,
	RefreshTokenMultiUsageError,
	UnauthorizedError,
} from '@lib/errors';
import type {IRefreshTokenRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import type {IAppUserService} from '../app-user-service/app-user.service.types';
import {JwtAuthService} from '../jwt-service/jwt.service';
import type {IJwtService} from '../jwt-service/jwt.service.types';
import type {AppContext} from '../types';
import type {IAuthService} from './auth.service.types';

class AuthService implements IAuthService {
	private appUserService: IAppUserService;
	private jwtService: IJwtService;
	private logger: PinoLogger;

	constructor(
		jwtSeed: string,
		refreshTokenRepository: IRefreshTokenRepository,
		appUserService: IAppUserService,
		appContext: AppContext
	) {
		this.appUserService = appUserService;

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
			return await this.jwtService.authenticate<{
				userId: string;
				email: string;
				role: string;
				tenantId: string;
				locationIds: string[];
			}>(token);
		} catch (e) {
			this.logger.error(e);
			throw new UnauthorizedError('Invalid token');
		}
	}

	async refreshJwtTokens(refreshToken: string) {
		let parsedRefreshToken: Awaited<
			ReturnType<
				typeof JwtAuthService.prototype.authenticateRefreshToken<{
					id: string;
					userId: string;
					email: string;
					role: string;
					tenantId: string;
					locationIds: string[];
				}>
			>
		>;

		try {
			parsedRefreshToken =
				await this.jwtService.authenticateRefreshToken(refreshToken);
		} catch {
			throw new UnauthorizedError('Invalid refresh token');
		}

		const {dbToken, verifiedToken} = parsedRefreshToken;

		if (dbToken.usageCount > 0) {
			try {
				await this.appUserService.blockUser(dbToken.userId);
				await this.jwtService.invalidateAllRefreshTokensForUser(dbToken.userId);
				// TODO: notify user and/or tenant admin that the user is possibly compromised.
			} catch {
				// Do nothing
			}
			throw new RefreshTokenMultiUsageError(dbToken);
		}

		await this.jwtService.updateRefreshTokenUsageCount(dbToken.id);

		return this.getJwtTokens(verifiedToken.email);
	}

	async getJwtTokens(email: string) {
		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		if (user.isBlocked) {
			throw new UnauthorizedError('User is blocked');
		}

		try {
			const now = dayjs();
			const newTokens = await this.jwtService.createTokens({
				userId: user.id,
				email: user.email,
				role: user.role,
				tenantId: user.tenant.id,
				locationIds: [], // TODO: get location ids for user
			});

			return {
				user,
				accessToken: newTokens.accessToken,
				refreshToken: newTokens.refreshToken,
				accessTokenExpiration: now.add(15, 'minute').toDate(),
				refreshTokenExpiration: now.add(7, 'day').toDate(),
			};
		} catch {
			throw new UnauthorizedError('Failed to create new tokens');
		}
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
