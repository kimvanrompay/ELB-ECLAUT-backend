import {ApiError} from './api-error';

class ForbiddenError extends ApiError {
	constructor(message: string, key: string = 'FORBIDDEN') {
		super(403, message, key);
		this.name = 'ForbiddenError';
	}
}

export {ForbiddenError};
