import {
	MachineMessage,
	MachineMessageEventType,
} from '@lib/models/machine-message';
import type {
	ICabinetRepository,
	IPlayfieldRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';

class StatusMessagesService {
	private logger: PinoLogger;

	constructor(
		private cabinetRepository: ICabinetRepository,
		private playfieldRepository: IPlayfieldRepository,
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

		const {data, serial_number, playfieldId} = message;

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

		try {
			await this.playfieldRepository.updatePlayfield(playfieldId, {
				status: newStatus,
			});
			return true;
		} catch (error) {
			this.logger.error(error);
			return false;
		}
	}
}

export {StatusMessagesService};
