import type {Cabinet} from '@lib/models/cabinet';
import {
	MachineMessage,
	MachineMessageEventType,
} from '@lib/models/machine-message';
import {MachineMessageRepository} from '@lib/repositories/machine-message';
import type {
	ICabinetRepository,
	IGameSessionRepository,
	IMachineLogRepository,
	IPlayfieldRepository,
	IPlayfieldStatsRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

import {GameMessagesService} from './game-messages.service';
import {LogMessagesService} from './log-messages.service';
import type {IMachineMessageService} from './machine-message.service.types';
import {StatusMessagesService} from './status-messages.service';

/**
 * A service to process all messages sent by the machine
 */
class MachineMessageService implements IMachineMessageService {
	private logger: PinoLogger;

	private gameMessagesService: GameMessagesService;
	private logMessagesService: LogMessagesService;
	private statusMessagesService: StatusMessagesService;

	constructor(
		private machineMessageRepository: MachineMessageRepository,
		private gameSessionRepository: IGameSessionRepository,
		private machineLogRepository: IMachineLogRepository,
		private cabinetRepository: ICabinetRepository,
		private playfieldRepository: IPlayfieldRepository,
		private playfieldStatsRepository: IPlayfieldStatsRepository,
		context: {logger: PinoLogger}
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'machine-message-service',
			},
			{}
		);

		this.gameMessagesService = new GameMessagesService(
			this.gameSessionRepository,
			this.machineLogRepository,
			this.playfieldStatsRepository,
			context
		);

		this.logMessagesService = new LogMessagesService(
			this.machineLogRepository,
			this.cabinetRepository,
			this.playfieldRepository,
			context
		);

		this.statusMessagesService = new StatusMessagesService(
			this.cabinetRepository,
			this.playfieldRepository,
			this.machineLogRepository,
			context
		);
	}

	/**
	 * NOTE: performance optimisation possible here:
	 * - We could cache the cabinet for a playfield in Redis to avoid the DB call
	 * - or we could add the required data to the message topic (tenant_id, location_id, serial_number, playfield_id (optional))
	 */
	private async getCabinetForMessage(
		message: MachineMessage
	): Promise<Cabinet | undefined> {
		return this.cabinetRepository.getCabinetByPlayfieldId(message.playfieldId!);
	}

	public async handleMessage(message: MachineMessage): Promise<boolean> {
		const existingMessage =
			await this.machineMessageRepository.findMachineMessageById(
				message.messageId
			);

		if (existingMessage && existingMessage.status !== 'failed') {
			this.logger.warn(
				'Message already processed, ignoring',
				message.messageId
			);
			return true;
		}

		if (!message.playfieldId) {
			this.logger.warn('We have not implemented cabinet only logs yet');
			return false;
		}

		const cabinet = await this.getCabinetForMessage(message);

		if (!cabinet) {
			this.logger.error('Could not find cabinet for message', message);
			return false;
		}
		message.updateFromCabinet(cabinet);

		if (existingMessage) {
			await this.machineMessageRepository.updateMachineMessage(
				message.messageId,
				0
			);
		} else {
			await this.machineMessageRepository.createMachineMessage(message);
		}

		let result = false;
		// // Handle different message types
		switch (message.eventType) {
			case MachineMessageEventType.INTERNET:
				this.logger.info(
					`Internet message received from ${message.serialNumber}:${message.playfieldId}`
				);
				result = true;
				break;
			case MachineMessageEventType.PCB_CHANGE:
				this.logger.info(
					`PCB change message received from ${message.serialNumber}:${message.playfieldId}`
				);
				result = true;
				break;
			case MachineMessageEventType.POWER:
				this.logger.info(
					`Power message received from ${message.serialNumber}:${message.playfieldId}`
				);
				result = true;
				break;
			case MachineMessageEventType.HEARTBEAT:
				this.logger.info(
					`Heartbeat message received from ${message.serialNumber}:${message.playfieldId}`
				);
				result = true;
				break;
			case MachineMessageEventType.MONEY_IN:
			case MachineMessageEventType.SESSION_END:
				result = await this.gameMessagesService.handleMessage(message);
				break;
			case MachineMessageEventType.LOG:
				result = await this.logMessagesService.handleMessage(message);
				break;
			case MachineMessageEventType.STATUS:
				result = await this.statusMessagesService.handleMessage(message);
				break;
			default:
				this.logger.warn('Unknown machine message type', message);
				break;
		}

		await this.updateCabinetAndPlayfieldLastMessage(message);

		if (result) {
			await this.machineMessageRepository.updateMachineMessage(
				message.messageId,
				1
			);
		}

		return result;
	}

	public async handleFailedMessage(message: MachineMessage): Promise<void> {
		this.logger.error(`Failed message:  ${JSON.stringify(message)}`);

		const existingMessage =
			await this.machineMessageRepository.findMachineMessageById(
				message.messageId
			);

		if (!existingMessage) {
			return;
		}

		if (existingMessage.status !== 'pending') {
			this.logger.warn(
				'Message already processed, ignoring',
				message.messageId
			);
			return;
		}

		try {
			// TODO: update message in Redis instead to allow for retries
			await this.machineMessageRepository.updateMachineMessage(
				message.messageId,
				2
			);
		} catch {
			return;
		}
	}

	private async updateCabinetAndPlayfieldLastMessage(
		message: MachineMessage
	): Promise<void> {
		try {
			await this.cabinetRepository.transaction(async (trx) => {
				await this.cabinetRepository
					.withTransaction(trx)
					.updateCabinetLastMessageAt(message.serialNumber, message.timestamp);

				if (message.playfieldId) {
					await this.playfieldRepository
						.withTransaction(trx)
						.updatePlayfieldLastMessageAt(
							message.playfieldId,
							message.timestamp
						);
				}
			});
		} catch (error) {
			this.logger.error(
				'Error updating cabinet and playfield last message',
				error
			);
			// Don't throw error as the message has already been processed, and we don't want to rollback and process it again just because of this
		}
	}
}

export {MachineMessageService};
