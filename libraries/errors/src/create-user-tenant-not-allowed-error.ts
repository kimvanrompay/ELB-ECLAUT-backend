import {TenantNotAllowedError} from './tenant-not-allowed-error';

class CreateUserTenantNotAllowedError extends TenantNotAllowedError {
	constructor(message: string) {
		super(message);
		this.name = 'CreateUserTenantNotAllowedError';
	}
}

export {CreateUserTenantNotAllowedError};
