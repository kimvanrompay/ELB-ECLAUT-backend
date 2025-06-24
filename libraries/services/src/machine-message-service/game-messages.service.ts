import {GamePaymentMethod} from '@lib/models/game-session';
import {
	MachineMessage,
	MachineMessageEventType,
} from '@lib/models/machine-message';
import type {
	IGameSessionRepository,
	IMachineLogRepository,
	IPlayfieldRepository,
	IPlayfieldStatsRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {WithRequired} from '@lib/utils/types';

import type {IPlayerZoneService} from '../player-zone-service/player-zone.service.types';

class GameMessagesService {
	private logger: PinoLogger;

	constructor(
		private gameSessionRepository: IGameSessionRepository,
		private playfieldRepository: IPlayfieldRepository,
		private machineLogRepository: IMachineLogRepository,
		private playfieldStatsRepository: IPlayfieldStatsRepository,
		// private playerZoneService: IPlayerZoneService,
		context: {logger: PinoLogger}
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'game-messages-service',
			},
			{}
		);
	}

	private async updatePlayfieldStats(playfieldId: string, date?: Date) {
		try {
			await this.playfieldStatsRepository.generateAndSavePlayfieldStatsForDate(
				playfieldId,
				date ?? new Date()
			);
		} catch (error) {
			// Don't fail the message processing if we can't update the stats.
			// We can always retry later or fix it manually. Having to retry the message is not ideal.
			// At the moment, the playfield stats are re-generated every time a message is processed. So it may automatically fix itself on the next game session message.
			this.logger.error(
				'Failed to update playfield stats after processing message',
				error
			);
		}
	}

	private getPaymentMethod(data: string): GamePaymentMethod {
		const methods = {
			c: GamePaymentMethod.COIN,
			b: GamePaymentMethod.BILL,
			l: GamePaymentMethod.CASHLESS,
			s: GamePaymentMethod.CARD,
		};

		return methods[data as keyof typeof methods] ?? GamePaymentMethod.OTHER;
	}

	private async handleMoneyInEventType(
		message: WithRequired<
			MachineMessage,
			'tenantId' | 'tenantLocationId' | 'playfieldId'
		>
	): Promise<boolean> {
		const {
			data,
			messageId,
			timestamp,
			serialNumber,
			playfieldId,
			tenantId,
			tenantLocationId,
		} = message;

		const validated =
			MachineMessage.schemas.MoneyInInputDataSchema.safeParse(data);

		if (!validated.success) {
			this.logger.error(
				`Invalid event data for money in event: ${validated.error}`
			);
			return false;
		}

		const validatedData = validated.data;

		try {
			await this.gameSessionRepository.transaction(async (trx) => {
				const scopedGameSessionRepository =
					this.gameSessionRepository.withTransaction(trx);
				const scopedMachineLogRepository =
					this.machineLogRepository.withTransaction(trx);
				const scopedPlayfieldRepository =
					this.playfieldRepository.withTransaction(trx);

				const playfield =
					await scopedPlayfieldRepository.getPlayfieldById(playfieldId);

				if (!playfield) {
					this.logger.error(
						`Playfield not found for money in event: ${playfieldId}`
					);
					return false;
				}

				await scopedGameSessionRepository.createOrUpdateGameSession({
					id: validatedData.i,
					tenant_id: tenantId,
					tenant_location_id: tenantLocationId,
					started_at: new Date(timestamp),
					playfield_id: playfieldId!,
					payment_method: this.getPaymentMethod(validatedData.t),
					amount_credits: validatedData.c,
					amount_money_in: validatedData.m, // Money in is always in cents so no need to adjust for float
					updated_at: new Date(),
					prize_id: playfield.prize?.id,
				});

				await scopedMachineLogRepository.createMachineLog({
					id: messageId,
					level: 'INFO',
					type: 'MONEY_IN',
					serial_number: serialNumber,
					playfield_id: playfieldId,
					timestamp: new Date(timestamp),
					data: {
						credits: validatedData.c,
						money_in: validatedData.m, // Money in is always in cents so no need to adjust for float
						payment_method: this.getPaymentMethod(validatedData.t),
					},
				});
			});
		} catch (error) {
			this.logger.error('Error handling money in event', error);
			return false;
		}

		await this.updatePlayfieldStats(playfieldId!, new Date(timestamp));

		return true;
	}

	private async handleSessionEndEventType(
		message: WithRequired<
			MachineMessage,
			'tenantId' | 'tenantLocationId' | 'playfieldId'
		>
	): Promise<boolean> {
		const {
			data,
			messageId,
			timestamp,
			serialNumber,
			playfieldId,
			tenantId,
			tenantLocationId,
		} = message;

		const validated =
			MachineMessage.schemas.SessionEndInputDataSchema.safeParse(data);

		if (!validated.success) {
			this.logger.error(
				`Invalid event data for session end event: ${validated.error}`
			);
			return false;
		}

		const validatedData = validated.data;

		try {
			await this.gameSessionRepository.transaction(async (trx) => {
				const scopedGameSessionRepository =
					this.gameSessionRepository.withTransaction(trx);
				const scopedMachineLogRepository =
					this.machineLogRepository.withTransaction(trx);
				const scopedPlayfieldRepository =
					this.playfieldRepository.withTransaction(trx);

				const {i: gameSessionId, ...result} = validatedData;

				const playfield =
					await scopedPlayfieldRepository.getPlayfieldById(playfieldId);

				if (!playfield) {
					this.logger.error(
						`Playfield not found for session end event: ${playfieldId}`
					);
					return false;
				}

				await scopedGameSessionRepository.createOrUpdateGameSession({
					id: gameSessionId,
					tenant_id: tenantId,
					tenant_location_id: tenantLocationId,
					ended_at: new Date(timestamp),
					playfield_id: playfieldId!,
					amount_money_out: validatedData.m, // Money out is always in cents so no need to adjust for float
					updated_at: new Date(),
					result: {
						...result,
					},
					prize_id: playfield.prize?.id,
				});

				await scopedMachineLogRepository.createMachineLog({
					id: messageId,
					level: 'INFO',
					type: 'SESSION_END',
					serial_number: serialNumber,
					playfield_id: playfieldId,
					timestamp: new Date(timestamp),
					data: {
						money_out: validatedData.m, // Money out is always in cents so no need to adjust for float
						...result,
					},
				});

				const gameSession =
					await scopedGameSessionRepository.getGameSessionById(gameSessionId);

				if (!gameSession) {
					this.logger.error(
						`Game session not found for session end event: ${gameSessionId}`
					);
					return false;
				}

				// if (gameSession.playerId) {
				// 	this.playerZoneService.updatePlayerProgression(gameSession.playerId, {
				// 		gameSessionId: gameSession.id,
				// 		playfieldId: playfieldId!,
				// 		ticketsCollected: validatedData.t || 0, // Default to 0 if not provided
				// 		seasonIndex: validatedData.s,
				// 		charsCollected: validatedData.c,
				// 	});
				// }
			});
		} catch (error) {
			this.logger.error('Error handling session end event', error);
			return false;
		}

		await this.updatePlayfieldStats(playfieldId!, new Date(timestamp));

		return true;
	}

	async handleMessage(message: MachineMessage): Promise<boolean> {
		const {data, eventType, playfieldId, tenantId, tenantLocationId} = message;

		if (!data) {
			this.logger.error('No data for money in event', message);
			return false;
		}

		if (!tenantId || !tenantLocationId) {
			this.logger.error('No tenant or location for money in event', message);
			return false;
		}

		if (!playfieldId) {
			this.logger.error('No playfield for money in event', message);
			return false;
		}

		const validatedMessage = message as WithRequired<
			MachineMessage,
			'tenantId' | 'tenantLocationId' | 'playfieldId'
		>;

		switch (eventType) {
			case MachineMessageEventType.MONEY_IN:
				return this.handleMoneyInEventType(validatedMessage);
			case MachineMessageEventType.SESSION_END:
				return this.handleSessionEndEventType(validatedMessage);
			default:
				this.logger.warn('Unhandled game event type', message);
				return false;
		}
	}
}

export {GameMessagesService};
