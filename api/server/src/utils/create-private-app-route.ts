import {type RouteConfig} from '@hono/zod-openapi';

import type {AppSecurityScopes} from '@lib/services/authorization';

import {cookieAuthRegistry} from '../app';
import {
	Authenticate,
	type AuthenticationMiddlewareOptions,
} from '../middlewares/authentication';
import {Authorize} from '../middlewares/authorization';
import {createAppRoute} from './create-app-route';

const createPrivateAppRoute =
	(
		claims: AppSecurityScopes[] = [],
		options?: AuthenticationMiddlewareOptions & {
			canThrowBadRequest?: boolean;
		}
	) =>
	<
		P extends string,
		R extends Omit<RouteConfig, 'path'> & {
			path: P;
		},
	>(
		routeConfig: R
	) => {
		const middlewareArg = routeConfig.middleware
			? Array.isArray(routeConfig.middleware)
				? routeConfig.middleware
				: [routeConfig.middleware]
			: [];

		return createAppRoute({
			canThrowUnauthorized: true,
			canThrowForbidden: true,
			...options,
		})<P, R>({
			...routeConfig,
			security: {
				[cookieAuthRegistry.name]: [claims],
			},
			middleware: [
				Authenticate(options),
				Authorize(...claims),
				...middlewareArg,
			],
		});
	};

export {createPrivateAppRoute};
