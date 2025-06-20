import {ApiError} from './api-error';

class BadRequestError extends ApiError {
	constructor(message: string, key: string = 'BAD_REQUEST') {
		super(400, message, key);
		this.name = 'BadRequestError';
	}
}

export {BadRequestError};
