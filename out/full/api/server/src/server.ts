import {serve} from '@hono/node-server';

import app from './app';

serve(
	{
		fetch: app.fetch.bind(app),
		port: 3000,
	},
	(info) => {
		console.log(`Server running at ${info.port}`);
	}
);
