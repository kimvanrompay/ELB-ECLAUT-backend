import {
	PasswordResetTokenDBSchema,
	type PasswordResetTokenDBType,
	PasswordResetTokenDTOSchema,
	type PasswordResetTokenDTOType,
} from './password-reset-token.schema';

class PasswordResetToken {
	email: string;
	token: string;
	hashedToken: string;
	createdAt: Date;
	expiresAt: Date;

	static schemas = {
		PasswordResetTokenDTOSchema: PasswordResetTokenDTOSchema,
		PasswordResetTokenDBSchema: PasswordResetTokenDBSchema,
	};

	constructor(
		email: string,
		token: string,
		hashedToken: string,
		createdAt: Date,
		expiresAt: Date
	) {
		this.email = email;
		this.token = token;
		this.hashedToken = hashedToken;
		this.createdAt = createdAt;
		this.expiresAt = expiresAt;
	}

	isExpired(): boolean {
		return this.expiresAt.getTime() < Date.now();
	}

	static fromDBType(data: PasswordResetTokenDBType): PasswordResetToken {
		return new PasswordResetToken(
			data.email,
			'UNKNOWN', // Token is not stored in the DB type
			data.token,
			new Date(data.created_at),
			new Date(data.expires_at)
		);
	}

	toJSON(): PasswordResetTokenDTOType {
		// Do not expose the hashed token in the response
		return {
			email: this.email,
			token: this.token, // This is the unhashed token needed to create a reset link
			createdAt: this.createdAt.toISOString(),
			expiresAt: this.expiresAt.toISOString(),
		};
	}

	toDBType(): PasswordResetTokenDBType {
		return {
			email: this.email,
			token: this.hashedToken,
			created_at: this.createdAt.toISOString(),
			expires_at: this.expiresAt.toISOString(),
		};
	}
}

export {PasswordResetToken};

export type {PasswordResetTokenDTOType, PasswordResetTokenDBType};
