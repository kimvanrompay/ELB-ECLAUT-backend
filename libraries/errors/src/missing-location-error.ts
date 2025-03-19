class MissingLocationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'MissingLocationError';
	}
}

export {MissingLocationError};
