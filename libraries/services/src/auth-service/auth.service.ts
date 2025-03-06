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
import type {IAuthService} from './auth.service.types';

const LOGGER = new PinoLogger(
	{
		name: 'auth-service',
	},
	{}
);

class AuthService implements IAuthService {
	private appUserService: IAppUserService;
	private jwtService: IJwtService;

	constructor(
		jwtSeed: string,
		refreshTokenRepository: IRefreshTokenRepository,
		appUserService: IAppUserService
	) {
		this.appUserService = appUserService;

		this.jwtService = new JwtAuthService(refreshTokenRepository, {
			secretSeed: jwtSeed,
			refreshTokenExpiration: '7d',
			accessTokenExpiration: '15min',
			issuer: 'elaut',
			audience: 'eclaut-api',
		});
	}

	async authenticateJwtAccessToken(token: string) {
		console.log('Token', token);
		try {
			return await this.jwtService.authenticate<{
				userId: string;
				email: string;
				role: string;
			}>(token);
		} catch (e) {
			LOGGER.error(e);
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
			await this.appUserService.blockUser(dbToken.userId);
			await this.jwtService.invalidateAllRefreshTokensForUser(dbToken.userId);
			// TODO: notify user and/or tenant admin that the user is possibly compromised.

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
			});

			return {
				accessToken: newTokens.accessToken,
				refreshToken: newTokens.refreshToken,
				accessTokenExpiration: now.add(15, 'minute').toDate(),
				refreshTokenExpiration: now.add(7, 'day').toDate(),
			};
		} catch {
			throw new UnauthorizedError('Failed to create new tokens');
		}
	}
}

export {AuthService};
