import {v4 as uuid} from 'uuid';

import type {MachineCreateDTOType, MachineDBType} from './machine.schema';
import {
	MachineCreateDTOSchema,
	MachineDBSchema,
	MachineDTOSchema,
	type MachineDTOType,
	MachineInsertDBSchema,
	type MachineInsertDBType,
	MachineUpdateDBSchema,
	type MachineUpdateDBType,
	MachineUpdateDTOSchema,
	type MachineUpdateDTOType,
} from './machine.schema';

class Machine {
	id: string;
	serialNumber: string;
	name: string;
	gameTypeId?: string;
	tenantId?: string;

	static schemas = {
		DTOSchema: MachineDTOSchema,
		DBSchema: MachineDBSchema,
		CreateDTOSchema: MachineCreateDTOSchema,
		InsertDBSchema: MachineInsertDBSchema,
		UpdateDTOSchema: MachineUpdateDTOSchema,
		UpdateDBSchema: MachineUpdateDBSchema,
	};

	public constructor(
		id: string,
		serialNumber: string,
		name: string,
		gameTypeId: string | undefined,
		tenantId: string | undefined
	) {
		this.id = id;
		this.serialNumber = serialNumber;
		this.name = name;
		this.gameTypeId = gameTypeId;
		this.tenantId = tenantId;
	}

	toJSON(): MachineDTOType {
		return {
			id: this.id,
			serialNumber: this.serialNumber,
			name: this.name,
			gameTypeId: this.gameTypeId,
		};
	}

	toDBType(): MachineDBType {
		return {
			id: this.id,
			serial_number: this.serialNumber,
			name: this.name,
			game_type_id: this.gameTypeId,
			tenant_id: this.tenantId,
		};
	}

	static fromJSON(data: MachineDTOType): Machine;
	static fromJSON(data: MachineDTOType[]): Machine[];
	static fromJSON(
		data: MachineDTOType | MachineDTOType[]
	): Machine | Machine[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) =>
					new Machine(
						item.id,
						item.serialNumber,
						item.name,
						item.gameTypeId,
						item.tenantId
					)
			);
		}

		return new Machine(
			data.id,
			data.serialNumber,
			data.name,
			data.gameTypeId,
			data.tenantId
		);
	}

	static fromDBType(data: MachineDBType): Machine;
	static fromDBType(data: MachineDBType[]): Machine[];
	static fromDBType(
		data: MachineDBType | MachineDBType[]
	): Machine | Machine[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) =>
					new Machine(
						item.id,
						item.serial_number,
						item.name,
						item.game_type_id,
						item.tenant_id
					)
			);
		}

		return new Machine(
			data.id,
			data.serial_number,
			data.name,
			data.game_type_id,
			data.tenant_id
		);
	}

	static create(data: MachineCreateDTOType): Machine {
		const generatedId = uuid();

		const validatedDto = MachineCreateDTOSchema.safeParse(data);

		if (!validatedDto.success) {
			throw new Error('Could not create a valid Machine');
		}

		return new Machine(
			generatedId,
			data.serialNumber,
			data.name,
			data.gameTypeId,
			data.tenantId
		);
	}
}

export {Machine};

export type {
	MachineDTOType,
	MachineDBType,
	MachineCreateDTOType,
	MachineInsertDBType,
	MachineUpdateDTOType,
	MachineUpdateDBType,
};
