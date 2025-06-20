class DatabaseRetrieveError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DatabaseRetrieveError';
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export {DatabaseRetrieveError};
