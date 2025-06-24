import {v4 as uuid} from 'uuid';

import {mapArrayOrSingleItem} from '@lib/utils';

import {
	PrizeCreateDTOSchema,
	type PrizeCreateDTOType,
	PrizeDBSchema,
	type PrizeDBType,
	PrizeDTOSchema,
	type PrizeDTOType,
	PrizeInsertDBSchema,
	type PrizeInsertDBType,
	type PrizePlayfieldDBType,
	type PrizePlayfieldInsertDBType,
	type PrizePlayfieldUpdateDBType,
	PrizeUpdateDBSchema,
	type PrizeUpdateDBType,
	PrizeUpdateDTOSchema,
	type PrizeUpdateDTOType,
} from './prize.schema';

class Prize {
	id: string;
	tenant: {
		id: string;
		name: string;
	};
	name: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
	playfields: {
		id: string;
		name: string;
		serialNumber: string;
	}[];

	static schemas = {
		DTOSchema: PrizeDTOSchema,
		DBSchema: PrizeDBSchema,
		InsertDBSchema: PrizeInsertDBSchema,
		CreateDTOSchema: PrizeCreateDTOSchema,
		UpdateDBSchema: PrizeUpdateDBSchema,
		UpdateDTOSchema: PrizeUpdateDTOSchema,
	};

	constructor(
		id: string,
		tenant: {
			id: string;
			name: string;
		},
		name: string,
		description: string | undefined,
		playfields: {
			id: string;
			name: string;
			serialNumber: string;
		}[],
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.tenant = tenant;
		this.name = name;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.description = description;
		this.playfields = playfields;
	}

	static fromDB(data: PrizeDBType[]): Prize[];
	static fromDB(data: PrizeDBType): Prize;
	static fromDB(data: PrizeDBType | PrizeDBType[]): Prize | Prize[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new Prize(
				item.id,
				{
					id: item.tenant_id,
					name: item.tenant_name,
				},
				item.name,
				item.description,
				item.playfields?.map((playfield) => ({
					id: playfield.id,
					name: playfield.name,
					serialNumber: playfield.serialNumber,
				})) ?? [],
				item.created_at,
				item.updated_at
			);
		});
	}

	static fromDTO(data: PrizeDTOType[]): Prize[];
	static fromDTO(data: PrizeDTOType): Prize;
	static fromDTO(data: PrizeDTOType | PrizeDTOType[]): Prize | Prize[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new Prize(
				item.id,
				item.tenant,
				item.name,
				item.description,
				item.playfields?.map((playfield) => ({
					id: playfield.id,
					name: playfield.name,
					serialNumber: playfield.serialNumber,
				})) ?? [],
				item.createdAt,
				item.updatedAt
			);
		});
	}

	static getInsertDBFromCreateDTO(data: PrizeCreateDTOType): PrizeInsertDBType {
		return {
			id: uuid(),
			tenant_id: data.tenantId,
			name: data.name,
			description: data.description,
		};
	}

	static getUpdateDBFromUpdateDTO(data: PrizeUpdateDTOType): PrizeUpdateDBType {
		return {
			name: data.name,
			description: data.description,
		};
	}

	toDB(): PrizeDBType {
		return {
			id: this.id,
			tenant_id: this.tenant.id,
			tenant_name: this.tenant.name,
			name: this.name,
			description: this.description,
			created_at: this.createdAt,
			updated_at: this.updatedAt,
			playfields: this.playfields,
		};
	}

	toJSON(): PrizeDTOType {
		return {
			id: this.id,
			tenant: this.tenant,
			name: this.name,
			description: this.description,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			playfields: this.playfields,
		};
	}
}

export {Prize};

export type {
	PrizeDBType,
	PrizeDTOType,
	PrizeCreateDTOType,
	PrizeInsertDBType,
	PrizeUpdateDBType,
	PrizeUpdateDTOType,
	PrizePlayfieldDBType,
	PrizePlayfieldInsertDBType,
	PrizePlayfieldUpdateDBType,
};
