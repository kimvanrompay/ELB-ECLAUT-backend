class StatsUnitUnsupportedError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'StatsUnitUnsupportedError';
	}
}

export {StatsUnitUnsupportedError};
