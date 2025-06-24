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
	tenant: {
		id: string;
		name: string;
	};
	location: {
		id: string;
		name: string;
	};
	name: string;
	playfields: {
		id: string;
		name: string;
		status: string;
		gametypeId: string;
		externalId?: string;
	}[];
	lastMessageAt?: Date;

	static schemas = {
		DTOSchema: CabinetDTOSchema,
		DBSchema: CabinetDBSchema,
		InsertDBSchema: CabinetInsertDBSchema,
		UpdateDBSchema: CabinetUpdateDBSchema,
		WithPlayfieldsDBSchema: CabinetWithPlayfieldsDBSchema,
	};

	constructor(
		serialNumber: string,
		tenant: {
			id: string;
			name: string;
		},
		location: {
			id: string;
			name: string;
		},
		name: string,
		playfields: {
			id: string;
			name: string;
			status: string;
			gametypeId: string;
		}[],
		lastMessageAt?: Date
	) {
		this.serialNumber = serialNumber;
		this.tenant = tenant;
		this.location = location;
		this.name = name;
		this.playfields = playfields;
		this.lastMessageAt = lastMessageAt;
	}

	static fromJSON(dto: CabinetDTOType[]): Cabinet[];
	static fromJSON(dto: CabinetDTOType): Cabinet;
	static fromJSON(dto: CabinetDTOType | CabinetDTOType[]): Cabinet | Cabinet[] {
		return mapArrayOrSingleItem(dto, (item) => {
			return new Cabinet(
				item.serialNumber,
				item.tenant,
				item.location,
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
							external_id: z.string().optional().nullable(),
						})
					)
					.min(1)
					.parse(playfields);

				return new Cabinet(
					item.serial_number,
					{
						id: item.tenant_id,
						name: item.tenant_name,
					},
					{
						id: item.tenant_location_id,
						name: item.tenant_location_name,
					},
					item.name,
					validatedPlayfields.map((playfield) => ({
						id: playfield.id,
						name: playfield.name,
						status: playfield.status,
						gametypeId: playfield.gametype_id,
						externalId: playfield.external_id ?? undefined,
					})),
					item.last_machine_message
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
			tenant: {
				id: this.tenant.id,
				name: this.tenant.name,
			},
			location: this.location,
			name: this.name,
			playfields: this.playfields,
			lastMessageAt: this.lastMessageAt,
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
