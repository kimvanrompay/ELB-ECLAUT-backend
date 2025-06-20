import {
	MachineMessage,
	MachineMessageEventType,
} from '@lib/models/machine-message';
import type {
	ICabinetRepository,
	IMachineLogRepository,
	IPlayfieldRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

class StatusMessagesService {
	private logger: PinoLogger;

	constructor(
		private cabinetRepository: ICabinetRepository,
		private playfieldRepository: IPlayfieldRepository,
		private machineLogRepository: IMachineLogRepository,
		context: {logger: PinoLogger}
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'status-messages-service',
			},
			{}
		);
	}

	async handleMessage(message: MachineMessage): Promise<boolean> {
		if (message.eventType !== MachineMessageEventType.STATUS) {
			return false;
		}

		const {data, serialNumber, playfieldId, timestamp} = message;

		const validated =
			MachineMessage.schemas.StatusInputDataSchema.safeParse(data);

		if (!playfieldId) {
			this.logger.warn(`Playfield ID not found in message`);
			return false;
		}

		if (!validated.success) {
			this.logger.warn(
				`Invalid event data for status event: ${validated.error}`
			);
			return false;
		}

		let newStatus = undefined as string | undefined;
		switch (validated.data.s) {
			case 'a':
				newStatus = 'ACTIVE';
				break;
			case 'e':
				newStatus = 'ERROR';
				break;
			default:
				newStatus = 'UNKNOWN';
				break;
		}

		// TODO: check if this message is latest status update before changing the status
		try {
			await this.playfieldRepository.updatePlayfield(playfieldId, {
				status: newStatus,
			});

			await this.machineLogRepository.createMachineLog({
				id: message.messageId,
				level: 'INFO',
				type: 'STATUS',
				serial_number: serialNumber,
				playfield_id: playfieldId,
				timestamp: new Date(timestamp),
				data: {
					s: newStatus,
				},
			});

			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}
}

export {StatusMessagesService};
