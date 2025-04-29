type Strategy = {
	authenticate: (data: Record<string, unknown>) => void;
};

class AuthService<S extends Record<string, Strategy>> {
	private strategies: S;

	constructor(strategies: S) {
		this.strategies = strategies;
	}

	authenticate(strategy: keyof S, data: Record<string, unknown>) {
		return this.strategies[strategy]?.authenticate(data);
	}
}
