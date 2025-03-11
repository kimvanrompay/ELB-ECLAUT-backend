import {
	tenantCreateDTOSchema,
	type TenantCreateDTOType,
	tenantDBSchema,
	type TenantDBType,
	tenantDTOSchema,
	type TenantDTOType,
	tenantInsertDBSchema,
	type TenantInsertDBType,
	tenantUpdateDBSchema,
	type TenantUpdateDBType,
	tenantUpdateDTOSchema,
	type TenantUpdateDTOType,
} from './tenant.schema';

class Tenant {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;

	schemas = {
		tenantDTOSchema,
		tenantDBSchema,
		tenantCreateDTOSchema,
		tenantInsertDBSchema,
		tenantUpdateDTOSchema,
		tenantUpdateDBSchema,
	};

	constructor(id: string, name: string, createdAt: Date, updatedAt: Date) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	toJSON(): TenantDTOType {
		return {
			id: this.id,
			name: this.name,
			createdAt: this.createdAt.toISOString(),
			updatedAt: this.updatedAt.toISOString(),
		};
	}

	static fromJSON(data: TenantDTOType): Tenant;
	static fromJSON(data: TenantDTOType[]): Tenant[];
	static fromJSON(data: TenantDTOType | TenantDTOType[]): Tenant | Tenant[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) =>
					new Tenant(
						item.id,
						item.name,
						new Date(item.createdAt),
						new Date(item.updatedAt)
					)
			);
		}

		return new Tenant(
			data.id,
			data.name,
			new Date(data.createdAt),
			new Date(data.updatedAt)
		);
	}

	toDBType(): TenantDBType {
		return {
			id: this.id,
			name: this.name,
			created_at: this.createdAt.toISOString(),
			updated_at: this.updatedAt.toISOString(),
		};
	}

	static fromDB(data: TenantDBType): Tenant;
	static fromDB(data: TenantDBType[]): Tenant[];
	static fromDB(data: TenantDBType | TenantDBType[]): Tenant | Tenant[] {
		if (Array.isArray(data)) {
			return data.map(
				(item) =>
					new Tenant(
						item.id,
						item.name,
						new Date(item.created_at),
						new Date(item.updated_at)
					)
			);
		}

		return new Tenant(
			data.id,
			data.name,
			new Date(data.created_at),
			new Date(data.updated_at)
		);
	}
}

export {Tenant};

export type {
	TenantDTOType,
	TenantCreateDTOType,
	TenantUpdateDTOType,
	TenantDBType,
	TenantInsertDBType,
	TenantUpdateDBType,
};
