class DatabaseDeleteError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DatabaseDeleteError';
	}
}

export {DatabaseDeleteError};
