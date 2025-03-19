import {z} from '@hono/zod-openapi';
import {getCookie} from 'hono/cookie';
import {createMiddleware} from 'hono/factory';

import {getKnexInstance} from '@lib/db';
import {UnauthorizedError} from '@lib/errors';
import {AppUserRole} from '@lib/models/app-user';
import {AppUserRepository} from '@lib/repositories/app-user';
import {RefreshTokenRepository} from '@lib/repositories/refresh-token';
import {TenantLocationRepository} from '@lib/repositories/tenant-location';
import {AppUserService} from '@lib/services/app-user';
import {AuthService} from '@lib/services/auth';

import type {Environment} from '../types';

const db = await getKnexInstance();

type AuthenticationMiddlewareOptions = {
	passThrough?: boolean;
};

const Authenticate = (options?: AuthenticationMiddlewareOptions) =>
	createMiddleware<Environment>(async (ctx, next) => {
		const appContext = ctx.get('appContext');

		/**
		 * When creating a private route on an already authenticated api, we dont want to re-authenticate
		 */
		const isAlreadyAuthenticated = appContext.isAuthenticated !== undefined;
		if (isAlreadyAuthenticated) {
			return next();
		}

		const accessTokenJwt = getCookie(ctx, 'eclaut-access-token');
		const refreshTokenJwt = getCookie(ctx, 'eclaut-refresh-token');

		const logger = ctx.get('logger').getChildLogger(
			{
				name: 'authenticationMiddleware',
			},
			{}
		);

		logger.debug('Access token:', accessTokenJwt);
		logger.debug('Refresh token:', refreshTokenJwt);

		const contextForRepositories = {
			logger,
		};
		const appUserRepository = new AppUserRepository(db, contextForRepositories);
		const tenantLocationRepository = new TenantLocationRepository(
			db,
			contextForRepositories
		);
		const refreshTokenRepository = new RefreshTokenRepository(
			db,
			contextForRepositories
		);

		const appUserService = new AppUserService(
			appUserRepository,
			tenantLocationRepository,
			{
				...appContext,
				logger,
			}
		);

		const authService = new AuthService(
			'SOME_SUPER_DUPER_UNIQUE_SECRET',
			refreshTokenRepository,
			appUserService,
			appContext
		);

		if (accessTokenJwt) {
			try {
				const decodedAccessToken =
					await authService.authenticateJwtAccessToken(accessTokenJwt);

				const validatedTokenUser = z
					.object({
						userId: z.string(),
						email: z.string(),
						role: z.nativeEnum(AppUserRole),
						tenantId: z.string(),
						locationIds: z.array(z.string()),
					})
					.parse({
						userId: decodedAccessToken.userId,
						email: decodedAccessToken.email,
						role: decodedAccessToken.role,
						tenantId: decodedAccessToken.tenantId,
						locationIds: decodedAccessToken.locationIds,
					});

				ctx.set('appContext', {
					...appContext,
					isAuthenticated: true,
					auth: {
						userId: validatedTokenUser.userId,
						email: validatedTokenUser.email,
						role: validatedTokenUser.role,
						tenantId: validatedTokenUser.tenantId,
						locationIds: validatedTokenUser.locationIds,
						isElaut: validatedTokenUser.role
							.toLocaleLowerCase()
							.startsWith('elaut'),
					},
				});

				return next();
			} catch (error) {
				logger.error(`Access token error: ${error}`);

				if (options?.passThrough) {
					ctx.set('appContext', {
						...appContext,
						auth: undefined,
						isAuthenticated: false,
					});

					return next();
				}

				throw new UnauthorizedError('Invalid access token');
			}
		}

		await next();
	});

export {Authenticate};

export type {AuthenticationMiddlewareOptions};
