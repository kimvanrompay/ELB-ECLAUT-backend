import {mapArrayOrSingleItem} from '@lib/utils';

import {
	GametypeCreateDTOSchema,
	type GametypeCreateDTOType,
	GametypeDBSchema,
	type GametypeDBType,
	GametypeDTOSchema,
	type GametypeDTOType,
	GametypeInsertDBSchema,
	type GametypeInsertDBType,
	GametypeUpdateDBSchema,
	type GametypeUpdateDBType,
	GametypeUpdateDTOSchema,
	type GametypeUpdateDTOType,
} from './gametype.schema';

class Gametype {
	id: string;
	description: string | undefined;
	name: string;
	createdAt: Date;

	static schemas = {
		GametypeDTOSchema,
		GametypeDBSchema,
		GametypeCreateDTOSchema,
		GametypeInsertDBSchema,
		GametypeUpdateDTOSchema,
		GametypeUpdateDBSchema,
	};

	public constructor(
		id: string,
		description: string | undefined,
		name: string,
		createdAt: Date
	) {
		this.id = id;
		this.description = description;
		this.name = name;
		this.createdAt = createdAt;
	}

	toJSON(): GametypeDTOType {
		return {
			id: this.id,
			description: this.description,
			name: this.name,
			createdAt: this.createdAt,
		};
	}

	toDBType(): GametypeDBType {
		return {
			id: this.id,
			description: this.description,
			name: this.name,
			created_at: this.createdAt,
		};
	}

	static fromJSON(data: GametypeDTOType): Gametype;
	static fromJSON(data: GametypeDTOType[]): Gametype[];
	static fromJSON(
		data: GametypeDTOType | GametypeDTOType[]
	): Gametype | Gametype[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new Gametype(item.id, item.description, item.name, item.createdAt);
		});
	}

	static fromDB(data: GametypeDBType): Gametype;
	static fromDB(data: GametypeDBType[]): Gametype[];
	static fromDB(
		data: GametypeDBType | GametypeDBType[]
	): Gametype | Gametype[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new Gametype(
				item.id,
				item.description,
				item.name,
				item.created_at
			);
		});
	}
}

export {Gametype};

export type {
	GametypeDTOType,
	GametypeDBType,
	GametypeCreateDTOType,
	GametypeInsertDBType,
	GametypeUpdateDBType,
	GametypeUpdateDTOType,
};
