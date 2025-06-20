import {v4 as uuid} from 'uuid';

import {NotFoundError} from '@lib/errors';
import type {IRefreshTokenRepository} from '@lib/repositories/types';
import {generateJwtToken, verifyJwtToken} from '@lib/utils/jwt';

import type {IJwtService} from './jwt.service.types';

class JwtAuthService implements IJwtService {
	private readonly secretKey: Uint8Array;
	private readonly issuer: string;
	private readonly audience: string;
	private readonly accessTokenExpiration: string;
	private readonly refreshTokenExpiration: string;
	private readonly refreshTokenRepository: IRefreshTokenRepository;

	constructor(
		refreshTokenRepository: IRefreshTokenRepository,
		options: {
			secretSeed: string;
			issuer: string;
			audience: string;
			accessTokenExpiration: string;
			refreshTokenExpiration: string;
		}
	) {
		this.refreshTokenRepository = refreshTokenRepository;

		const {
			secretSeed,
			issuer,
			audience,
			accessTokenExpiration,
			refreshTokenExpiration,
		} = options;
		// Symmetric key for JWT encryption
		this.secretKey = new TextEncoder().encode(secretSeed);
		this.issuer = issuer;
		this.audience = audience;
		this.accessTokenExpiration = accessTokenExpiration;
		this.refreshTokenExpiration = refreshTokenExpiration;
	}

	async authenticate<Data extends {userId: string}>(jwtToken: string) {
		return this.verifyJwtToken<Data>(jwtToken);
	}

	async authenticateRefreshToken<Data extends {userId: string; id: string}>(
		token: string
	) {
		const verifiedToken = await this.verifyJwtToken<Data>(token);
		const refreshToken = await this.getRefreshTokenById(verifiedToken.id);

		if (!refreshToken) {
			throw new NotFoundError('Refresh does not exist');
		}

		return {
			dbToken: refreshToken,
			verifiedToken,
		};
	}

	async createTokens(data: {userId: string; [key: string]: string}) {
		const accessToken = await this.createAccessToken(data);
		const refreshToken = await this.createRefreshToken(data);

		return {accessToken, refreshToken};
	}

	async createAccessToken<Data extends {userId: string}>(data: Data) {
		return this.generateJwtToken(data, {
			expiresIn: this.accessTokenExpiration,
		});
	}

	async getRefreshTokenById(id: string) {
		try {
			return await this.refreshTokenRepository.getRefreshTokenById(id);
		} catch (e) {
			console.error(e);
			throw new NotFoundError('No refresh token found');
		}
	}

	async createRefreshToken<Data extends {userId: string}>(data: Data) {
		const id = uuid();

		const token = await this.generateJwtToken(
			{
				...data,
				id,
			},
			{
				expiresIn: this.refreshTokenExpiration,
			}
		);

		await this.refreshTokenRepository.createRefreshToken({
			id,
			userId: data.userId,
			usageCount: 0,
			createdAt: new Date(),
		});

		return token;
	}

	async updateRefreshTokenUsageCount(id: string) {
		return this.refreshTokenRepository.updateRefreshTokenUsageCount(id);
	}

	async invalidateRefreshToken(refreshToken: string) {
		const parsedRefreshToken =
			await this.authenticateRefreshToken(refreshToken);
		await this.updateRefreshTokenUsageCount(parsedRefreshToken.dbToken.id);
	}

	async invalidateAllRefreshTokensForUser(userId: string) {
		return this.refreshTokenRepository.invalidateAllRefreshTokensForUser(
			userId
		);
	}

	private async generateJwtToken<Data extends {userId: string}>(
		data: Data,
		options: {
			expiresIn: string;
		}
	) {
		// Generate JWT token
		return await generateJwtToken(data, {
			issuer: this.issuer,
			audience: this.audience,
			secretKey: this.secretKey,
			expiresIn: options.expiresIn,
		});
	}

	private async verifyJwtToken<Data extends {userId: string}>(token: string) {
		return await verifyJwtToken<Data>(
			token,
			this.secretKey,
			this.issuer,
			this.audience
		);
	}
}

export {JwtAuthService};
