import {NotFoundError} from '@lib/errors';
import type {GameSession} from '@lib/models/game-session';
import {PlayerZoneLeaderboard} from '@lib/models/player-zone-leaderboard';
import {PlayerZonePlayer} from '@lib/models/player-zone-player';
import type {Playfield} from '@lib/models/playfield';
import type {IGameSessionRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils/logger';
import {StrivecloudAdapter} from '@lib/utils/strivecloud-adapter';

import type {MqttService} from '../mqtt-service/mqtt.service';
import type {IPlayfieldService} from '../playfield-service/playfield.service.types';
import type {AuthenticatedAppContext} from '../types';
import type {IPlayerZoneService} from './player-zone.service.types';

/*
TODO:

Just some notes...

Who is going to keep the progression of the game itself? For example, the seasons of GoT and which cards are unlock in the current playthrough?
In case we save this, we need to get the player id to save it.

 */

class PlayerZoneService implements IPlayerZoneService {
	private logger: PinoLogger;
	private strivecloudAdapter: typeof StrivecloudAdapter;

	private sendGameResultBuffer: Map<string, NodeJS.Timeout> = new Map();

	constructor(
		private playfieldService: IPlayfieldService,
		private gameSessionRepository: IGameSessionRepository,
		private mqttService: MqttService,
		context: AuthenticatedAppContext
	) {
		this.playfieldService = playfieldService;
		this.strivecloudAdapter = StrivecloudAdapter;

		this.logger = context.logger.getChildLogger(
			{
				name: 'player-zone-service',
			},
			{}
		);
	}

	private getPlayfieldById(playfieldId: string) {
		return this.playfieldService.getPlayfieldById(playfieldId);
	}

	private async getGameSession(gameSessionId: string) {
		const session =
			await this.gameSessionRepository.getGameSessionById(gameSessionId);

		// TODO: what if we didnt receive the session yet? do we create a new one? Check if latest game is still active in this case

		if (!session) {
			this.logger.error(`Game session with ID ${gameSessionId} not found`);
			throw new NotFoundError('Game session not found');
		}

		return session;
	}

	private async hasPlayerGotActiveGameSessions(
		playerId: string
	): Promise<boolean> {
		const sessions = await this.gameSessionRepository.findGameSessions({
			where: [
				{
					type: 'eq',
					columnName: 'player_id',
					value: playerId,
				},
				{
					type: 'eq',
					columnName: 'ended_at',
					value: null,
				},
				{
					type: 'gt',
					columnName: 'created_at',
					value: new Date(Date.now() - 4 * 60 * 60 * 1000), // Only sessions created in the last 4 hours
				},
			],
		});

		return sessions.length > 0;
	}

	private async assignPlayerToGameSession(
		gameSession: GameSession,
		playerId: string
	): Promise<GameSession> {
		if (gameSession.playerId) {
			this.logger.warn(
				`Game session with ID ${gameSession.id} already has a player assigned`
			);
			return gameSession;
		}

		return await this.gameSessionRepository.createOrUpdateGameSession({
			id: gameSession.id,
			tenant_id: gameSession.tenantId,
			tenant_location_id: gameSession.tenantLocationId,
			playfield_id: gameSession.playfieldId,
			updated_at: new Date(),
			player_id: playerId,
		});
	}

	private async sendGameSessionToPlayfield(
		playfield: Playfield,
		gameSession: GameSession,
		player: {
			username: string;
			profilePicture: string;
			language: string;
			birthDate?: string;
		}
	): Promise<void> {
		await this.mqttService.sendMessageToTopic(
			`${playfield.cabinet.serialNumber}/${playfield.id}/mgmt/session-init`,
			{
				gameSessionId: gameSession.id,
				player: {
					id: gameSession.playerId,
					username: player.username,
					avatar: player.profilePicture,
					language: player.language,
					birthDate: player.birthDate,
				},
				progress: {
					something: 'something',
				},
			}
		);
	}

	public async initialiseSessionOnPlayfield(
		playfieldId: string,
		playerId: string,
		gameSessionId: string,
		progress: Record<string, unknown> // TODO
	) {
		const player = await this.strivecloudAdapter.getPlayerProfile(playerId);

		if (!player) {
			throw new NotFoundError(`Player not found for ID: ${playerId}`);
		}

		const playfield = await this.getPlayfieldById(playfieldId);
		if (!playfield) {
			throw new NotFoundError('Playfield not found');
		}

		const gameSession = await this.getGameSession(gameSessionId);

		if (!gameSession) {
			throw new NotFoundError('Game session not found');
		}

		// if (gameSession.playerId) {
		// 	throw new Error('Game session already has a player assigned');
		// }

		const updatedGameSession = await this.assignPlayerToGameSession(
			gameSession,
			playerId
		);

		if (gameSession.endedAt !== undefined && gameSession.endedAt !== null) {
			// TODO: send result to StriveCloud with buffer!
			return;
		}

		// const hasActiveSessions =
		// 	await this.hasPlayerGotActiveGameSessions(playerId);
		//
		// // TODO: Do we either end the previous session or prevent the player from starting a new one?
		// if (hasActiveSessions) {
		// 	throw new Error(
		// 		`Player with ID ${playerId} already has an active game session`
		// 	);
		// }

		// TODO: check if the stat + leaderboard exists for the playfield's cabinet?

		await this.sendGameSessionToPlayfield(playfield, updatedGameSession, {
			username: player.username,
			profilePicture: player.profilePicture,
			language: player.language,
			birthDate: player.birthDate,
		});
	}

	public async getPlayerProfile(playerId: string): Promise<PlayerZonePlayer> {
		const striveCloudProfile =
			await this.strivecloudAdapter.getPlayerProfile(playerId);

		if (!striveCloudProfile) {
			throw new NotFoundError(`Player not found for ID: ${playerId}`);
		}

		return new PlayerZonePlayer(
			striveCloudProfile.id,
			striveCloudProfile.username,
			striveCloudProfile.profilePicture,
			striveCloudProfile.language,
			striveCloudProfile.birthDate
				? new Date(striveCloudProfile.birthDate)
				: undefined
		);
	}

	public async getMachineLeaderboard(
		serialNumber: string
	): Promise<PlayerZoneLeaderboard> {
		const striveCloudLeaderboard =
			await this.strivecloudAdapter.getMachineLeaderboard(serialNumber);

		if (!striveCloudLeaderboard) {
			throw new NotFoundError(
				`Leaderboard not found for serial: ${serialNumber}`
			);
		}

		return new PlayerZoneLeaderboard(
			serialNumber,
			striveCloudLeaderboard.map((ranking) => ({
				playerId: ranking.userId,
				username: ranking.name,
				avatar: ranking.profilePicture,
				score: ranking.amount,
				percentage: ranking.percentage,
				position: ranking.position,
			}))
		);
	}

	public async createMachineLeaderboard(
		serialNumber: string,
		leaderboardData: Record<string, any>
	): Promise<void> {
		return this.strivecloudAdapter.createMachineLeaderboard(
			serialNumber,
			leaderboardData
		);
	}

	private async shouldSendGameResult(
		gameSession: GameSession
	): Promise<boolean> {
		if (!gameSession || !gameSession.playerId) {
			return false;
		}

		// TODO: FILTER out gametypes?

		return false;
	}

	public async processGameResult(
		gameSesssionOrId: string | GameSession
	): Promise<void> {
		const gameSession: GameSession =
			typeof gameSesssionOrId === 'string'
				? await this.getGameSession(gameSesssionOrId)
				: gameSesssionOrId;

		if (!gameSession || !gameSession.playerId) {
			return;
		}

		if (!(await this.shouldSendGameResult(gameSession))) {
			return;
		}

		const ticketsCollectedResultFromSession =
			gameSession.result?.tickets_collected;

		let ticketsCollectedAsNumber = 0;
		if (typeof ticketsCollectedResultFromSession === 'number') {
			ticketsCollectedAsNumber = ticketsCollectedResultFromSession;
		}
		if (typeof ticketsCollectedResultFromSession === 'string') {
			ticketsCollectedAsNumber = parseInt(ticketsCollectedResultFromSession);
		}

		if (Number.isNaN(ticketsCollectedAsNumber)) {
			ticketsCollectedAsNumber = 0;
		}

		const sendGameResultBufferKey = `${gameSession.playerId}-${gameSession.id}`;

		const existingBuffer = this.sendGameResultBuffer.get(
			sendGameResultBufferKey
		);

		if (existingBuffer) {
			clearTimeout(existingBuffer);
		}

		this.sendGameResultBuffer.set(
			sendGameResultBufferKey,
			setTimeout(async () => {
				this.sendGameResultBuffer.delete(sendGameResultBufferKey);

				await this.strivecloudAdapter.sendGameResult(gameSession.playerId!, {
					gameSessionId: gameSession.id,
					ticketsCollected: ticketsCollectedAsNumber,
					serialNumber: gameSession.serialNumber,
					playfieldId: gameSession.playfieldId,
				});
			}, 10000)
		);

		return;
	}
}

export {PlayerZoneService};
