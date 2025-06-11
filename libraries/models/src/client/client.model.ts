import {mapArrayOrSingleItem} from '@lib/utils';

import type {AppSecurityGroup} from '../app-user/app-user.schema';
import {
	ClientDBSchema,
	type ClientDBType,
	ClientDTOSchema,
	type ClientDTOType,
	ClientUpdateDBSchema,
	type ClientUpdateDBType,
} from './client.schema';

class Client {
	id: string;
	name: string;
	secret: string;
	securityGroup: AppSecurityGroup;
	tenantId: string | undefined;
	locationsIds: string[] | undefined;
	description: string;
	isActive: boolean;
	isBlocked: boolean;
	lastLoginAt: Date | undefined;
	createdAt: Date;
	updatedAt: Date;

	static schemas = {
		DTOSchema: ClientDTOSchema,
		DBSchema: ClientDBSchema,
		UpdateDBSchema: ClientUpdateDBSchema,
	};

	constructor(
		id: string,
		name: string,
		description: string,
		secret: string,
		securityGroup: AppSecurityGroup,
		tenantId: string | undefined,
		locationsIds: string[] | undefined,
		isActive: boolean,
		isBlocked: boolean,
		lastLoginAt: Date | undefined,
		createdAt: Date,
		updatedAt: Date
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.secret = secret;
		this.securityGroup = securityGroup;
		this.tenantId = tenantId;
		this.locationsIds = locationsIds;
		this.isActive = isActive;
		this.isBlocked = isBlocked;
		this.lastLoginAt = lastLoginAt;
	}

	toJSON(): ClientDTOType {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			securityGroup: this.securityGroup,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			tenantId: this.tenantId,
			locationsIds: this.locationsIds,
			isActive: this.isActive,
			isBlocked: this.isBlocked,
			lastLoginAt: this.lastLoginAt,
		};
	}

	static fromDBType(dbData: ClientDBType[]): Client[];
	static fromDBType(dbData: ClientDBType): Client;
	static fromDBType(dbData: ClientDBType | ClientDBType[]): Client[] | Client {
		return mapArrayOrSingleItem(dbData, (item) => {
			return new Client(
				item.id,
				item.name,
				item.description,
				item.secret_key,
				item.security_group as AppSecurityGroup,
				item.tenant_id,
				item.locations_ids,
				item.is_active,
				item.is_blocked,
				item.last_login,
				item.created_at,
				item.updated_at
			);
		});
	}

	static fromDTOType(dtoData: ClientDTOType[]): Client[];
	static fromDTOType(dtoData: ClientDTOType): Client;
	static fromDTOType(
		dtoData: ClientDTOType | ClientDTOType[]
	): Client[] | Client {
		return mapArrayOrSingleItem(dtoData, (item) => {
			return new Client(
				item.id,
				item.name,
				item.description,
				'UNKNOWN_SECRET', // Secret is not included in DTO,
				item.securityGroup as AppSecurityGroup,
				item.tenantId,
				item.locationsIds,
				item.isActive,
				item.isBlocked,
				item.lastLoginAt,
				item.createdAt,
				item.updatedAt
			);
		});
	}
}

export {Client};
export type {ClientDBType, ClientDTOType, ClientUpdateDBType};
