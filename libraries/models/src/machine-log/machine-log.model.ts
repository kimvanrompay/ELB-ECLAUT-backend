import {mapArrayOrSingleItem} from '@lib/utils';

import {
	MachineLogDBSchema,
	type MachineLogDBType,
	MachineLogDTOSchema,
	type MachineLogDTOType,
	MachineLogInsertDBSchema,
	type MachineLogInsertDBType,
} from './machine-log.schema';

class MachineLog {
	id: string;
	level: string;
	serialNumber: string;
	playfieldId: string | undefined;
	type: string;
	timestamp: Date;
	data: Record<string, unknown> | undefined;
	userId: string | undefined;

	constructor(
		id: string,
		level: string,
		serialNumber: string,
		playfieldId: string | undefined,
		type: string,
		timestamp: Date,
		data: Record<string, unknown> | undefined,
		userId?: string | undefined
	) {
		this.id = id;
		this.level = level;
		this.serialNumber = serialNumber;
		this.playfieldId = playfieldId;
		this.type = type;
		this.timestamp = timestamp;
		this.data = data;
		this.userId = userId;
	}

	static schemas = {
		DTOSchema: MachineLogDTOSchema,
		DBSchema: MachineLogDBSchema,
		InsertDBSchema: MachineLogInsertDBSchema,
	};

	static fromDBType(dbType: MachineLogDBType[]): MachineLog[];
	static fromDBType(dbType: MachineLogDBType): MachineLog;
	static fromDBType(
		dbType: MachineLogDBType | MachineLogDBType[]
	): MachineLog | MachineLog[] {
		return mapArrayOrSingleItem(dbType, (item) => {
			return new MachineLog(
				item.id,
				item.level,
				item.serial_number,
				item.playfield_id,
				item.type,
				new Date(item.timestamp),
				item.data,
				item.app_user_id
			);
		});
	}

	toJSON(): MachineLogDTOType {
		return {
			level: this.level,
			timestamp: this.timestamp.toISOString(),
			serialNumber: this.serialNumber,
			playfieldId: this.playfieldId,
			type: this.type,
			data: this.data,
			userId: this.userId,
		};
	}
}

export {MachineLog};

export type {MachineLogDTOType, MachineLogDBType, MachineLogInsertDBType};
