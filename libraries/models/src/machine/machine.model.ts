import {mapArrayOrSingleItem} from '@lib/utils';

import type {Cabinet} from '../cabinet/cabinet.model';
import type {Playfield} from '../playfield/playfield.model';
import {
	MachineCreateDTOSchema,
	type MachineCreateDTOType,
	MachineDTOSchema,
	type MachineDTOType,
} from './machine.schema';

/**
 * This model is an abstraction of a cabint or playfield in the system.
 */
class Machine {
	id: string;
	type: 'CABINET' | 'PLAYFIELD';
	gametypeId: string;
	cabinet: {
		serialNumber: string;
		name: string;
		tenantId: string;
		tenantLocationId: string;
		playfields: {
			id: string;
			name: string;
			status: string;
		}[];
	};
	name: string;
	status: string;

	static schemas = {
		DTOSchema: MachineDTOSchema,
		CreateDTOSchema: MachineCreateDTOSchema,
	};

	public constructor(
		id: string,
		serialNumber: string,
		name: string,
		gametypeId: string,
		tenantId: string,
		type: 'CABINET' | 'PLAYFIELD',
		tenantLocationId: string,
		status: string,
		playfields: {
			id: string;
			name: string;
			status: string;
		}[]
	) {
		this.id = id;
		this.type = type;
		this.cabinet = {
			serialNumber,
			name,
			tenantId,
			tenantLocationId,
			playfields,
		};
		this.gametypeId = gametypeId;
		this.status = status;
	}

	toJSON(): MachineDTOType {
		return {
			id: this.id,
			type: this.type,
			cabinet: {
				serialNumber: this.cabinet.serialNumber,
				name: this.cabinet.name,
				tenantId: this.cabinet.tenantId,
				tenantLocationId: this.cabinet.tenantLocationId,
				playfields: this.cabinet.playfields,
			},
			gametypeId: this.gametypeId,
			status: this.status,
			name: this.name,
		};
	}

	static fromPlayfield(playfield: Playfield[]): Machine[];
	static fromPlayfield(playfield: Playfield): Machine;
	static fromPlayfield(
		playfield: Playfield | Playfield[]
	): Machine | Machine[] {
		return mapArrayOrSingleItem(playfield, (item) => {
			return new Machine(
				item.id,
				item.cabinet.serialNumber,
				item.name,
				item.gametypeId,
				item.cabinet.tenantId,
				'PLAYFIELD',
				item.cabinet.tenantLocationId,
				item.status,
				item.cabinet.playfields
			);
		});
	}

	static fromCabinet(cabinet: Cabinet[]): Machine[];
	static fromCabinet(cabinet: Cabinet): Machine;
	static fromCabinet(cabinet: Cabinet | Cabinet[]): Machine | Machine[] {
		return mapArrayOrSingleItem(cabinet, (item) => {
			return new Machine(
				item.serialNumber,
				item.serialNumber,
				item.name,
				item.playfields[0]?.gametypeId ?? 'UNKNOWN',
				item.tenantId,
				'CABINET',
				item.locationId,
				'UNKNOWN', // TODO: Get aggregated status from playfields
				item.playfields
			);
		});
	}
}

export {Machine};

export type {MachineDTOType, MachineCreateDTOType};
