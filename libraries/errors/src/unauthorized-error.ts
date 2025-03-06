import {ApiError} from './api-error';

class UnauthorizedError extends ApiError {
	constructor(message: string, key: string = 'UNAUTHORIZED') {
		super(401, message, key);
		this.name = 'UnauthorizedError';
	}
}

export {UnauthorizedError};
