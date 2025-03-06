import {
	LoginVerificationCode,
	type LoginVerificationCodeDBType,
} from '@lib/models/login-verification-code';

interface ILoginVerificationCodeRepository {
	createLoginVerificationCode(
		verificationCode: LoginVerificationCodeDBType
	): Promise<LoginVerificationCode>;

	removeLoginVerificationCode(code: string): Promise<void>;

	getLoginVerificationCode(
		email: string,
		code: string
	): Promise<LoginVerificationCode | undefined>;

	removeExpiredLoginVerificationCodes(): Promise<void>;

	deleteLoginVerificationCode(email: string, code: string): Promise<void>;
}

export type {ILoginVerificationCodeRepository};
