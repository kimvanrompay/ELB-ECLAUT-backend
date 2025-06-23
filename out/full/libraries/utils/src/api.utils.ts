import type {Context} from 'hono';

import {InternalServerError} from '@lib/errors';

import {PinoLogger} from './logger/logger';

const getLoggerFromContext = <C extends Context>(context: C): PinoLogger => {
	const logger = context.get('logger') as PinoLogger;

	if (!logger) {
		const tempLogger = new PinoLogger({}, {});

		tempLogger.error('Logger not found in request context');

		throw new InternalServerError('Logger not found in request context');
	}

	return logger;
};

export {getLoggerFromContext};
