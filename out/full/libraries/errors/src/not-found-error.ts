const DEFAULT_NOT_FOUND_MESSAGE = 'Resource not found';

class NotFoundError extends Error {
	constructor(message?: string) {
		super(message ?? DEFAULT_NOT_FOUND_MESSAGE);
		this.name = 'NotFoundError';
	}
}

export {NotFoundError};
