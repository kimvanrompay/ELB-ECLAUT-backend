import {ErrorHandler} from 'hono';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {HTTPException} from 'hono/dist/types/http-exception';
import {ContentfulStatusCode} from 'hono/dist/types/utils/http-status';

import {ApiError} from '@lib/errors';

import {Environment} from './types';

const isHttpException = (error: unknown): error is HTTPException => {
	return typeof (error as HTTPException).res !== 'undefined';
};

const apiErrorHandler: ErrorHandler<Environment> = async (error, ctx) => {
	ctx.var.logger.error(error);

	// Hono can throw HTTPExceptions
	if (isHttpException(error)) {
		return (error as HTTPException).res as Response;
	}

	const apiError = ApiError.fromError(error);

	return ctx.json(apiError, apiError.statusCode as ContentfulStatusCode);
};

export {apiErrorHandler};
