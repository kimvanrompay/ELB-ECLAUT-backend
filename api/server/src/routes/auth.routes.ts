import {OpenAPIHono} from '@hono/zod-openapi';
import dayjs from 'dayjs';
import {getCookie, setCookie} from 'hono/cookie';

import {BadRequestError, UnauthorizedError} from '@lib/errors';
import {AppUserRepository} from '@lib/repositories/app-user';
import {ClientRepository} from '@lib/repositories/client';
import {LoginVerificationCodeRepository} from '@lib/repositories/login-verification-code';
import {RefreshTokenRepository} from '@lib/repositories/refresh-token';
import {TenantLocationRepository} from '@lib/repositories/tenant-location';
import {AppUserService} from '@lib/services/app-user';
import {AuthService} from '@lib/services/auth';
import {ClientService} from '@lib/services/client';
import {EmailService} from '@lib/services/email';
import {LoginVerificationCodeService} from '@lib/services/login-verification-code';
import {TenantLocationService} from '@lib/services/tenant-location';
import type {AppContext} from '@lib/services/types';
import {defaultValidationHook} from '@lib/utils';
import {isDevelopmentBuild} from '@lib/utils/env';

import {db} from '../database';
import type {Environment} from '../types';
import {
	authorizeCodeRoute,
	logoutAllDevicesRoute,
	logoutRoute,
	refreshTokenRoute,
	startAuthenticationWithCodeRoute,
	startClientAuthenticationWithSecretRoute,
} from './auth.openapi';

const createServices = (appContext: AppContext) => {
	// TODO: implement the email service
	const emailService = new EmailService(appContext);

	const tenantLocationRepository = new TenantLocationRepository(db, {
		logger: appContext.logger,
	});
	const appUserCodeRepository = new AppUserRepository(db, {
		logger: appContext.logger,
	});
	const appUserService = new AppUserService(
		appUserCodeRepository,
		tenantLocationRepository,
		appContext
	);

	const loginVerificationCodeRepository = new LoginVerificationCodeRepository(
		db
	);
	const loginVerificationCodeService = new LoginVerificationCodeService(
		appUserService,
		loginVerificationCodeRepository,
		emailService,
		appContext
	);

	const refreshTokenRepository = new RefreshTokenRepository(db, {
		logger: appContext.logger,
	});

	const tenantLocationService = new TenantLocationService(
		tenantLocationRepository,
		appContext
	);

	const clientRepository = new ClientRepository(db, {
		logger: appContext.logger,
	});

	const clientService = new ClientService(clientRepository, appContext);

	const authService = new AuthService(
		'SOME_SUPER_DUPER_UNIQUE_SECRET', // TODO: replace with a real secret from AWS Secrets Manager
		refreshTokenRepository,
		appUserService,
		clientService,
		tenantLocationService,
		appContext
	);

	return {
		appUserService,
		loginVerificationCodeService,
		authService,
		clientService,
	};
};

const createAuthApi = () => {
	const authApp = new OpenAPIHono<Environment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	authApp.openapi(startClientAuthenticationWithSecretRoute, async (ctx) => {
		const {client_id: clientId, client_secret: clientSecret} =
			ctx.req.valid('json');

		const {authService, clientService} = createServices(ctx.get('appContext'));

		console.log('Client ID:', clientId);
		console.log('Client Secret:', clientSecret);

		const isVerifiedSecret = await authService.verifyClientSecret(
			clientId,
			clientSecret
		);

		if (!isVerifiedSecret) {
			throw new UnauthorizedError(
				'Either client not found or invalid credentials'
			);
		}

		const {
			client,
			accessToken,
			accessTokenExpiration,
			refreshToken,
			refreshTokenExpiration,
		} = await authService.getJwtTokensByClientId(clientId);

		await clientService.updateClientLastLogin(client.id);

		const timeBetweenNowAndAccessTokenExpiration = dayjs(
			accessTokenExpiration
		).diff(dayjs(), 'milliseconds');
		const timeBetweenNowAndRefreshTokenExpiration = dayjs(
			refreshTokenExpiration
		).diff(dayjs(), 'milliseconds');

		return ctx.json(
			{
				access_token: accessToken,
				expires_in: timeBetweenNowAndAccessTokenExpiration,
				refresh_token: refreshToken,
				refresh_expires_in: timeBetweenNowAndRefreshTokenExpiration,
			},
			200
		);
	});

	authApp.openapi(startAuthenticationWithCodeRoute, async (ctx) => {
		const {email} = ctx.req.valid('json');

		if (!email) {
			throw new BadRequestError('Email is required');
		}

		const {loginVerificationCodeService} = createServices(
			ctx.get('appContext')
		);

		const code =
			await loginVerificationCodeService.getNewLoginVerificationCode(email);

		return ctx.json(code.toJSON(), 200);
	});

	authApp.openapi(authorizeCodeRoute, async (ctx) => {
		const {code, email} = ctx.req.valid('json');

		const {loginVerificationCodeService, appUserService, authService} =
			createServices(ctx.get('appContext'));

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
				user,
				accessToken,
				accessTokenExpiration,
				refreshToken,
				refreshTokenExpiration,
			} = await authService.getJwtTokensByEmail(email);

			await loginVerificationCodeService.deleteUserLoginVerificationCodes(
				email
			);

			await appUserService.updateUserLastLogin(user.id);

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
		} catch (e) {
			ctx.get('logger').error(e);
			throw new UnauthorizedError('Invalid code');
		}
	});

	authApp.openapi(refreshTokenRoute, async (ctx) => {
		const refreshToken = getCookie(ctx, 'eclaut-refresh-token');

		if (!refreshToken) {
			throw new UnauthorizedError('No refresh token');
		}

		const {authService} = createServices(ctx.get('appContext'));

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

	authApp.openapi(logoutRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {authService} = createServices(appContext);

		const tokenUser = appContext.auth;
		const refreshToken = getCookie(ctx, 'eclaut-refresh-token');

		if (!tokenUser || !refreshToken) {
			throw new UnauthorizedError('No user');
		}

		setCookie(ctx, 'eclaut-access-token', '', {
			secure: !isDevelopmentBuild(),
			httpOnly: true,
			expires: new Date(0),
		});

		setCookie(ctx, 'eclaut-refresh-token', '', {
			secure: !isDevelopmentBuild(),
			httpOnly: true,
			expires: new Date(0),
		});

		await authService.logoutOnDevice(refreshToken);

		return ctx.newResponse(null, 204);
	});

	authApp.openapi(logoutAllDevicesRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const {authService} = createServices(appContext);

		const tokenUser = appContext.auth;

		if (!tokenUser || !tokenUser.userId) {
			throw new UnauthorizedError('No user');
		}

		setCookie(ctx, 'eclaut-access-token', '', {
			secure: !isDevelopmentBuild(),
			httpOnly: true,
			expires: new Date(0),
		});

		setCookie(ctx, 'eclaut-refresh-token', '', {
			secure: !isDevelopmentBuild(),
			httpOnly: true,
			expires: new Date(0),
		});

		await authService.logoutOnAllDevices(tokenUser.userId);

		return ctx.newResponse(null, 204);
	});

	return authApp;
};

export {createAuthApi};
