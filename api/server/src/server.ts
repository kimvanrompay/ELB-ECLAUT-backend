import './load-env-variables';

import {serve} from '@hono/node-server';

import {app} from './app';
import './app-routes';

console.log(process.env.POSTGRES_PASSWORD);

serve(
	{
		fetch: app.fetch.bind(app),
		port: 3000,
	},
	(info) => {
		console.log(`Server running at ${info.port}`);
	}
);
