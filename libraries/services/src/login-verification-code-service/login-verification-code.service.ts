import {compare, hash} from 'bcrypt';

import {ForbiddenError} from '@lib/errors';
import {LoginVerificationCode} from '@lib/models/login-verification-code';
import type {ILoginVerificationCodeRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import type {IAppUserService} from '../app-user-service/app-user.service.types';
import type {IEmailService} from '../email-service/email.service.types';
import type {AppContext} from '../types';
import type {ILoginVerificationCodeService} from './login-verification-code.service.types';

class LoginVerificationCodeService implements ILoginVerificationCodeService {
	private loginVerificationCodeExpiration = 60 * 1000 * 5; // 5 minutes
	private loginVerificationCodeLength = 6;
	private loginVerificationCodeCharset =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	private logger: PinoLogger;

	constructor(
		private appUserService: IAppUserService,
		private loginVerificationCodeRepository: ILoginVerificationCodeRepository,
		private emailService: IEmailService,
		appContext: AppContext
	) {
		this.appUserService = appUserService;
		this.loginVerificationCodeRepository = loginVerificationCodeRepository;
		this.emailService = emailService;
		this.logger = appContext.logger.getChildLogger(
			{
				name: 'login-verification-code-service',
			},
			{}
		);
	}

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
		await this.deleteUserLoginVerificationCodes(email);

		if (user?.isBlocked) {
			throw new ForbiddenError('User is blocked');
		}

		// Return a code for security reasons. We don't want to expose whether an account exists.
		// But don't save the code if the user doesn't exist.

		const plainCode = this.generateLoginVerificationCode();
		const encryptedCode = await this.encryptLoginVerificationCode(plainCode);
		const code: LoginVerificationCode = new LoginVerificationCode(
			plainCode,
			encryptedCode,
			email,
			new Date(),
			new Date(Date.now() + this.loginVerificationCodeExpiration)
		);

		if (user) {
			await this.saveLoginVerificationCode(code);

			// TODO: remove this log after email service is implemented for security reasons
			this.logger.debug(
				`Sending login verification code (${code.code}) to ${user.email}`
			);

			await this.emailService.sendEmail({
				to: [user.email],
				subject: 'Login Verification Code', // TODO: Add translations?
				template: 'login-verification-code',
				data: {
					code: code.code,
				},
			});
		}

		return code;
	}

	async encryptLoginVerificationCode(code: string): Promise<string> {
		return await hash(code, 5);
	}

	async verifyLoginVerificationCode(
		email: string,
		code: string
	): Promise<boolean> {
		const storedLoginCodes =
			await this.loginVerificationCodeRepository.findValidLoginVerificationCodes(
				email
			);

		let isValid = false;

		for await (const storedLoginCode of storedLoginCodes) {
			const isLoginCodeValid = await compare(code, storedLoginCode.hashedCode);
			const isEmailValid = storedLoginCode.email === email;
			const isExpired = storedLoginCode.expiresAt.getTime() < Date.now();

			isValid = isLoginCodeValid && isEmailValid && !isExpired;

			if (isValid) {
				break;
			}
		}

		return isValid;
	}

	async deleteExpiredLoginVerificationCodes(): Promise<void> {
		await this.loginVerificationCodeRepository.removeExpiredLoginVerificationCodes();
	}

	async deleteUserLoginVerificationCodes(email: string): Promise<void> {
		await this.loginVerificationCodeRepository.deleteUserLoginVerificationCodes(
			email
		);
	}
}

export {LoginVerificationCodeService};
