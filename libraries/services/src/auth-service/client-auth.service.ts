import {compare} from 'bcrypt';
import dayjs from 'dayjs';

import {
	NotFoundError,
	RefreshTokenMultiUsageError,
	UnauthorizedError,
} from '@lib/errors';
import type {Client} from '@lib/models/client';
import {PinoLogger} from '@lib/utils';

import type {IClientService} from '../client-service/client.service.types';
import {JwtAuthService} from '../jwt-service/jwt.service';
import type {IJwtService} from '../jwt-service/jwt.service.types';
import type {AppContext, ITenantLocationService} from '../types';
import {ACCESS_TOKEN_EXPIRATION_MINUTES, REFRESH_TOKEN_EXPIRATION_DAYS} from './auth.service.constants';

class ClientAuthService {
	private logger: PinoLogger;

	constructor(
		private jwtService: IJwtService,
		private clientService: IClientService,
		private tenantLocationService: ITenantLocationService,
		private context: AppContext
	) {
		this.logger = context.logger.getChildLogger(
			{
				name: 'client-auth-service',
			},
			{}
		);
	}

	async refreshClientJwtTokens(
		token: Awaited<
			ReturnType<
				typeof JwtAuthService.prototype.authenticateRefreshToken<{
					id: string;
					clientId: string;
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
				await this.clientService.blockClient(dbToken.clientId!);
				await this.jwtService.invalidateAllRefreshTokensForClient(
					dbToken.clientId!
				);
			} catch {
				// Do nothing
			}
			throw new RefreshTokenMultiUsageError(dbToken);
		}
		await this.jwtService.updateRefreshTokenUsageCount(dbToken.id);
		return this.getJwtTokensByClientId(verifiedToken.clientId);
	}

	async getJwtTokensByClient(client: Client) {
		if (client.isBlocked) {
			throw new UnauthorizedError('Client is blocked');
		}

		try {
			const locations =
				await this.tenantLocationService.findTenantLocationsByClientId(
					client.id
				);

			const now = dayjs();
			const newTokens = await this.jwtService.createTokens({
				clientId: client.id,
				securityGroup: client.securityGroup,
				tenantId: client.tenantId,
				locationIds: locations.map((l) => l.id),
			});

			return {
				client,
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

	async getJwtTokensByClientId(clientId: string) {
		const client = await this.clientService.getClientById(clientId);

		if (!client) {
			throw new NotFoundError('Client not found');
		}

		return this.getJwtTokensByClient(client);
	}

	private async verifyClientSecret(
		client: Client,
		clientSecret: string
	): Promise<boolean> {
		return compare(clientSecret, client.secret);
	}

	async authenticateClient(
		clientId: string,
		clientSecret: string
	): Promise<{
		accessToken: string;
		refreshToken: string;
		accessTokenExpiration: Date;
		refreshTokenExpiration: Date;
		client: Client;
	}> {
		const client = await this.clientService.getClientById(clientId);

		if (!client) {
			this.logger.debug(`Client with ID ${clientId} not found`);
			throw new UnauthorizedError(
				'Either client not found or invalid credentials'
			);
		}

		if (client.isBlocked) {
			this.logger.debug(`Client with ID ${clientId} is blocked`);
			throw new UnauthorizedError(
				'Either client not found or invalid credentials'
			);
		}

		const isVerifiedSecret = await this.verifyClientSecret(
			client,
			clientSecret
		);

		if (!isVerifiedSecret) {
			throw new UnauthorizedError(
				'Either client not found or invalid credentials'
			);
		}

		const tokens = await this.getJwtTokensByClient(client);

		await this.clientService.updateClientLastLogin(client.id);

		return tokens;
	}
}

export {ClientAuthService};
