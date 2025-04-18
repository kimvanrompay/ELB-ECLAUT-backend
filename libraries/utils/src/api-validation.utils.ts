import {type ResponseConfig} from '@asteasolutions/zod-to-openapi';
import type {Hook, RouteConfig} from '@hono/zod-openapi';
import type {Context} from 'hono';
import type {JSONValue} from 'hono/utils/types';
import {ZodSchema} from 'zod';

import {ApiError, ValidationError} from '@lib/errors';

enum RequestErrors {
	REQUEST_QUERY_PARAM_ERROR = 'REQUEST_QUERY_PARAM_ERROR',
	REQUEST_PATH_PARAM_ERROR = 'REQUEST_PATH_PARAM_ERROR',
	REQUEST_BODY_ERROR = 'REQUEST_BODY_ERROR',
	REQUEST_HEADER_ERROR = 'REQUEST_HEADER_ERROR',
	REQUEST_COOKIE_ERROR = 'REQUEST_COOKIE_ERROR',
}

const mapValidationTargetToError = (target: string) => {
	switch (target) {
		case 'query':
			return RequestErrors.REQUEST_QUERY_PARAM_ERROR;
		case 'param':
			return RequestErrors.REQUEST_PATH_PARAM_ERROR;
		case 'json':
			return RequestErrors.REQUEST_BODY_ERROR;
		case 'header':
			return RequestErrors.REQUEST_HEADER_ERROR;
		case 'cookie':
			return RequestErrors.REQUEST_COOKIE_ERROR;
		default:
			return 'BAD_REQUEST';
	}
};

const defaultValidationHook: Hook<any, any, any, any> = async (result, ctx) => {
	if (!result.success) {
		const errorKey = mapValidationTargetToError(result.target);
		const errors = ValidationError.fromZodError(result.error);

		return ctx.json(new ApiError(400, 'Bad request', errorKey, errors), 400);
	}
};

const validatedJSONResponse = <C extends Context, Data extends JSONValue>(
	config: RouteConfig,
	ctx: C,
	data: Data
) => {
	const statusResponse = config.responses[200] as ResponseConfig;
	const jsonContent = statusResponse?.content?.['application/json'];
	const validatedResponse = (
		jsonContent?.schema as ZodSchema | undefined
	)?.safeParse?.(data);

	if (!validatedResponse?.success) {
		const validationErrors = validatedResponse?.error
			? ValidationError.fromZodError(validatedResponse.error)
			: [];

		throw new ApiError(
			503,
			'Could not create a valid response',
			'RESPONSE_VALIDATION_ERROR',
			validationErrors
		);
	}

	return validatedResponse.data as Data;
};

export {
	mapValidationTargetToError,
	defaultValidationHook,
	validatedJSONResponse,
};
