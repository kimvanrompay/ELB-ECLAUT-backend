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
	cabinet: {
		serialNumber: string;
		name: string;
		tenant: {
			id: string;
			name: string;
		};
		location: {
			id: string;
			name: string;
		};
		playfields: {
			id: string;
			name: string;
			status: string;
		}[];
	};

	static schemas = {
		DTOSchema: MachineDTOSchema,
		CreateDTOSchema: MachineCreateDTOSchema,
	};

	public constructor(
		public id: string,
		public serialNumber: string,
		public name: string,
		public gametype: {
			id: string;
			name: string;
		},
		tenant: {
			id: string;
			name: string;
		},
		public type: 'CABINET' | 'PLAYFIELD',
		location: {
			id: string;
			name: string;
		},
		public status: string,
		playfields: {
			id: string;
			name: string;
			status: string;
		}[]
		}[],
		public category?: {
			id: string;
			name: string;
		},
	) {
		this.id = id;
		this.type = type;
		this.name = name;
		this.cabinet = {
			serialNumber,
			name,
			tenant,
			playfields,
			location,
		};
		this.gametype = gametype;
		this.status = status;
	}

	toJSON(): MachineDTOType {
		return {
			id: this.id,
			type: this.type,
			cabinet: {
				serialNumber: this.cabinet.serialNumber,
				name: this.cabinet.name,
				tenant: this.cabinet.tenant,
				location: this.cabinet.location,
				playfields: this.cabinet.playfields,
			},
			gametype: {
				id: this.gametype.id,
				name: this.gametype.name,
			},
			status: this.status,
			name: this.name,
			category: this.category,
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
				item.gametype,
				item.cabinet.tenant,
				'PLAYFIELD',
				item.cabinet.location,
				item.status,
				item.cabinet.playfields
				item.cabinet.playfields,
				item.category
					? {
							id: item.category.id,
							name: item.category.name,
						}
					: undefined,
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
				{
					id: item.playfields[0]?.gametypeId ?? 'UNKNOWN',
					name: 'UNKNOWN', // TODO: Get gametype name from playfields?
				},
				item.tenant,
				'CABINET',
				item.location,
				'UNKNOWN', // TODO: Get aggregated status from playfields
				item.playfields
				item.playfields, // tODO add category to playfields
				undefined, // todo: Add category if all playfields have the same category,
			);
		});
	}
}

export {Machine};

export type {MachineDTOType, MachineCreateDTOType};
