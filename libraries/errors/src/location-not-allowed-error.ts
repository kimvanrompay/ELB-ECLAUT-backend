class LocationNotAllowedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'LocationNotAllowedError';
	}
}

export {LocationNotAllowedError};
