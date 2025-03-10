import {
	LoginVerificationCodeDBSchema,
	type LoginVerificationCodeDBType,
	LoginVerificationCodeDTOSchema,
	type LoginVerificationCodeDTOType,
} from './login-verification-code.schema';

class LoginVerificationCode {
	code: string;
	hashedCode: string;
	email: string;
	createdAt: Date;
	expiresAt: Date;

	static schemas = {
		LoginVerificationCodeDTOSchema,
		LoginVerificationCodeDBSchema,
	};

	constructor(
		code: string,
		hashedCode: string,
		email: string,
		createdAt: Date,
		expiresAt: Date
	) {
		this.code = code;
		this.hashedCode = hashedCode;
		this.email = email;
		this.createdAt = createdAt;
		this.expiresAt = expiresAt;
	}

	isExpired(): boolean {
		return this.expiresAt.getTime() < Date.now();
	}

	static fromDBType(data: LoginVerificationCodeDBType): LoginVerificationCode {
		return new LoginVerificationCode(
			data.code,
			data.code,
			data.email,
			new Date(data.created_at),
			new Date(data.expires_at)
		);
	}

	toJSON(): LoginVerificationCodeDTOType {
		// Do not expose the code in the response
		return {
			email: this.email,
			createdAt: this.createdAt.toISOString(),
			expiresAt: this.expiresAt.toISOString(),
		};
	}

	toDBType(): LoginVerificationCodeDBType {
		return {
			code: this.hashedCode,
			email: this.email,
			created_at: this.createdAt.toISOString(),
			expires_at: this.expiresAt.toISOString(),
		};
	}
}

export {LoginVerificationCode};

export type {LoginVerificationCodeDTOType, LoginVerificationCodeDBType};
