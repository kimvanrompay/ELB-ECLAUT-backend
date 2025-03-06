import {LoginVerificationCode} from '@lib/models/login-verification-code';
import type {ILoginVerificationCodeRepository} from '@lib/repositories/types';

import type {IAppUserService} from '../app-user-service/app-user.service.types';

class LoginVerificationCodeService {
	private loginVerificationCodeExpiration = 60 * 1000 * 5; // 5 minutes
	private loginVerificationCodeLength = 6;
	private loginVerificationCodeCharset =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	constructor(
		private appUserService: IAppUserService,
		private loginVerificationCodeRepository: ILoginVerificationCodeRepository
	) {}

	private generateLoginVerificationCode(): string {
		return Array.from({length: this.loginVerificationCodeLength}, () => {
			return this.loginVerificationCodeCharset.charAt(
				Math.floor(Math.random() * this.loginVerificationCodeCharset.length)
			);
		}).join('');
	}

	private async saveLoginVerificationCode(
		loginVerificationCode: LoginVerificationCode
	): Promise<LoginVerificationCode> {
		return this.loginVerificationCodeRepository.createLoginVerificationCode(
			loginVerificationCode.toDBType()
		);
	}

	async getNewLoginVerificationCode(
		email: string
	): Promise<LoginVerificationCode> {
		const user = await this.appUserService.getUserByEmail(email);

		// Return a code for security reasons. We don't want to expose whether an account exists.
		// But don't save the code if the user doesn't exist.

		const code: LoginVerificationCode = new LoginVerificationCode(
			this.generateLoginVerificationCode(),
			email,
			new Date(),
			new Date(Date.now() + this.loginVerificationCodeExpiration)
		);

		if (user) {
			await this.saveLoginVerificationCode(code);
			// TODO: Notify the user
		}

		return code;
	}

	async getLoginVerificationCode(
		email: string,
		code: string
	): Promise<LoginVerificationCode | undefined> {
		return this.loginVerificationCodeRepository.getLoginVerificationCode(
			email,
			code
		);
	}

	async verifyLoginVerificationCode(
		email: string,
		code: string
	): Promise<boolean> {
		const storedLoginCode = await this.getLoginVerificationCode(email, code);

		if (!storedLoginCode) {
			return false;
		}

		const isLoginCodeValid = storedLoginCode.code === code;
		const isEmailValid = storedLoginCode.email === email;
		const isExpired = storedLoginCode.expiresAt.getTime() < Date.now();

		return isLoginCodeValid && isEmailValid && !isExpired;
	}

	async deleteLoginVerificationCode(
		email: string,
		code: string
	): Promise<void> {
		await this.loginVerificationCodeRepository.deleteLoginVerificationCode(
			email,
			code
		);
	}
}

export {LoginVerificationCodeService};
