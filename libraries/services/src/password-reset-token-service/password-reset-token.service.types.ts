import type {AppUser} from '@lib/models/app-user';
import type {PasswordResetToken} from '@lib/models/password-reset-token';

interface IPasswordResetTokenService {
	createNewPasswordResetToken(
		email: string,
		user?: AppUser | null | undefined
	): Promise<PasswordResetToken>;

	encryptPasswordResetToken(code: string): Promise<string>;

	verifyPasswordResetToken(email: string, token: string): Promise<boolean>;

	deleteUserPasswordResetToken(email: string): Promise<void>;

	deleteExpiredPasswordResetTokens(): Promise<void>;
}

export type {IPasswordResetTokenService};
