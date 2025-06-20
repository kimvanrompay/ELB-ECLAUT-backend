import {NotFoundError} from '@lib/errors';
import type {IGameSessionRepository} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

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

	constructor(
		private playfieldService: IPlayfieldService,
		private gameSessionRepository: IGameSessionRepository,
		private mqttService: MqttService,
		context: AuthenticatedAppContext
	) {
		this.playfieldService = playfieldService;
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

	async getGameSession(gameSessionId: string) {
		const session =
			await this.gameSessionRepository.getGameSessionById(gameSessionId);

		// TODO: what if we didnt receive the session yet? do we create a new one? Check if latest game is still active in this case

		if (!session) {
			this.logger.error(`Game session with ID ${gameSessionId} not found`);
			throw new NotFoundError('Game session not found');
		}

		return session;
	}

	public async initialiseSessionOnPlayfield(
		playfieldId: string,
		playerId: string,
		gameSessionId: string,
		progress: Record<string, unknown> // TODO: where do we get the progress from?
	) {
		const playfield = await this.getPlayfieldById(playfieldId);
		if (!playfield) {
			throw new NotFoundError('Playfield not found');
		}

		const gameSession = await this.getGameSession(gameSessionId);

		if (!gameSession) {
			throw new NotFoundError('Game session not found');
		}

		if (gameSession.endedAt !== undefined && gameSession.endedAt !== null) {
			throw new Error('Game session has already ended');
		}

		// TODO: add optional playerId to the game session
		// if (gameSession.playerId) {
		// 	throw new Error('Game session already has a player assigned');
		// }

		await this.mqttService.sendMessageToTopic(
			`${playfield.cabinet.serialNumber}/${playfieldId}/mgmt/session-init`,
			{
				playerId,
				gameSessionId,
				progress: {
					something: 'something',
				},
			}
		);
	}
}

export {PlayerZoneService};
