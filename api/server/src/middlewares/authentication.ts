import {z} from '@hono/zod-openapi';
import {getCookie} from 'hono/cookie';
import {createMiddleware} from 'hono/factory';

import {getKnexInstance} from '@lib/db';
import {UnauthorizedError} from '@lib/errors';
import {AppUserRole} from '@lib/models/app-user';
import {AppUserRepository} from '@lib/repositories/app-user';
import {RefreshTokenRepository} from '@lib/repositories/refresh-token';
import {AppUserService} from '@lib/services/app-user';
import {AuthService} from '@lib/services/auth';
import {JwtAuthService} from '@lib/services/jwt';

import type {Environment} from '../types';

const db = await getKnexInstance();

const appUserService = new AppUserService(new AppUserRepository(db));

const refreshTokenRepository = new RefreshTokenRepository(db);

const authService = new AuthService(
	'SOME_SUPER_DUPER_UNIQUE_SECRET',
	refreshTokenRepository,
	appUserService
);

type AuthenticationMiddlewareOptions = {
	passThrough?: boolean;
};

const authenticationMiddleware = (options?: AuthenticationMiddlewareOptions) =>
	createMiddleware<Environment>(async (ctx, next) => {
		const accessTokenJwt = getCookie(ctx, 'eclaut-access-token');
		const refreshTokenJwt = getCookie(ctx, 'eclaut-refresh-token');

		console.log('Access token:', accessTokenJwt);
		console.log('Refresh token:', refreshTokenJwt);

		if (accessTokenJwt) {
			try {
				const decodedAccessToken =
					await authService.authenticateJwtAccessToken(accessTokenJwt);

				console.log('Decoded access token:', decodedAccessToken);

				const validatedTokenUser = z
					.object({
						userId: z.string(),
						email: z.string(),
						role: z.nativeEnum(AppUserRole),
					})
					.parse({
						userId: decodedAccessToken.userId,
						email: decodedAccessToken.email,
						role: decodedAccessToken.role,
					});

				ctx.set('tokenUser', {
					userId: validatedTokenUser.userId,
					email: validatedTokenUser.email,
					role: validatedTokenUser.role,
				});

				return next();
			} catch (error) {
				console.error('Access token error:', error);

				if (options?.passThrough) {
					return next();
				}

				throw new UnauthorizedError('Invalid access token');
			}
		}

		await next();
	});

export {authenticationMiddleware};
