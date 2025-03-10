import {createRoute} from '@hono/zod-openapi';
import {z} from '@hono/zod-openapi';

import {LoginVerificationCode} from '@lib/models/login-verification-code';

import {cookieAuthRegistry} from '../app';
import {createPrivateAppRoute} from '../utils/create-private-app-route';

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
		204: {
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

const logoutRoute = createPrivateAppRoute()({
	summary: 'Method to logout',
	method: 'post',
	path: '/logout',
	tags: ['Authentication'],
	responses: {
		204: {
			description: 'Successful logout',
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

const logoutAllDevicesRoute = createPrivateAppRoute()({
	summary: 'Method to logout from all devices',
	method: 'post',
	path: '/logout/all',
	tags: ['Authentication'],
	responses: {
		204: {
			description: 'Successful logout',
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
	logoutRoute,
	logoutAllDevicesRoute,
};
