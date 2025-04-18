import {GamePaymentMethod} from '@lib/models/game-session';
import {
	MachineMessage,
	MachineMessageEventType,
} from '@lib/models/machine-message';
import type {
	IGameSessionRepository,
	IMachineLogRepository,
} from '@lib/repositories/types';
import {PinoLogger} from '@lib/utils';
import type {WithRequired} from '@lib/utils/types';

class GameMessagesService {
	private logger: PinoLogger;

	constructor(
		private gameSessionRepository: IGameSessionRepository,
		private machineLogRepository: IMachineLogRepository,
		context: {logger: PinoLogger}
	) {
		this.logger = context.logger.getChildLogger(
			{
				service: 'game-messages-service',
			},
			{}
		);
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

				const {i: gameSessionId, ...result} = validatedData;

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
			});
		} catch (error) {
			this.logger.error('Error handling session end event', error);
			return false;
		}

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
