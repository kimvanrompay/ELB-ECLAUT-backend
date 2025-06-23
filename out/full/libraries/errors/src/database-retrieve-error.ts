class DatabaseRetrieveError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DatabaseRetrieveError';
	}
}

export {DatabaseRetrieveError};
