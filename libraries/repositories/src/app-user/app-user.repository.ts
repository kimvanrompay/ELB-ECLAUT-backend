import {type Knex} from 'knex';

import {
	DatabaseInsertError,
	DatabaseRetrieveError,
	DatabaseUpdateError,
} from '@lib/errors';
import type {
	AppUserDBType,
	AppUserInsertDBType,
	AppUserUpdateDBType,
} from '@lib/models/app-user';
import {AppUser} from '@lib/models/app-user';
import {PinoLogger} from '@lib/utils';
import {
	type DatabaseQueryFilters,
	KnexFilterAdapter,
} from '@lib/utils/db/filters';

import type {IAppUserRepository} from './app-user.repository.types';

const LOGGER = new PinoLogger(
	{
		name: 'AppUserRepository',
	},
	{}
);

class AppUserRepository implements IAppUserRepository {
	private readonly db: Knex;

	constructor(db: Knex) {
		this.db = db;
	}

	private selectUserWithTenant<T = AppUserDBType>() {
		return this.db('app_user')
			.select<T>('app_user.*', 'tenant.name as tenant_name')
			.join('tenant', 'app_user.tenant_id', 'tenant.id');
	}

	async findUsersByFilters(filters?: DatabaseQueryFilters) {
		try {
			const result = await KnexFilterAdapter.applyFilters(
				this.selectUserWithTenant<AppUserDBType[]>(),
				filters
			);

			return AppUser.fromDB(result);
		} catch (error) {
			LOGGER.error(error);
			throw new DatabaseRetrieveError('Error retrieving users');
		}
	}

	async getUserById(id: string): Promise<AppUser | undefined> {
		console.log('getUserById', id);
		try {
			const result = await this.selectUserWithTenant()
				.where({
					'app_user.id': id,
				})
				.first();

			if (!result) {
				return undefined;
			}

			return AppUser.fromDB(result);
		} catch (error) {
			LOGGER.error(error);
			throw new DatabaseRetrieveError('Error retrieving user');
		}
	}

	async getUserByEmail(email: string): Promise<AppUser | undefined> {
		try {
			const result = await this.selectUserWithTenant().where({email}).first();

			if (!result) {
				return undefined;
			}

			return AppUser.fromDB(result);
		} catch (error) {
			LOGGER.error(error);
			throw new DatabaseRetrieveError('Error retrieving user');
		}
	}

	async updateUser(id: string, user: AppUserUpdateDBType): Promise<AppUser> {
		try {
			const result = await this.db<AppUserDBType>('app_user')
				.where({id})
				.update(user);

			if (result === 0) {
				throw new Error('Could not find user to update');
			}

			const updatedUser = await this.getUserById(id);

			if (!updatedUser) {
				throw new Error('Could not find updated user');
			}

			return updatedUser;
		} catch (error) {
			LOGGER.error(
				`Error updating user with id: ${id}, error: ${error?.message}`
			);
			throw new DatabaseUpdateError('Error updating user');
		}
	}

	async createUser(user: AppUserInsertDBType): Promise<AppUser> {
		try {
			const result =
				await this.db<AppUserInsertDBType>('app_user').insert(user);

			if (!result) {
				throw new Error('Could not create user');
			}

			const createdUser = await this.getUserById(user.id);

			if (!createdUser) {
				throw new Error('Could not find created user');
			}

			return createdUser;
		} catch (error) {
			LOGGER.error(error);
			throw new DatabaseInsertError('Error creating user');
		}
	}
}

export {AppUserRepository};
