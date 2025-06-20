import {swaggerUI} from '@hono/swagger-ui';
import {OpenAPIHono} from '@hono/zod-openapi';
import {basicAuth} from 'hono/basic-auth';

import {Environment} from '../types';

const addOpenAPI = (app: OpenAPIHono<Environment>) => {
	app.doc('/openapi', {
		openapi: '3.0.0',
		info: {
			title: 'Elaut API',
			version: '1.0.0',
		},
	});

	app.use('/swagger', basicAuth({username: 'lica', password: 'hellothere'}));
	app.get(
		'/swagger',
		swaggerUI({
			url: '/openapi',
			withCredentials: true,
		})
	);
};

export {addOpenAPI};
