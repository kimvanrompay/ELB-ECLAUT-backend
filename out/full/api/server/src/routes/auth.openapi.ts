import {createRoute} from '@hono/zod-openapi';
import {z} from '@hono/zod-openapi';

const startAuthenticationWithCodeRoute = createRoute({
	summary: 'Method to start a login session through a code',
	method: 'post',
	path: '/auth/code',
	request: {
		body: {
			content: {
				'application/json': {
					schema: z.object({
						email: z.string().email(),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successful login',
			content: {
				'application/json': {
					schema: z.object({
						login_session_token: z.string(),
					}),
				},
			},
		},
	},
});

export {startAuthenticationWithCodeRoute};
