import {z} from '@hono/zod-openapi';

import {DatabaseDeleteError} from './database-delete-error';
import {DatabaseInsertError} from './database-insert-error';
import {DatabaseRetrieveError} from './database-retrieve-error';
import {DatabaseUpdateError} from './database-update-error';
import {LocationNotAllowedError} from './location-not-allowed-error';
import {NotFoundError} from './not-found-error';
import {TenantNotAllowedError} from './tenant-not-allowed-error';

const ApiErrorSchema = z
	.object({
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
	})
	.openapi('ApiError');

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
	public statusCode: number;
	public validationErrors: ValidationError[] = [];
	public key: string;

	constructor(
		statusCode: number,
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

	/**
	 * Create an ApiError from any error within the application. This functions is used in the error middleware to
	 * ensure that all errors are returned as an ApiError.
	 * @param error
	 */
	static fromError(error: Error) {
		if (error instanceof ApiError) {
			return error;
		}

		if (
			error instanceof TenantNotAllowedError ||
			error instanceof LocationNotAllowedError
		) {
			return new ApiError(
				403,
				'You are not allowed to perform this action',
				'FORBIDDEN'
			);
		}

		if (error instanceof NotFoundError) {
			return new ApiError(404, error.message, 'NOT_FOUND');
		}

		if (error instanceof DatabaseRetrieveError) {
			return new ApiError(
				500,
				'Something went wrong retrieving the resource',
				'INTERNAL_SERVER_ERROR'
			);
		}

		if (error instanceof DatabaseInsertError) {
			return new ApiError(
				500,
				'Something went wrong creating the resource',
				'INTERNAL_SERVER_ERROR'
			);
		}

		if (error instanceof DatabaseUpdateError) {
			return new ApiError(
				500,
				'Something went wrong updating the resource',
				'INTERNAL_SERVER_ERROR'
			);
		}

		if (error instanceof DatabaseDeleteError) {
			return new ApiError(
				500,
				'Something went wrong removing the resource',
				'INTERNAL_SERVER_ERROR'
			);
		}

		return new ApiError(500, 'Internal Server Error', 'INTERNAL_SERVER_ERROR');
	}
}

export {ApiError, ApiErrorSchema, ValidationError};
