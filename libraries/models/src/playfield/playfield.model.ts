import {z} from '@hono/zod-openapi';

import {mapArrayOrSingleItem} from '@lib/utils';
import {renameSnakeCasePropertiesToCamelCase} from '@lib/utils/object';

import {
	PlayfieldDBSchema,
	type PlayfieldDBType,
	PlayfieldDTOSchema,
	type PlayfieldDTOType,
	PlayfieldInsertDBSchema,
	type PlayfieldInsertDBType,
	PlayfieldUpdateDBSchema,
	type PlayfieldUpdateDBType,
	PlayfieldWithCabinetDBSchema,
	type PlayfieldWithCabinetDBType,
} from './playfield.schema';

class Playfield {
	id: string;
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
	gametypeId: string;
	status: string;

	static schemas = {
		DTOSchema: PlayfieldDTOSchema,
		DBSchema: PlayfieldDBSchema,
		InsertDBSchema: PlayfieldInsertDBSchema,
		UpdateDBSchema: PlayfieldUpdateDBSchema,
		WithCabinetDBSchema: PlayfieldWithCabinetDBSchema,
	};

	public constructor(
		id: string,
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
		},
		name: string,
		gametypeId: string,
		status: string
	) {
		this.id = id;
		this.cabinet = cabinet;
		this.name = name;
		this.gametypeId = gametypeId;
		this.status = status;
	}

	static fromJSON(data: PlayfieldDTOType[]): Playfield[];
	static fromJSON(data: PlayfieldDTOType): Playfield;
	static fromJSON(
		data: PlayfieldDTOType | PlayfieldDTOType[]
	): Playfield | Playfield[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new Playfield(
				item.id,
				{
					serialNumber: item.cabinet.serialNumber,
					name: item.cabinet.name,
					tenantId: item.cabinet.tenantId,
					tenantLocationId: item.cabinet.tenantLocationId,
					playfields: item.cabinet.playfields,
				},
				item.name,
				item.gametypeId,
				item.status
			);
		});
	}

	static fromDBType(data: PlayfieldDBType[]): Playfield[];
	static fromDBType(data: PlayfieldDBType): Playfield;
	static fromDBType(
		data: PlayfieldDBType | PlayfieldDBType[]
	): Playfield | Playfield[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new Playfield(
				item.id,
				{
					serialNumber: item.serial_number,
					name: item.name,
					tenantId: item.tenant_id,
					tenantLocationId: item.tenant_location_id,
					playfields: [
						{
							id: item.id,
							name: item.name,
							status: item.status ?? 'UNKNOWN',
						},
					],
				},
				item.name,
				item.game_type_id,
				item.status ?? 'UNKNOWN'
			);
		});
	}

	static fromDBTypeWithCabinet(data: PlayfieldWithCabinetDBType[]): Playfield[];
	static fromDBTypeWithCabinet(data: PlayfieldWithCabinetDBType): Playfield;
	static fromDBTypeWithCabinet(
		data: PlayfieldWithCabinetDBType | PlayfieldWithCabinetDBType[]
	): Playfield | Playfield[] {
		return mapArrayOrSingleItem(data, (item) => {
			const cabinet =
				typeof item.cabinet === 'string'
					? JSON.parse(item.cabinet)
					: item.cabinet;

			const validatedCabinet = z
				.object({
					serial_number: z.string(),
					name: z.string(),
					tenant_id: z.string(),
					tenant_location_id: z.string(),
					playfields: z
						.array(
							z.object({
								id: z.string(),
								name: z.string(),
								status: z.string(),
								gametype_id: z.string(),
							})
						)
						.min(1),
				})
				.parse(cabinet);

			return new Playfield(
				item.id,
				{
					serialNumber: validatedCabinet.serial_number,
					name: validatedCabinet.name,
					tenantId: validatedCabinet.tenant_id,
					tenantLocationId: validatedCabinet.tenant_location_id,
					playfields: validatedCabinet.playfields.map((playfield) => ({
						id: playfield.id,
						name: playfield.name,
						status: playfield.status,
						gametypeId: playfield.gametype_id,
					})),
				},
				item.name,
				item.game_type_id,
				item.status ?? 'UNKNOWN'
			);
		});
	}

	toJSON(): PlayfieldDTOType {
		return {
			id: this.id,
			cabinet: {
				serialNumber: this.cabinet.serialNumber,
				name: this.cabinet.name,
				tenantId: this.cabinet.tenantId,
				tenantLocationId: this.cabinet.tenantLocationId,
				playfields: this.cabinet.playfields,
			},
			name: this.name,
			gametypeId: this.gametypeId,
			status: this.status,
		};
	}
}

export {Playfield};
export type {
	PlayfieldDTOType,
	PlayfieldDBType,
	PlayfieldInsertDBType,
	PlayfieldUpdateDBType,
	PlayfieldWithCabinetDBType,
};
