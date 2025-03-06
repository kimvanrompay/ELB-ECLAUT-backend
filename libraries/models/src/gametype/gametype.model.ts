import {
	GametypeCreateDTOSchema,
	GametypeDBSchema,
	type GametypeDBType,
	GametypeDTOSchema,
	type GametypeDTOType,
	GametypeInsertDBSchema,
	GametypeUpdateDTOSchema,
} from './gametype.schema';

class Gametype {
	id: string;
	description: string | undefined;
	name: string;

	static schemas = {
		GametypeDTOSchema,
		GametypeDBSchema,
		GametypeCreateDTOSchema,
		GametypeInsertDBSchema,
		GametypeUpdateDTOSchema,
	};

	public constructor(
		id: string,
		description: string | undefined,
		name: string
	) {
		this.id = id;
		this.description = description;
		this.name = name;
	}

	toJSON(): GametypeDTOType {
		return {
			id: this.id,
			description: this.description,
			name: this.name,
		};
	}

	toDBType(): GametypeDBType {
		return {
			id: this.id,
			description: this.description,
			name: this.name,
		};
	}

	static fromJSON(data: GametypeDTOType): Gametype;
	static fromJSON(data: GametypeDTOType[]): Gametype[];
	static fromJSON(
		data: GametypeDTOType | GametypeDTOType[]
	): Gametype | Gametype[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) => new Gametype(item.id, item.description, item.name)
			);
		}

		return new Gametype(data.id, data.description, data.name);
	}

	static fromDB(data: GametypeDBType): Gametype;
	static fromDB(data: GametypeDBType[]): Gametype[];
	static fromDB(
		data: GametypeDBType | GametypeDBType[]
	): Gametype | Gametype[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) => new Gametype(item.id, item.description, item.name)
			);
		}

		return new Gametype(data.id, data.description, data.name);
	}
}

export {Gametype};
