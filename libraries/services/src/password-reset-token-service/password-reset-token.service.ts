import {compare, hash} from 'bcrypt';
import {randomBytes} from 'crypto';

import type {AppUser} from '@lib/models/app-user';
import {PasswordResetToken} from '@lib/models/password-reset-token';
import type {IPasswordResetTokenRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import {getEnvVariable} from '@lib/utils/env';

import type {IAppUserService} from '../app-user-service/app-user.service.types';
import type {IEmailService} from '../email-service/email.service.types';
import type {AppContext} from '../types';
import type {IPasswordResetTokenService} from './password-reset-token.service.types';

class PasswordResetTokenService implements IPasswordResetTokenService {
	private passwordResetTokenExpiration = 60 * 1000 * 60; // 1 hour
	private passwordResetTokenLength = 32;
	private logger: PinoLogger;

	constructor(
		private appUserService: IAppUserService,
		private passwordResetTokenRepository: IPasswordResetTokenRepository,
		private emailService: IEmailService,
		appContext: AppContext
	) {
		this.logger = appContext.logger.getChildLogger(
			{
				name: 'password-reset-token-service',
			},
			{}
		);
	}

	async encryptPasswordResetToken(code: string): Promise<string> {
		return await hash(code, getEnvVariable('BCRYPT_SALT_ROUNDS', 5));
	}

	private generateLoginVerificationCode(): string {
		return randomBytes(this.passwordResetTokenLength)
			.toString('hex')
			.slice(0, this.passwordResetTokenLength);
	}

	private async savePasswordResetToken(
		token: PasswordResetToken
	): Promise<PasswordResetToken> {
		return this.passwordResetTokenRepository.createPasswordResetToken(
			token.toDBType()
		);
	}

	async createNewPasswordResetToken(
		email: string,
		user?: AppUser | null | undefined
	): Promise<PasswordResetToken> {
		let _user = user;
		if (_user === undefined) {
			_user = await this.appUserService.getUserByEmail(email);
		}
		await this.deleteUserPasswordResetToken(email);

		// Return a token for security reasons. We don't want to expose whether an account exists through time attacks
		// But don't save the token if the user doesn't exist.

		const plainCode = this.generateLoginVerificationCode();
		const encryptedCode = await this.encryptPasswordResetToken(plainCode);
		const token: PasswordResetToken = new PasswordResetToken(
			email,
			plainCode,
			encryptedCode,
			new Date(),
			new Date(Date.now() + this.passwordResetTokenExpiration)
		);

		if (user) {
			await this.savePasswordResetToken(token);

			this.logger.debug(`Sending password reset mail to ${user.email}`);

			const resetUrl = new URL(
				`${process.env.APP_URL}/${user.settings.language}/reset-password`
			);
			resetUrl.searchParams.set('token', plainCode);
			resetUrl.searchParams.set('email', email);

			console.log(resetUrl.toString());

			await this.emailService.sendEmail({
				to: [user.email],
				template: 'password-reset',
				data: {
					resetLink: resetUrl.toString(),
					username: user.username,
					language: user.settings.language,
				},
			});
		}

		return token;
	}

	async verifyPasswordResetToken(
		email: string,
		token: string
	): Promise<boolean> {
		const userResetToken =
			await this.passwordResetTokenRepository.getPasswordResetToken(email);

		if (!userResetToken) {
			this.logger.warn(`No password reset token found for email: ${email}`);
			return false;
		}

		const isLoginCodeValid = await compare(token, userResetToken.hashedToken);
		const isEmailValid = userResetToken.email === email;
		const isExpired = userResetToken.expiresAt.getTime() < Date.now();

		return isLoginCodeValid && isEmailValid && !isExpired;
	}

	async deleteExpiredPasswordResetTokens(): Promise<void> {
		await this.passwordResetTokenRepository.removeExpiredPasswordResetTokens();
	}

	async deleteUserPasswordResetToken(email: string): Promise<void> {
		await this.passwordResetTokenRepository.deleteUserPasswordResetToken(email);
	}
}

export {PasswordResetTokenService};
