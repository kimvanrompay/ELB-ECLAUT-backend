import {mapArrayOrSingleItem} from '@lib/utils';

import type {Tenant} from '../tenant/tenant.model';
import {
	TenantLocationCreateDTOSchema,
	type TenantLocationCreateDTOType,
	TenantLocationDBSchema,
	type TenantLocationDBType,
	TenantLocationDTOSchema,
	type TenantLocationDTOType,
	TenantLocationInsertDBSchema,
	type TenantLocationInsertDBType,
	TenantLocationUpdateDBSchema,
	type TenantLocationUpdateDBType,
	TenantLocationUpdateDTOSchema,
	type TenantLocationUpdateDTOType,
} from './tenant-location.schema';

class TenantLocation {
	id: string;
	tenant: {
		id: Tenant['id'];
		name: Tenant['name'];
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
	isActive: boolean;

	static schemas = {
		TenantLocationDTOSchema,
		TenantLocationDBSchema,
		TenantLocationCreateDTOSchema,
		TenantLocationInsertDBSchema,
		TenantLocationUpdateDTOSchema,
		TenantLocationUpdateDBSchema,
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
		updatedAt: Date,
		isActive: boolean
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
		this.isActive = isActive;
	}

	toJSON(): TenantLocationDTOType {
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
			isActive: this.isActive,
		};
	}

	static fromJSON(data: TenantLocationDTOType): TenantLocation;
	static fromJSON(data: TenantLocationDTOType[]): TenantLocation[];
	static fromJSON(
		data: TenantLocationDTOType | TenantLocationDTOType[]
	): TenantLocation | TenantLocation[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new TenantLocation(
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
				new Date(item.updatedAt),
				item.isActive
			);
		});
	}

	toDBType(): TenantLocationDBType {
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
			created_at: this.createdAt,
			updated_at: this.updatedAt,
			is_active: this.isActive,
		};
	}

	static fromDB(data: TenantLocationDBType): TenantLocation;
	static fromDB(data: TenantLocationDBType[]): TenantLocation[];
	static fromDB(
		data: TenantLocationDBType | TenantLocationDBType[]
	): TenantLocation | TenantLocation[] {
		return mapArrayOrSingleItem(data, (item) => {
			return new TenantLocation(
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
				item.phone ?? undefined,
				item.email,
				new Date(item.created_at),
				new Date(item.updated_at),
				item.is_active
			);
		});
	}

	static createDBUpdate(
		data: TenantLocationUpdateDTOType
	): TenantLocationUpdateDBType {
		return {
			...data,
		};
	}
}

export {TenantLocation};

export type {
	TenantLocationDTOType,
	TenantLocationCreateDTOType,
	TenantLocationUpdateDTOType,
	TenantLocationDBType,
	TenantLocationInsertDBType,
	TenantLocationUpdateDBType,
};
