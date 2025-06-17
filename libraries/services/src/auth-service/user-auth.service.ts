import {compare} from 'bcrypt';
import dayjs from 'dayjs';

import {
	ForbiddenError,
	NotFoundError,
	RefreshTokenMultiUsageError,
	UnauthorizedError,
} from '@lib/errors';
import {AppUser} from '@lib/models/app-user';
import type {LoginVerificationCode} from '@lib/models/login-verification-code';
import type {PinoLogger} from '@lib/utils';

import type {IAppUserService} from '../app-user-service/app-user.service.types';
import {JwtAuthService} from '../jwt-service/jwt.service';
import type {IJwtService} from '../jwt-service/jwt.service.types';
import type {ILoginVerificationCodeService} from '../login-verification-code-service/login-verification-code.service.types';
import type {IPasswordResetTokenService} from '../password-reset-token-service/password-reset-token.service.types';
import type {ITenantLocationService} from '../tenant-location-service/tenant-location.service.types';

const ACCESS_TOKEN_EXPIRATION_MINUTES = 15;
const REFRESH_TOKEN_EXPIRATION_DAYS = 31;

class UserAuthService {
	private logger: PinoLogger;

	constructor(
		private jwtService: IJwtService,
		private appUserService: IAppUserService,
		private tenantLocationService: ITenantLocationService,
		private loginVerificationCodeService: ILoginVerificationCodeService,
		private passwordResetTokenService: IPasswordResetTokenService,
		private context: {logger: PinoLogger}
	) {
		this.logger = context.logger.getChildLogger(
			{
				name: 'user-auth-service',
			},
			{}
		);
	}

	async getJwtTokensByUser(user: AppUser) {
		if (user.isBlocked) {
			throw new UnauthorizedError('User is blocked');
		}

		try {
			const locations =
				await this.tenantLocationService.findTenantLocationsByUserId(user.id);

			const now = dayjs();
			const newTokens = await this.jwtService.createTokens({
				userId: user.id,
				email: user.email,
				securityGroup: user.securityGroup,
				tenantId: user.tenant.id,
				locationIds: locations.map((l) => l.id),
			});

			return {
				user,
				accessToken: newTokens.accessToken,
				refreshToken: newTokens.refreshToken,
				accessTokenExpiration: now
					.add(ACCESS_TOKEN_EXPIRATION_MINUTES, 'minute')
					.toDate(),
				refreshTokenExpiration: now
					.add(REFRESH_TOKEN_EXPIRATION_DAYS, 'day')
					.toDate(),
			};
		} catch (e) {
			this.logger.error(e.message);
			throw new UnauthorizedError('Failed to create new tokens');
		}
	}

	async getJwtTokensByEmail(email: string) {
		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			throw new NotFoundError('User not found');
		}

		return this.getJwtTokensByUser(user);
	}

	async refreshUserJwtTokens(
		token: Awaited<
			ReturnType<
				typeof JwtAuthService.prototype.authenticateRefreshToken<{
					id: string;
					userId: string;
					email: string;
					securityGroup: string;
					tenantId: string;
					locationIds: string[];
				}>
			>
		>
	) {
		const {dbToken, verifiedToken} = token;

		if (dbToken.usageCount > 0) {
			try {
				await this.appUserService.blockUser(dbToken.userId!);
				await this.jwtService.invalidateAllRefreshTokensForUser(
					dbToken.userId!
				);
				// TODO: notify user and/or tenant admin that the user is possibly compromised.
			} catch {
				// Do nothing
			}
			throw new RefreshTokenMultiUsageError(dbToken);
		}

		await this.jwtService.updateRefreshTokenUsageCount(dbToken.id);

		return this.getJwtTokensByEmail(verifiedToken.email);
	}

	async startAuthenticationWithCode(
		email: string
	): Promise<LoginVerificationCode> {
		const user = await this.appUserService.getUserByEmail(email);

		if (user?.isBlocked) {
			// TODO: Consider not throwing an error here to not expose user exists when blocked
			throw new ForbiddenError('User is blocked');
		}

		return await this.loginVerificationCodeService.getNewLoginVerificationCode(
			email,
			user
		);
	}

	async authenticateCode(
		email: string,
		code: string
	): Promise<{
		user: AppUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
	}> {
		const isValid =
			await this.loginVerificationCodeService.verifyLoginVerificationCode(
				email,
				code
			);

		if (!isValid) {
			throw new UnauthorizedError('Invalid code or user not found');
		}

		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			this.logger.debug(`User with email ${email} not found`);
			throw new UnauthorizedError('Invalid code or user not found');
		}

		await this.loginVerificationCodeService.deleteUserLoginVerificationCodes(
			email
		);

		const tokens = await this.getJwtTokensByUser(user);

		await this.appUserService.updateUserLastLogin(user.id);

		return tokens;
	}

	async sendPasswordResetEmail(email: string): Promise<void> {
		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			this.logger.debug(`User with email ${email} not found`);
			throw new UnauthorizedError('User not found');
		}

		if (user.isBlocked) {
			this.logger.debug(`User with email ${email} is blocked`);
			throw new UnauthorizedError('User is blocked');
		}

		if (!user.settings.allowPasswordLogin) {
			this.logger.debug(`User with email ${email} has password login disabled`);
			throw new UnauthorizedError('Password login is disabled for this user');
		}

		await this.passwordResetTokenService.createNewPasswordResetToken(
			email,
			user
		);
	}

	async validatePasswordReset(email: string, token: string): Promise<AppUser> {
		const isValid =
			await this.passwordResetTokenService.verifyPasswordResetToken(
				email,
				token
			);

		if (!isValid) {
			this.logger.debug(`Invalid password reset token for email ${email}`);
			throw new UnauthorizedError('Invalid password reset token');
		}

		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			this.logger.debug(`User with email ${email} not found`);
			throw new UnauthorizedError('Invalid password reset token');
		}

		return user;
	}

	async updateUserPassword(
		email: string,
		token: string,
		newPassword: string
	): Promise<AppUser> {
		const user = await this.validatePasswordReset(email, token);

		if (user.isBlocked) {
			this.logger.debug(`User with email ${email} is blocked`);
			throw new UnauthorizedError('User is blocked');
		}

		if (!user.settings.allowPasswordLogin) {
			this.logger.debug(`User with email ${email} has password login disabled`);
			throw new UnauthorizedError('Password login is disabled for this user');
		}

		await this.appUserService.updateUserPassword(user.id, newPassword);
		await this.passwordResetTokenService.deleteUserPasswordResetToken(email);

		return user;
	}

	async authenticateUserPassword(
		email: string,
		password: string
	): Promise<{
		user: AppUser;
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
	}> {
		const user = await this.appUserService.getUserByEmail(email);

		if (!user) {
			this.logger.debug(`User with email ${email} not found`);
			throw new UnauthorizedError(
				'Either user not found or invalid credentials'
			);
		}

		if (user.isBlocked) {
			this.logger.debug(`User with email ${email} is blocked`);
			throw new UnauthorizedError(
				'Either user not found or invalid credentials'
			);
		}

		if (!user.settings.allowPasswordLogin) {
			this.logger.debug(`User with email ${email} has password login disabled`);
			throw new UnauthorizedError('Password login is disabled for this user');
		}

		const isValidPassword = await compare(password, user.hashedPassword);

		if (!isValidPassword) {
			this.logger.debug(`Invalid password for user with email ${email}`);
			throw new UnauthorizedError(
				'Either user not found or invalid credentials'
			);
		}

		const tokens = await this.getJwtTokensByUser(user);
		await this.appUserService.updateUserLastLogin(user.id);
		return {
			user,
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			accessTokenExpiration: tokens.accessTokenExpiration,
			refreshTokenExpiration: tokens.refreshTokenExpiration,
		};
	}
}

export {UserAuthService};
