class DatabaseUpdateError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DatabaseUpdateError';
	}
}

export {DatabaseUpdateError};
