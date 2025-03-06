class DatabaseInsertError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DatabaseInsertError';
	}
}

export {DatabaseInsertError};
