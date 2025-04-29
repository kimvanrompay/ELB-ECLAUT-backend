import {z} from '@hono/zod-openapi';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {StatusCode} from 'hono/dist/types/utils/http-status';

import {DatabaseRetrieveError} from './database-retrieve-error';
import {NotFoundError} from './not-found-error';

const ApiErrorSchema = z.object({
	statusCode: z.number(),
	message: z.string(),
	key: z.string(),
	validationErrors: z
		.array(
			z.object({
				type: z.string(),
				message: z.string(),
				property: z.string(),
			})
		)
		.optional(),
});

type ApiErrorDTOType = z.infer<typeof ApiErrorSchema>;

class ValidationError {
	type: string;
	message: string;
	property: string;

	constructor(type: string, message: string, property: string) {
		this.type = type;
		this.message = message;
		this.property = property;
	}

	static fromZodError(error: z.ZodError) {
		return error.issues.map(
			(issue) =>
				new ValidationError(issue.code, issue.message, issue.path.join('.'))
		);
	}

	toJSON() {
		return {
			type: this.type,
			message: this.message,
			property: this.property,
		};
	}
}

class ApiError extends Error {
	public statusCode: StatusCode;
	public validationErrors: ValidationError[] = [];
	public key: string;

	constructor(
		statusCode: StatusCode,
		message: string,
		key: string,
		validationErrors: ValidationError[] = []
	) {
		super(message);
		this.key = key;
		this.statusCode = statusCode;
		this.validationErrors = validationErrors;
	}

	public toJSON(): ApiErrorDTOType {
		return {
			statusCode: this.statusCode,
			message: this.message,
			key: this.key,
			...(this.validationErrors.length > 0 && {
				validationErrors: this.validationErrors.map((validationError) =>
					validationError.toJSON()
				),
			}),
		};
	}

	static fromError(error: Error) {
		if (error instanceof ApiError) {
			return error;
		}

		if (error instanceof NotFoundError) {
			return new ApiError(404, error.message, 'NOT_FOUND');
		}

		if (error instanceof DatabaseRetrieveError) {
			return new ApiError(
				500,
				'Could not find the requested resource',
				'RESOURCE_NOT_FOUND'
			);
		}

		return new ApiError(200, 'Internal Server Error', 'INTERNAL_SERVER_ERROR');
	}

	static defaultInternalServerError() {
		return new ApiError(500, 'Internal Server Error', 'INTERNAL_SERVER_ERROR');
	}
}

export {ApiError, ApiErrorSchema, ValidationError};
