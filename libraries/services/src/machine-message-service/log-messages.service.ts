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
import {toScreamingSnakeCase} from '@lib/utils/string';

class LogMessagesService {
	private logger: PinoLogger;

	constructor(
		private machineLogRepository: IMachineLogRepository,
		private cabinetRepository: ICabinetRepository,
		private playfieldRepository: IPlayfieldRepository,
		context: {logger: PinoLogger}
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'log-messages-service',
			},
			{}
		);
	}

	async handleMessage(message: MachineMessage): Promise<boolean> {
		if (message.eventType !== MachineMessageEventType.LOG) {
			return false;
		}

		const {data, messageId, timestamp, serialNumber, playfieldId} = message;

		const validated = MachineMessage.schemas.LogInputDataSchema.safeParse(data);

		if (!validated.success) {
			this.logger.warn(`Invalid event data for log event: ${validated.error}`);
			return false;
		}

		const logLevelMap = {
			e: 'ERROR',
			w: 'WARNING',
			i: 'INFO',
			n: 'NOTICE',
		};
		const logLevel = toScreamingSnakeCase(
			logLevelMap[validated.data.l as keyof typeof logLevelMap] ??
				validated.data.l
		);

		try {
			await this.machineLogRepository.createMachineLog({
				id: messageId,
				level: logLevel,
				type: 'LOG',
				serial_number: serialNumber,
				playfield_id: playfieldId,
				timestamp: new Date(timestamp),
				data,
			});
		} catch (error) {
			this.logger.error('Error handling log event', error);
			return false;
		}

		return true;
	}
}

export {LogMessagesService};
