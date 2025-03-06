import {createRoute} from '@hono/zod-openapi';
import {z} from '@hono/zod-openapi';

import {LoginVerificationCode} from '@lib/models/login-verification-code';

import {cookieAuthRegistry} from '../app';

const startAuthenticationWithCodeRoute = createRoute({
	summary: 'Method to start a login session through a code',
	method: 'post',
	path: '/code',
	tags: ['Authentication'],
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
					schema: LoginVerificationCode.schemas.LoginVerificationCodeDTOSchema,
				},
			},
		},
	},
});

const authorizeCodeRoute = createRoute({
	summary: 'Method to authorize a login session through a code',
	method: 'post',
	path: '/code/authorize',
	tags: ['Authentication'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: z.object({
						email: z.string(),
						code: z.string(),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			description: 'Successful login',
			headers: {
				'Set-Cookie': {
					description: 'Set the cookie',
					schema: {
						type: 'string',
					},
				},
			},
		},
	},
});

const refreshTokenRoute = createRoute({
	summary: 'Method to refresh a token',
	method: 'post',
	path: '/refresh',
	tags: ['Authentication'],
	security: [
		{
			[cookieAuthRegistry.name]: [],
		},
	],
	responses: {
		200: {
			description: 'Successful login',
			headers: {
				'Set-Cookie': {
					description: 'Set the cookie',
					schema: {
						type: 'string',
					},
				},
			},
		},
	},
});

export {
	startAuthenticationWithCodeRoute,
	authorizeCodeRoute,
	refreshTokenRoute,
};
