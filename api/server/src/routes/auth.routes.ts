import {OpenAPIHono} from '@hono/zod-openapi';
import {getCookie, setCookie} from 'hono/cookie';

import {getKnexInstance} from '@lib/db';
import {BadRequestError, UnauthorizedError} from '@lib/errors';
import {AppUserRepository} from '@lib/repositories/app-user';
import {LoginVerificationCodeRepository} from '@lib/repositories/login-verification-code';
import {RefreshTokenRepository} from '@lib/repositories/refresh-token';
import {AppUserService} from '@lib/services/app-user';
import {AuthService} from '@lib/services/auth';
import {LoginVerificationCodeService} from '@lib/services/login-verification-code';
import {defaultValidationHook} from '@lib/utils';
import {isDevelopmentBuild} from '@lib/utils/env';

import {
	authorizeCodeRoute,
	refreshTokenRoute,
	startAuthenticationWithCodeRoute,
} from './auth.openapi';

const db = await getKnexInstance();
const appUserCodeRepository = new AppUserRepository(db);
const appUserService = new AppUserService(appUserCodeRepository);
const loginVerificationCodeRepository = new LoginVerificationCodeRepository(db);
const loginVerificationCodeService = new LoginVerificationCodeService(
	appUserService,
	loginVerificationCodeRepository
);

const refreshTokenRepository = new RefreshTokenRepository(db);

const authService = new AuthService(
	'SOME_SUPER_DUPER_UNIQUE_SECRET',
	refreshTokenRepository,
	appUserService
);

const createAuthApi = () => {
	const authApp = new OpenAPIHono({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	authApp.openapi(startAuthenticationWithCodeRoute, async (ctx) => {
		const {email} = ctx.req.valid('json');

		if (!email) {
			throw new BadRequestError('Email is required');
		}

		const code =
			await loginVerificationCodeService.getNewLoginVerificationCode(email);

		return ctx.json(code.toJSON(), 200);
	});

	authApp.openapi(authorizeCodeRoute, async (ctx) => {
		const {code, email} = ctx.req.valid('json');

		try {
			const isValid =
				await loginVerificationCodeService.verifyLoginVerificationCode(
					email,
					code
				);

			if (!isValid) {
				throw new UnauthorizedError('Invalid code');
			}

			const {
				accessToken,
				accessTokenExpiration,
				refreshToken,
				refreshTokenExpiration,
			} = await authService.getJwtTokens(email);

			await loginVerificationCodeService.deleteLoginVerificationCode(
				email,
				code
			);

			setCookie(ctx, 'eclaut-access-token', accessToken, {
				secure: !isDevelopmentBuild(),
				httpOnly: true,
				expires: accessTokenExpiration,
			});

			setCookie(ctx, 'eclaut-refresh-token', refreshToken, {
				secure: !isDevelopmentBuild(),
				httpOnly: true,
				expires: refreshTokenExpiration,
			});

			return ctx.newResponse(null, 204);
		} catch {
			throw new UnauthorizedError('Invalid code');
		}
	});

	authApp.openapi(refreshTokenRoute, async (ctx) => {
		const refreshToken = getCookie(ctx, 'eclaut-refresh-token');

		if (!refreshToken) {
			throw new UnauthorizedError('No refresh token');
		}

		try {
			const {
				accessToken,
				accessTokenExpiration,
				refreshToken: newRefreshToken,
				refreshTokenExpiration: newRefreshTokenExpiration,
			} = await authService.refreshJwtTokens(refreshToken);

			setCookie(ctx, 'eclaut-access-token', accessToken, {
				secure: !isDevelopmentBuild(),
				httpOnly: true,
				expires: accessTokenExpiration,
			});

			setCookie(ctx, 'eclaut-refresh-token', newRefreshToken, {
				secure: !isDevelopmentBuild(),
				httpOnly: true,
				expires: newRefreshTokenExpiration,
			});

			return ctx.newResponse(null, 204);
		} catch {
			throw new UnauthorizedError('Invalid refresh token');
		}
	});

	return authApp;
};

export {createAuthApi};
