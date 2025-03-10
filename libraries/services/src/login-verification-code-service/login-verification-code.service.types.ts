import {LoginVerificationCode} from '@lib/models/login-verification-code';

interface ILoginVerificationCodeService {
	getNewLoginVerificationCode(email: string): Promise<LoginVerificationCode>;

	encryptLoginVerificationCode(code: string): Promise<string>;

	verifyLoginVerificationCode(email: string, code: string): Promise<boolean>;

	deleteUserLoginVerificationCodes(email: string): Promise<void>;

	deleteExpiredLoginVerificationCodes(): Promise<void>;
}

export type {ILoginVerificationCodeService};
