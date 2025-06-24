import {v4 as uuid} from 'uuid';

import {mapArrayOrSingleItem} from '@lib/utils';

import {
	PlayfieldCategoryCreateDTOSchema,
	type PlayfieldCategoryCreateDTOType,
	PlayfieldCategoryDBSchema,
	type PlayfieldCategoryDBType,
	PlayfieldCategoryDTOSchema,
	type PlayfieldCategoryDTOType,
	PlayfieldCategoryInsertDBSchema,
	type PlayfieldCategoryInsertDBType,
	PlayfieldCategoryUpdateDBSchema,
	type PlayfieldCategoryUpdateDBType,
	PlayfieldCategoryUpdateDTOSchema,
	type PlayfieldCategoryUpdateDTOType,
} from './playfield-category.schema';

class PlayfieldCategory {
	constructor(
		public id: string,
		public name: string,
		public description: string | undefined,
		public tenant: {
			id: string;
			name: string;
		},
		public playfields: {
			id: string;
			name: string;
			serialNumber: string;
		}[],
		public createdAt?: Date,
		public updatedAt?: Date
	) {}

	static schemas = {
		DTOSchema: PlayfieldCategoryDTOSchema,
		DBSchema: PlayfieldCategoryDBSchema,
		CreateDTOSchema: PlayfieldCategoryCreateDTOSchema,
		UpdateDTOSchema: PlayfieldCategoryUpdateDTOSchema,
		InsertDBSchema: PlayfieldCategoryInsertDBSchema,
		UpdateDBSchema: PlayfieldCategoryUpdateDBSchema,
	};

	toDBType(): PlayfieldCategoryDBType {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			tenant_id: this.tenant.id,
			tenant_name: this.tenant.name,
			playfields: this.playfields,
			created_at: this.createdAt?.toISOString() || new Date().toISOString(),
			updated_at: this.updatedAt?.toISOString() || new Date().toISOString(),
		};
	}

	static fromDBType(data: PlayfieldCategoryDBType): PlayfieldCategory;
	static fromDBType(data: PlayfieldCategoryDBType[]): PlayfieldCategory[];
	static fromDBType(
		data: PlayfieldCategoryDBType[] | PlayfieldCategoryDBType
	): PlayfieldCategory | PlayfieldCategory[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new PlayfieldCategory(
				item.id,
				item.name,
				item.description,
				{
					id: item.tenant_id,
					name: item.tenant_name,
				},
				item.playfields,
				item.created_at ? new Date(item.created_at) : undefined,
				item.updated_at ? new Date(item.updated_at) : undefined
			);
		});
	}

	static fromJSON(data: PlayfieldCategoryDTOType[]): PlayfieldCategory[];
	static fromJSON(data: PlayfieldCategoryDTOType): PlayfieldCategory;
	static fromJSON(
		data: PlayfieldCategoryDTOType | PlayfieldCategoryDTOType[]
	): PlayfieldCategory | PlayfieldCategory[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new PlayfieldCategory(
				item.id,
				item.name,
				item.description,
				item.tenant,
				item.playfields,
				item.createdAt ? new Date(item.createdAt) : undefined,
				item.updatedAt ? new Date(item.updatedAt) : undefined
			);
		});
	}

	toJSON(): PlayfieldCategoryDTOType {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			tenant: this.tenant,
			playfields: this.playfields,
			createdAt: this.createdAt ?? new Date(),
			updatedAt: this.updatedAt ?? new Date(),
		};
	}

	static getUpdateDBTypeFromUpdateDTO(
		data: PlayfieldCategoryUpdateDTOType
	): PlayfieldCategoryUpdateDBType {
		return {
			name: data.name,
			description: data.description,
			tenant_id: data.tenantId,
			updated_at: new Date().toISOString(),
		};
	}

	static getInsertDBTypeFromCreateDTO(
		data: PlayfieldCategoryCreateDTOType
	): PlayfieldCategoryInsertDBType {
		return {
			id: uuid(),
			name: data.name,
			description: data.description,
			tenant_id: data.tenantId,
		};
	}
}

export {PlayfieldCategory};

export type {
	PlayfieldCategoryDTOType,
	PlayfieldCategoryDBType,
	PlayfieldCategoryCreateDTOType,
	PlayfieldCategoryUpdateDTOType,
	PlayfieldCategoryInsertDBType,
	PlayfieldCategoryUpdateDBType,
};
