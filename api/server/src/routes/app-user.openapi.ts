import {z} from '@hono/zod-openapi';

import {ApiErrorSchema} from '@lib/errors';
import {AppUser} from '@lib/models/app-user';
import {AppSecurityScopes} from '@lib/services/authorization';

import {createPrivateAppRoute} from '../utils/create-private-app-route';

const findUsersRoute = createPrivateAppRoute([AppSecurityScopes.READ_USERS])({
	method: 'get',
	path: '/',
	summary: 'Get all users',
	tags: ['Users'],
	request: {
		query: z.object({
			'username[like]': z.string().optional(),
			'email[like]': z.string().optional(),
			'tenant_id[eq]': z.string().optional(),
			'role[eq]': z.string().optional(),
			'is_blocked[eq]': z
				.string()
				.optional()
				.transform((value) => {
					return !!value && value !== 'false' && value !== '0';
				}),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: z.array(AppUser.schema.AppUserDTOSchema),
				},
			},
		},
		400: {
			description: 'Request validation Error',
			content: {
				'application/json': {
					schema: ApiErrorSchema,
				},
			},
		},
	},
});

const getUserRoute = createPrivateAppRoute([AppSecurityScopes.READ_USERS])({
	method: 'get',
	summary: 'Get a specific user by their id',
	tags: ['Users'],
	path: '/{id}',
	request: {
		params: z.object({
			id: z.string(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: AppUser.schema.AppUserDTOSchema,
				},
			},
		},
		400: {
			description: 'Request validation Error',
			content: {
				'application/json': {
					schema: ApiErrorSchema,
				},
			},
		},
	},
});

const getUserByEmailAddressRoute = createPrivateAppRoute([
	AppSecurityScopes.READ_USERS,
])({
	method: 'get',
	summary: 'Get a specific user by their email address',
	tags: ['Users'],
	path: '/email/{email}',
	request: {
		params: z.object({
			email: z.string(),
		}),
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: AppUser.schema.AppUserDTOSchema,
				},
			},
		},
		400: {
			description: 'Request validation Error',
			content: {
				'application/json': {
					schema: ApiErrorSchema,
				},
			},
		},
	},
});

const updateUserRoute = createPrivateAppRoute(
	[AppSecurityScopes.UPDATE_USERS],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'put',
	summary: 'Update a user',
	tags: ['Users'],
	path: '/{id}',
	request: {
		params: z.object({
			id: z.string(),
		}),
		body: {
			content: {
				'application/json': {
					schema: AppUser.schema.AppUserUpdateDTOSchema,
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: AppUser.schema.AppUserDTOSchema,
				},
			},
		},
	},
});

const createUserRoute = createPrivateAppRoute(
	[AppSecurityScopes.CREATE_USERS],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'post',
	summary: 'Create a user',
	tags: ['Users'],
	path: '/',
	request: {
		body: {
			content: {
				'application/json': {
					schema: AppUser.schema.AppUserCreateDTOSchema,
				},
			},
		},
	},
	responses: {
		201: {
			description: 'Successful response',
			content: {
				'application/json': {
					schema: AppUser.schema.AppUserDTOSchema,
				},
			},
		},
	},
});

const deleteUserRoute = createPrivateAppRoute(
	[AppSecurityScopes.DELETE_USERS],
	{
		canThrowBadRequest: true,
	}
)({
	method: 'delete',
	summary: 'Delete a user',
	tags: ['Users'],
	path: '/{id}',
	request: {
		params: z.object({
			id: z.string(),
		}),
	},
	responses: {
		204: {
			description: 'Successful response',
		},
	},
});

export {
	findUsersRoute,
	getUserRoute,
	getUserByEmailAddressRoute,
	updateUserRoute,
	createUserRoute,
	deleteUserRoute,
};
