import type {AppUser} from '@lib/models/app-user';
import {LoginVerificationCode} from '@lib/models/login-verification-code';

interface ILoginVerificationCodeService {
	getNewLoginVerificationCode(
		email: string,
		user?: AppUser | null | undefined
	): Promise<LoginVerificationCode>;

	encryptLoginVerificationCode(code: string): Promise<string>;

	verifyLoginVerificationCode(email: string, code: string): Promise<boolean>;

	deleteUserLoginVerificationCodes(email: string): Promise<void>;

	deleteExpiredLoginVerificationCodes(): Promise<void>;
}

export type {ILoginVerificationCodeService};
