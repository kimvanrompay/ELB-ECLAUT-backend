import {ApiError} from './api-error';

class InternalServerError extends ApiError {
	constructor(message: string, key: string = 'INTERNAL_SERVER') {
		super(500, message, key);
		this.name = 'InternalServerError';
	}
}

export {InternalServerError};
