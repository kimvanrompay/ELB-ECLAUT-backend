class MagicCodeAuthenticationStrategy {
	constructor() {}

	private generateMagicCode(email: string): string {
		// TODO: Implement magic code generation
		return '123456';
	}

	sendMagicCode(email: string): Promise<void> {
		// Send magic code to email
		const magicCode = this.generateMagicCode(email);

		return Promise.resolve();
	}
}
