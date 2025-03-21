type RefreshTokenDBType = {
	id: string;
	user_id: string;
	usage_count: number;
	created_at: Date;
};

/**
 * A refresh token model doesn't actually contain the token itself, but rather the metadata.
 * Storing the token itself in the model would be a security risk.
 * and the token is very long.
 */
class RefreshToken {
	id: string;
	userId: string;
	usageCount: number;
	createdAt: Date;

	constructor(
		token: string,
		userId: string,
		usageCount: number,
		createdAt: Date
	) {
		this.id = token;
		this.userId = userId;
		this.usageCount = usageCount;
		this.createdAt = createdAt;
	}

	static fromDBType(data: RefreshTokenDBType): RefreshToken {
		return new RefreshToken(
			data.id,
			data.user_id,
			data.usage_count,
			data.created_at
		);
	}
}

export {RefreshToken};

export type {RefreshTokenDBType};
