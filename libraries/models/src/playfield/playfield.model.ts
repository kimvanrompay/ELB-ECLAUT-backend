import {z} from '@hono/zod-openapi';

import {mapArrayOrSingleItem} from '@lib/utils';

import {
	PlayfieldDBSchema,
	type PlayfieldDBType,
	PlayfieldDTOSchema,
	type PlayfieldDTOType,
	PlayfieldInsertDBSchema,
	type PlayfieldInsertDBType,
	PlayfieldUpdateDBSchema,
	type PlayfieldUpdateDBType,
	PlayfieldUpdateDTOSchema,
	type PlayfieldUpdateDTOType,
	PlayfieldWithCabinetDBSchema,
	type PlayfieldWithCabinetDBType,
} from './playfield.schema';

class Playfield {
	static schemas = {
		DTOSchema: PlayfieldDTOSchema,
		DBSchema: PlayfieldDBSchema,
		InsertDBSchema: PlayfieldInsertDBSchema,
		UpdateDBSchema: PlayfieldUpdateDBSchema,
		WithCabinetDBSchema: PlayfieldWithCabinetDBSchema,
		UpdateDTOSchema: PlayfieldUpdateDTOSchema,
	};

	public constructor(
		public id: string,
		public cabinet: {
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
		},
		public name: string,
		public gametype: {
			id: string;
			name: string;
		},
		public status: string,
		public lastMessageAt?: Date,
		public error?: {
			isActive: boolean;
			code: string;
			eventData?: string;
		},
		public prize?: {
			id: string;
			name: string;
		},
		public category?: {
			id: string;
			name: string;
		},
		public externalId?: string
	) {}

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
					tenant: item.cabinet.tenant,
					location: {
						id: item.cabinet.location.id,
						name: item.cabinet.location.name,
					},
					playfields: item.cabinet.playfields,
				},
				item.name,
				item.gametype,
				item.status,
				item.lastMessageAt,
				item.error,
				item.prize
					? {
							id: item.prize.id,
							name: item.prize.name,
						}
					: undefined,
				item.category
					? {
							id: item.category.id,
							name: item.category.name,
						}
					: undefined,
				item.externalId
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
					tenant: {
						id: item.tenant_id,
						name: item.tenant_name,
					},
					location: {
						id: item.tenant_location_id,
						name: item.tenant_location_name,
					},
					playfields: [
						{
							id: item.id,
							name: item.name,
							status: item.status ?? 'UNKNOWN',
						},
					],
				},
				item.name,
				{
					id: item.game_type_id,
					name: item.gametype_name,
				},
				item.status ?? 'UNKNOWN',
				item.last_machine_message
					? new Date(item.last_machine_message)
					: undefined,
				item.error_code
					? {
							isActive: item.error_is_active !== 'false',
							code: item.error_code,
							eventData: item.error_event_data,
						}
					: undefined,
				item.prize_id && item.prize_name
					? {
							id: item.prize_id,
							name: item.prize_name,
						}
					: undefined,
				item.category_id && item.category_name
					? {
							id: item.category_id,
							name: item.category_name,
						}
					: undefined,
				item.external_id
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
					tenant_name: z.string(),
					tenant_location_id: z.string(),
					tenant_location_name: z.string(),
					playfields: z
						.array(
							z.object({
								id: z.string(),
								name: z.string(),
								status: z.string(),
								gametype_id: z.string(),
								external_id: z.string().optional().nullable(),
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
					tenant: {
						id: validatedCabinet.tenant_id,
						name: validatedCabinet.tenant_name,
					},
					location: {
						id: validatedCabinet.tenant_location_id,
						name: validatedCabinet.tenant_location_name,
					},
					playfields: validatedCabinet.playfields.map((playfield) => ({
						id: playfield.id,
						name: playfield.name,
						status: playfield.status,
						gametypeId: playfield.gametype_id,
						externalId: playfield.external_id ?? undefined,
					})),
				},
				item.name,
				{
					id: item.gametype_id,
					name: item.gametype_name,
				},
				item.status ?? 'UNKNOWN',
				item.last_machine_message
					? new Date(item.last_machine_message)
					: undefined,
				item.error_code
					? {
							isActive: item.error_is_active !== 'false',
							code: item.error_code,
							eventData: item.error_event_data,
						}
					: undefined,
				item.prize_id && item.prize_name
					? {
							id: item.prize_id,
							name: item.prize_name,
						}
					: undefined,
				item.category_id && item.category_name
					? {
							id: item.category_id,
							name: item.category_name,
						}
					: undefined,
				item.external_id ?? undefined
			);
		});
	}

	toJSON(): PlayfieldDTOType {
		return {
			id: this.id,
			cabinet: {
				serialNumber: this.cabinet.serialNumber,
				name: this.cabinet.name,
				tenant: {
					id: this.cabinet.tenant.id,
					name: this.cabinet.tenant.name,
				},
				location: {
					id: this.cabinet.location.id,
					name: this.cabinet.location.name,
				},
				playfields: this.cabinet.playfields,
			},
			name: this.name,
			gametype: {
				id: this.gametype.id,
				name: this.gametype.name,
			},
			status: this.status,
			lastMessageAt: this.lastMessageAt,
			error: this.error,
			prize: this.prize
				? {
						id: this.prize.id,
						name: this.prize.name,
					}
				: undefined,
			category: this.category
				? {
						id: this.category.id,
						name: this.category.name,
					}
				: undefined,
			externalId: this.externalId,
		};
	}

	static getUpdateDBFromUpdateDTO(
		data: PlayfieldUpdateDTOType
	): PlayfieldUpdateDBType {
		return {
			name: data.name,
			external_id: data.externalId,
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
	PlayfieldUpdateDTOType,
};
