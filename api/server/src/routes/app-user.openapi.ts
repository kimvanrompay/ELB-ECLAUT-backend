import {createRoute, z} from '@hono/zod-openapi';

import {ApiErrorSchema} from '@lib/errors';
import {AppUser} from '@lib/models/app-user';

const findUsersRoute = createRoute({
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
			'is_blocked[eq]': z.coerce.boolean().optional(),
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

export {findUsersRoute};
