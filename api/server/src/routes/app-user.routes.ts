import {OpenAPIHono} from '@hono/zod-openapi';

import {NotFoundError} from '@lib/errors';
import {AppUserRepository} from '@lib/repositories/app-user';
import {AppUserService} from '@lib/services/app-user';
import {defaultValidationHook} from '@lib/utils';
import {parseQueryParamsToDatabaseFilters} from '@lib/utils/query-params';

import {db} from '../database';
import type {AuthenticatedEnvironment} from '../types';
import {
	createUserRoute,
	findUsersRoute,
	getUserByEmailAddressRoute,
	getUserRoute,
	updateUserRoute,
} from './app-user.openapi';

const createAppUserApi = () => {
	const userApp = new OpenAPIHono<AuthenticatedEnvironment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	userApp.openapi(findUsersRoute, async (ctx) => {
		const appUserRepository = new AppUserRepository(db, ctx.get('appContext'));
		const appUserService = new AppUserService(
			appUserRepository,
			ctx.get('appContext')
		);

		const queryParams = ctx.req.valid('query');

		console.log('queryParams', queryParams);

		const filters = parseQueryParamsToDatabaseFilters(queryParams);

		console.log('filters', filters);

		const users = await appUserService.findUserByFilters(filters);

		const userDTOs = users.map((user) => user.toJSON());

		return ctx.json(userDTOs, 200);
	});

	userApp.openapi(getUserRoute, async (ctx, next) => {
		const appUserRepository = new AppUserRepository(db, ctx.get('appContext'));
		const appUserService = new AppUserService(
			appUserRepository,
			ctx.get('appContext')
		);

		const {id: userId} = ctx.req.valid('param');

		const user = await appUserService.getUserById(userId);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		const userDTO = user.toJSON();

		return ctx.json(userDTO, 200);
	});

	userApp.openapi(getUserByEmailAddressRoute, async (ctx) => {
		const appContext = ctx.get('appContext');

		const appUserRepository = new AppUserRepository(db, ctx.get('appContext'));
		const appUserService = new AppUserService(appUserRepository, appContext);

		const {email} = ctx.req.valid('param');

		console.log('email', email);
		console.log(ctx.req.param('email'));

		const user = await appUserService.getUserByEmail(email);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		const userDTO = user.toJSON();

		return ctx.json(userDTO, 200);
	});

	userApp.openapi(createUserRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const appUserRepository = new AppUserRepository(db, ctx.get('appContext'));
		const appUserService = new AppUserService(appUserRepository, appContext);

		const userToCreate = ctx.req.valid('json');

		const user = await appUserService.createUser({
			...userToCreate,
		});

		return ctx.json(user.toJSON(), 201);
	});

	userApp.openapi(updateUserRoute, async (ctx) => {
		const appContext = ctx.get('appContext');
		const appUserRepository = new AppUserRepository(db, ctx.get('appContext'));
		const appUserService = new AppUserService(appUserRepository, appContext);

		const {id: userId} = ctx.req.valid('param');
		const userToUpdate = ctx.req.valid('json');

		const user = await appUserService.updateUser(userId, userToUpdate);

		return ctx.json(user.toJSON(), 200);
	});

	return userApp;
};

export {createAppUserApi};
