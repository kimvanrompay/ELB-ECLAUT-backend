import {LocationNotAllowedError} from './location-not-allowed-error';

class CreateUserLocationNotAllowedError extends LocationNotAllowedError {
	constructor(message: string) {
		super(message);
		this.name = 'CreateUserLocationNotAllowedError';
	}
}

export {CreateUserLocationNotAllowedError};
