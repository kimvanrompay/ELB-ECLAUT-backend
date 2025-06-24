// @ts-nocheck
import {Mutex} from 'async-mutex';

import {getAwsSecret} from './aws-secret-manager';

class StrivecloudAdapter {
	private authMutex: Mutex;

	private isAuthenticated: boolean = false;
	#authToken: string | null = null;
	#authTokenExpiresAt: Date | null = null;

	constructor() {
		this.authMutex = new Mutex();
	}

	private getBaseUrl(): string {
		return 'https://api.elaut-staging.strivecloud.io/api';
	}

	private async getCredentials() {
		const secret = await getAwsSecret<{
			username: string;
			password: string;
		}>('dev/strivecloud-credentials');

		if (!secret || !secret.username || !secret.password) {
			throw new Error('Strivecloud credentials are not set');
		}

		return {
			username: 'no-reply@eclaut.com',
			password: 'Den-E-claut-1!',
		};
	}

	private async fetchAuthToken(): Promise<string> {
		const {username, password} = await this.getCredentials();
		const response = await fetch(`${this.getBaseUrl()}/auth/generateToken`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, password}),
		});

		if (!response.ok) {
			throw new Error('Failed to fetch auth token from Strivecloud');
		}

		const data = (await response.json()) as {token: string};

		console.log('Strivecloud auth token fetched successfully', data);

		if (!data || !data.token) {
			throw new Error('Auth token not found in Strivecloud response');
		}

		return data.token;
	}

	private async ensureAuthenticated(): Promise<void> {
		console.log('Ensuring Strivecloud authentication...', this.isAuthenticated);
		if (this.isAuthenticated) {
			return;
		}

		const release = await this.authMutex.acquire();
		try {
			if (
				!this.#authToken ||
				!this.#authTokenExpiresAt ||
				this.#authTokenExpiresAt < new Date()
			) {
				this.#authToken = await this.fetchAuthToken();
				this.#authTokenExpiresAt = new Date(Date.now() + 3600 * 1000); // Token valid for 1 hour
			}
			this.isAuthenticated = true;
		} finally {
			release();
		}
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
		authenticateOn401: boolean = true
	): Promise<T> {
		try {
			await this.authMutex.waitForUnlock();

			const firstResponse = await fetch(`${this.getBaseUrl()}${endpoint}`, {
				...options,
				headers: {
					...options.headers,
					Authorization: `Bearer ${this.#authToken}`,
				},
			});

			if (firstResponse.status === 401 && authenticateOn401) {
				this.isAuthenticated = false; // Mark as unauthenticated

				// If unauthorized, refresh the token and retry
				await this.ensureAuthenticated();

				if (!this.isAuthenticated) {
					throw new Error('Failed to authenticate with Strivecloud');
				}

				// Retry the request with the new token
				return this.request<T>(endpoint, options, false);
			}

			console.log(firstResponse);
			if (!firstResponse.ok) {
				throw new Error(
					`Strivecloud request failed with status ${firstResponse.status}`
				);
			}

			return (await firstResponse.json()) as T;
		} catch (error) {
			throw new Error(`Strivecloud request failed: ${error.message}`);
		}
	}

	async getPlayerProfile(playerId: string) {
		try {
			await this.ensureAuthenticated();
			const result = await this.request<{
				id: string;
				username: string;
				description: string;
				email: string;
				country: string;
				city: string;
				postalCode: string;
				birthDate: string;
				language: string;
				profilePicture: string;
			}>(`/users/profile/${playerId}`);

			if (!result || !result.id) {
				return undefined;
			}

			return result;
		} catch {
			return undefined;
		}
	}

	async getMachineLeaderboard(serialNumber: string) {
		try {
			await this.ensureAuthenticated();
			const response = await this.request<{
				rankings: {
					userId: string;
					name: string;
					profilePicture: string;
					amount: number;
					percentage: number;
					position: number;
				}[];
			}>(`/statLeaderboard/rankings/?statLeaderboardId=${serialNumber}`);

			if (!response || !response.rankings) {
				return undefined;
			}

			return response.rankings.sort((a, b) => a.position - b.position);
		} catch {
			return undefined;
		}
	}

	async registerMachine(serialNumber: string): Promise<any> {
		await this.ensureAuthenticated();
		return this.request(`/stats/${serialNumber}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: serialNumber,
				description: `Machine with serial number ${serialNumber}`,
				categoryId: '6850ffbfde1d6f00019d0df6',
			}),
		});
	}

	async createMachineLeaderboard(
		serialNumber: string,
		leaderboardData: Record<string, any>
	): Promise<any> {
		await this.ensureAuthenticated();

		// return this.request(`/stats`)
		return this.request(`/stats/leaderboard/${serialNumber}/leaderboard`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(leaderboardData),
		});
	}

	async getStatsForUser(userId: string): Promise<any> {
		await this.ensureAuthenticated();
		return this.request(`/stats/getStatsForUser/${userId}`);
	}

	async sendGameResult(
		playerId: string,
		progressionData: {
			gameSessionId: string;
			serialNumber: string;
			playfieldId: string;
			ticketsCollected: number;
			seasonIndex?: number;
			charsCollected?: string[];
			[key: string]: any;
		}
	): Promise<any> {
		await this.ensureAuthenticated();

		const body = {
			event: 'test_machine_results',
			dt: new Date().toISOString(),
			userId: playerId,
			data: {
				// game_session_id: progressionData.gameSessionId,
				// machine_id: progressionData.serialNumber,
				// playfield_id: progressionData.playfieldId,
				tickets_collected: progressionData.ticketsCollected,
				// season_index: progressionData.seasonIndex ?? 0,
				// chars_collected: progressionData.charsCollected ?? [],
			},
			deduplicationId: progressionData.gameSessionId,
		};

		return this.request(`/webhook/event/custom`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
	}
}

const strivecloudAdapter = new StrivecloudAdapter();

export {strivecloudAdapter as StrivecloudAdapter};
