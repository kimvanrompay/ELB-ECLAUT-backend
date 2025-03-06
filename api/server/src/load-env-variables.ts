import dotenv from 'dotenv';
import {join} from 'path';

import {PinoLogger} from '@lib/utils';

const LOGGER = new PinoLogger(
	{
		name: 'LoadEnvVariables',
	},
	{}
);

if (process.env.NODE_ENV === 'development') {
	const __dirname = import.meta.dirname;
	const path = join(__dirname, '../../..', '.env');

	LOGGER.info('Loading DEVELOPMENT env variables from .env file');

	dotenv.config({
		path,
	});
}
