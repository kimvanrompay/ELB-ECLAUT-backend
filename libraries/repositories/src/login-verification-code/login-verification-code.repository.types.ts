import {
	LoginVerificationCode,
	type LoginVerificationCodeDBType,
} from '@lib/models/login-verification-code';

interface ILoginVerificationCodeRepository {
	createLoginVerificationCode(
		verificationCode: LoginVerificationCodeDBType
	): Promise<LoginVerificationCode>;

	findValidLoginVerificationCodes(
		email: string
	): Promise<LoginVerificationCode[]>;

	removeExpiredLoginVerificationCodes(): Promise<void>;

	deleteUserLoginVerificationCodes(email: string): Promise<void>;
}

export type {ILoginVerificationCodeRepository};
