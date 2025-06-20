class TenantNotAllowedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'TenantNotAllowedError';
	}
}

export {TenantNotAllowedError};
