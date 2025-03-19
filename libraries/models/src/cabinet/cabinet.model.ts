import {z} from '@hono/zod-openapi';

import {mapArrayOrSingleItem} from '@lib/utils';

import {
	CabinetDBSchema,
	type CabinetDBType,
	CabinetDTOSchema,
	type CabinetDTOType,
	CabinetInsertDBSchema,
	type CabinetInsertDBType,
	CabinetUpdateDBSchema,
	type CabinetUpdateDBType,
	CabinetWithPlayfieldsDBSchema,
	type CabinetWithPlayfieldsDBType,
} from './cabinet.schema';

class Cabinet {
	serialNumber: string;
	tenantId: string;
	locationId: string;
	name: string;
	playfields: {
		id: string;
		name: string;
		status: string;
		gametypeId: string;
	}[];

	static schemas = {
		DTOSchema: CabinetDTOSchema,
		DBSchema: CabinetDBSchema,
		InsertDBSchema: CabinetInsertDBSchema,
		UpdateDBSchema: CabinetUpdateDBSchema,
		WithPlayfieldsDBSchema: CabinetWithPlayfieldsDBSchema,
	};

	constructor(
		serialNumber: string,
		tenantId: string,
		locationId: string,
		name: string,
		playfields: {
			id: string;
			name: string;
			status: string;
			gametypeId: string;
		}[]
	) {
		this.serialNumber = serialNumber;
		this.tenantId = tenantId;
		this.locationId = locationId;
		this.name = name;
		this.playfields = playfields;
	}

	static fromJSON(dto: CabinetDTOType[]): Cabinet[];
	static fromJSON(dto: CabinetDTOType): Cabinet;
	static fromJSON(dto: CabinetDTOType | CabinetDTOType[]): Cabinet | Cabinet[] {
		return mapArrayOrSingleItem(dto, (item) => {
			return new Cabinet(
				item.serialNumber,
				item.tenantId,
				item.locationId,
				item.name,
				item.playfields
			);
		});
	}

	static fromDBType(dbType: CabinetWithPlayfieldsDBType[]): Cabinet[];
	static fromDBType(dbType: CabinetWithPlayfieldsDBType): Cabinet;
	static fromDBType(
		dbType: CabinetWithPlayfieldsDBType | CabinetWithPlayfieldsDBType[]
	): Cabinet | Cabinet[] {
		return mapArrayOrSingleItem(dbType, (item) => {
			try {
				const playfields =
					typeof item.playfields === 'string'
						? JSON.parse(item.playfields)
						: item.playfields;

				const validatedPlayfields = z
					.array(
						z.object({
							id: z.string(),
							name: z.string(),
							status: z.string(),
							gametype_id: z.string(),
						})
					)
					.min(1)
					.parse(playfields);

				return new Cabinet(
					item.serial_number,
					item.tenant_id,
					item.tenant_location_id,
					item.name,
					validatedPlayfields.map((playfield) => ({
						id: playfield.id,
						name: playfield.name,
						status: playfield.status,
						gametypeId: playfield.gametype_id,
					}))
				);
			} catch (e) {
				console.error(e);
				throw new Error('Failed to parse playfields');
			}
		});
	}

	toJSON(): CabinetDTOType {
		return {
			serialNumber: this.serialNumber,
			tenantId: this.tenantId,
			locationId: this.locationId,
			name: this.name,
			playfields: this.playfields,
		};
	}
}

export {Cabinet};

export type {
	CabinetDTOType,
	CabinetWithPlayfieldsDBType,
	CabinetDBType,
	CabinetInsertDBType,
	CabinetUpdateDBType,
};
