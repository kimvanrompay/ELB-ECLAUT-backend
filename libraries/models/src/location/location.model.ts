import {
	locationCreateDTOSchema,
	type LocationCreateDTOType,
	locationDBSchema,
	type LocationDBType,
	locationDTOSchema,
	type LocationDTOType,
	locationInsertDBSchema,
	type LocationInsertDBType,
	locationUpdateDBSchema,
	type LocationUpdateDBType,
	locationUpdateDTOSchema,
	type LocationUpdateDTOType,
} from './location.schema';

class Location {
	id: string;
	tenant: {
		id: string;
		name: string;
	};
	name: string;
	address: string | undefined;
	city: string | undefined;
	state: string | undefined;
	zip: string | undefined;
	country: string | undefined;
	phone: string | undefined;
	email: string;
	createdAt: Date;
	updatedAt: Date;

	schemas = {
		locationDTOSchema,
		locationDBSchema,
		locationCreateDTOSchema,
		locationInsertDBSchema,
		locationUpdateDTOSchema,
		locationUpdateDBSchema,
	};

	constructor(
		id: string,
		tenant: {
			id: string;
			name: string;
		},
		name: string,
		address: string | undefined,
		city: string | undefined,
		state: string | undefined,
		zip: string | undefined,
		country: string | undefined,
		phone: string | undefined,
		email: string,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.tenant = tenant;
		this.name = name;
		this.address = address;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.phone = phone;
		this.email = email;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	toJSON(): LocationDTOType {
		return {
			id: this.id,
			tenant: this.tenant,
			name: this.name,
			address: this.address,
			city: this.city,
			state: this.state,
			zip: this.zip,
			country: this.country,
			phone: this.phone,
			email: this.email,
			createdAt: this.createdAt.toISOString(),
			updatedAt: this.updatedAt.toISOString(),
		};
	}

	static fromJSON(data: LocationDTOType): Location;
	static fromJSON(data: LocationDTOType[]): Location[];
	static fromJSON(
		data: LocationDTOType | LocationDTOType[]
	): Location | Location[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) =>
					new Location(
						item.id,
						item.tenant,
						item.name,
						item.address,
						item.city,
						item.state,
						item.zip,
						item.country,
						item.phone,
						item.email,
						new Date(item.createdAt),
						new Date(item.updatedAt)
					)
			);
		}

		return new Location(
			data.id,
			data.tenant,
			data.name,
			data.address,
			data.city,
			data.state,
			data.zip,
			data.country,
			data.phone,
			data.email,
			new Date(data.createdAt),
			new Date(data.updatedAt)
		);
	}

	toDBType(): LocationDBType {
		return {
			id: this.id,
			tenant_id: this.tenant.id,
			tenant_name: this.tenant.name,
			name: this.name,
			address: this.address,
			city: this.city,
			state: this.state,
			zip: this.zip,
			country: this.country,
			phone: this.phone,
			email: this.email,
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString(),
		};
	}

	static fromDB(data: LocationDBType): Location;
	static fromDB(data: LocationDBType[]): Location[];
	static fromDB(
		data: LocationDBType | LocationDBType[]
	): Location | Location[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) =>
					new Location(
						item.id,
						{
							id: item.tenant_id,
							name: item.tenant_name,
						},
						item.name,
						item.address,
						item.city,
						item.state,
						item.zip,
						item.country,
						item.phone,
						item.email,
						new Date(item.created_at),
						new Date(item.updated_at)
					)
			);
		}

		return new Location(
			data.id,
			{
				id: data.tenant_id,
				name: '',
			},
			data.name,
			data.address,
			data.city,
			data.state,
			data.zip,
			data.country,
			data.phone,
			data.email,
			new Date(data.created_at),
			new Date(data.updated_at)
		);
	}
}

export {Location};

export type {
	LocationDTOType,
	LocationCreateDTOType,
	LocationUpdateDTOType,
	LocationDBType,
	LocationInsertDBType,
	LocationUpdateDBType,
};
