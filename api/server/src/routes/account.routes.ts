import {OpenAPIHono} from '@hono/zod-openapi';

import {UnauthorizedError} from '@lib/errors';
import type {IAppUserService} from '@lib/services/types';
import {defaultValidationHook} from '@lib/utils';

import type {Environment} from '../types';
import {loggedInUserRoute} from './account.openapi';

const createAccountApi = (appUserService: IAppUserService) => {
	const app = new OpenAPIHono<Environment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	app.openapi(loggedInUserRoute, async (ctx) => {
		const tokenuser = ctx.get('tokenUser');

		console.log('tokenuser', tokenuser);

		if (!tokenuser) {
			throw new UnauthorizedError('Cannot find user');
		}

		try {
			const user = await appUserService.getUserById(tokenuser.userId);

			if (!user) {
				throw new UnauthorizedError('Cannot find user');
			}

			return ctx.json(user.toJSON(), 200);
		} catch (e) {
			throw new UnauthorizedError('Cannot find user');
		}
	});

	return app;
};

export {createAccountApi};
