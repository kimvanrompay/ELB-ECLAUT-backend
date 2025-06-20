import {OpenAPIHono} from '@hono/zod-openapi';

import {UnauthorizedError} from '@lib/errors';
import {AppUserRepository} from '@lib/repositories/app-user';
import {TenantLocationRepository} from '@lib/repositories/tenant-location';
import {AppUserService} from '@lib/services/app-user';
import {defaultValidationHook} from '@lib/utils';

import {db} from '../database';
import {Authenticate} from '../middlewares/authentication';
import type {Environment} from '../types';
import {loggedInUserRoute} from './account.openapi';

const createAccountApi = () => {
	const app = new OpenAPIHono<Environment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	app.use(Authenticate());

	app.openapi(loggedInUserRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const appUserRepository = new AppUserRepository(db, {
			logger: appContext.logger,
		});
		const tenantLocationRepository = new TenantLocationRepository(db, {
			logger: appContext.logger,
		});
		const appUserService = new AppUserService(
			appUserRepository,
			tenantLocationRepository,
			appContext
		);

		const tokenuser = appContext.auth;

		if (!tokenuser) {
			throw new UnauthorizedError('Cannot find user');
		}

		try {
			const user = await appUserService.getUserById(tokenuser.userId);

			if (!user) {
				throw new UnauthorizedError('Cannot find user');
			}

			return ctx.json(user.toJSON(), 200);
		} catch {
			throw new UnauthorizedError('Cannot find user');
		}
	});

	return app;
};

export {createAccountApi};
