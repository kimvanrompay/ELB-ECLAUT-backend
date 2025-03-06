import {createRoute, z} from '@hono/zod-openapi';

const healthCheckRoute = createRoute({
	summary: 'Health check',
	method: 'get',
	path: '/health',
	tags: ['General'],
	responses: {
		200: {
			description: 'Successful response',
			content: {
				'text/plain': {
					schema: z.string(),
				},
			},
		},
	},
});

export {healthCheckRoute};
