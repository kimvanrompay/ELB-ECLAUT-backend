import {mapArrayOrSingleItem} from '@lib/utils';

import type {Cabinet} from '../cabinet/cabinet.model';
import {
	HeartbeatInputDataSchema,
	type HeartbeatInputDataType,
	type HeartbeatMachineMessageInputType,
	LogInputDataSchema,
	type LogInputDataType,
	type LogMachineMessageInputType,
	MachineMessageDBSchema,
	type MachineMessageDBType,
	MachineMessageEventType,
	MachineMessageInputSchema,
	type MachineMessageInputType,
	MoneyInInputDataSchema,
	type MoneyInInputDataType,
	type MoneyInMachineMessageInputType,
	SessionEndInputDataSchema,
	type SessionEndInputDataType,
	type SessionEndMachineMessageInputType,
	StatusInputDataSchema,
	type StatusInputDataType,
	type StatusMessageInputType,
} from './machine-message.schema';

class MachineMessage {
	messageId: string;
	eventType: MachineMessageEventType;
	serial_number: string;
	playfieldId?: string; // Message can be for a cabinet or a playfield
	timestamp: Date;
	data?: Record<string, unknown>;

	tenantId?: string;
	tenantLocationId?: string;

	status: 'pending' | 'processed' | 'failed';

	constructor(
		messageId: string,
		serial_number: string,
		playfieldId: string | undefined,
		timestamp: Date | string,
		eventType: MachineMessageEventType,
		status: 'pending' | 'processed' | 'failed',
		data?: Record<string, unknown>
	) {
		this.messageId = messageId;
		this.serial_number = serial_number;
		this.timestamp = new Date(timestamp);
		this.eventType = eventType;
		this.data = data;
		this.playfieldId = playfieldId;

		this.status = status;
	}

	static schemas = {
		InputSchema: MachineMessageInputSchema,
		DBSchema: MachineMessageDBSchema,
		LogInputDataSchema,
		HeartbeatInputDataSchema,
		MoneyInInputDataSchema,
		SessionEndInputDataSchema,
		StatusInputDataSchema,
	};

	static convertStatusToString(
		status: number
	): 'pending' | 'processed' | 'failed' {
		switch (status) {
			case 1:
				return 'processed';
			case 2:
				return 'failed';
			default:
				return 'pending';
		}
	}

	protected getStatusAsNumber(): number {
		switch (this.status) {
			case 'processed':
				return 1;
			case 'failed':
				return 2;
			default:
				return 0;
		}
	}

	toDBType(): MachineMessageDBType {
		return {
			id: this.messageId,
			serial_number: this.serial_number,
			playfield_id: this.playfieldId,
			timestamp: this.timestamp,
			type: this.eventType,
			data: this.data ?? {},
			status: this.getStatusAsNumber(),
		};
	}

	toJSON(): MachineMessageInputType {
		return {
			u: this.messageId,
			c: this.serial_number,
			p: this.playfieldId,
			t: this.timestamp.getTime(),
			e: this.eventType,
			d: this.data,
		};
	}

	updateFromCabinet(cabinet: Cabinet): void {
		this.tenantId = cabinet.tenantId;
		this.tenantLocationId = cabinet.locationId;
		this.serial_number = cabinet.serialNumber;
	}

	static fromMachineInput(input: MachineMessageInputType[]): MachineMessage[];
	static fromMachineInput(
		input: MachineMessageInputType
	): MachineMessage | undefined;
	static fromMachineInput(
		input: MachineMessageInputType | MachineMessageInputType[]
	): MachineMessage | undefined | MachineMessage[] {
		const mapped = mapArrayOrSingleItem(input, (item) => {
			const validated = MachineMessageInputSchema.safeParse(item);

			if (!validated.success) {
				console.error(
					`Error validating machine message: ${JSON.stringify(validated.error)}`
				);
				return undefined;
			}

			let data = validated.data.d;

			if (typeof data === 'string') {
				try {
					data = JSON.parse(data);
				} catch {
					data = {};
				}
			}

			return new MachineMessage(
				validated.data.u,
				validated.data.c,
				validated.data.p,
				new Date(validated.data.t),
				validated.data.e as MachineMessageEventType,
				'pending',
				data as any
			);
		});

		if (Array.isArray(mapped)) {
			return mapped.filter((item) => item !== undefined) as MachineMessage[];
		}

		return mapped;
	}

	static fromMachineMessageDBType(
		data: MachineMessageDBType[]
	): MachineMessage[];
	static fromMachineMessageDBType(
		data: MachineMessageDBType
	): MachineMessage | undefined;
	static fromMachineMessageDBType(
		data: MachineMessageDBType | MachineMessageDBType[]
	): MachineMessage | MachineMessage[] | undefined {
		return mapArrayOrSingleItem(data, (item) => {
			return new MachineMessage(
				item.id,
				item.serial_number,
				item.playfield_id,
				item.timestamp,
				item.type as MachineMessageEventType,
				MachineMessage.convertStatusToString(item.status),
				item.data
			);
		});
	}
}

export {MachineMessage, MachineMessageEventType};
export type {
	MachineMessageDBType,
	MachineMessageInputType,
	MoneyInMachineMessageInputType,
	MoneyInInputDataType,
	SessionEndMachineMessageInputType,
	SessionEndInputDataType,
	LogMachineMessageInputType,
	LogInputDataType,
	HeartbeatMachineMessageInputType,
	HeartbeatInputDataType,
	StatusInputDataType,
	StatusMessageInputType,
};
