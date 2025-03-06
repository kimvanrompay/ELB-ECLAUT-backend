import {createRoute} from '@hono/zod-openapi';

import {AppUser} from '@lib/models/app-user';

import {cookieAuthRegistry} from '../app';

const loggedInUserRoute = createRoute({
	summary: 'Get logged in user',
	method: 'get',
	tags: ['Account'],
	path: '/me',
	security: [
		{
			[cookieAuthRegistry.name]: [],
		},
	],
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

export {loggedInUserRoute};
