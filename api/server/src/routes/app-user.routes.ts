import {OpenAPIHono} from '@hono/zod-openapi';

import type {IAppUserService} from '@lib/services/types';
import {defaultValidationHook} from '@lib/utils';
import type {
	DatabaseQueryFilters,
	WhereFilterType,
} from '@lib/utils/db/filters';

import type {Environment} from '../types';
import {findUsersRoute} from './app-user.openapi';

const parseStringToCorrectType = (value: string): any => {
	if (value.toLowerCase() === 'true') {
		return true;
	}

	if (value.toLowerCase() === 'false') {
		return false;
	}

	if (!Number.isNaN(Number(value))) {
		return Number(value);
	}

	return value;
};

const parseQueryParamsToDatabaseFilters = (
	queryParams: Record<string, string>
): DatabaseQueryFilters => {
	const filters: DatabaseQueryFilters = {};

	for (const [key, value] of Object.entries(queryParams)) {
		if (key === 'limit') {
			filters.limit = parseInt(value, 10);
			continue;
		}

		if (key === 'offset') {
			filters.offset = parseInt(value, 10);
			continue;
		}

		const regex = /^.*\[(\w+)]$/;
		const match = key.match(regex);

		const filterType = match?.[1] as WhereFilterType | undefined;

		if (!filterType) {
			continue;
		}

		const columnName = key.replace(`[${filterType}]`, '');
		const filterValue = parseStringToCorrectType(value);

		console.log('Filtering by', columnName, filterType, filterValue);

		filters.where ??= [];
		filters.where.push({
			columnName,
			type: filterType,
			value: filterValue,
		});
	}

	return filters;
};

const createAppUserApi = (appUserService: IAppUserService) => {
	const userApp = new OpenAPIHono<Environment>({
		strict: true,
		defaultHook: defaultValidationHook,
	});

	userApp.openapi(findUsersRoute, async (ctx) => {
		// TODO: get query filters

		console.log('Finding users', ctx.req.query());

		const filters = parseQueryParamsToDatabaseFilters(ctx.req.query());

		const users = await appUserService.findUserByFilters(filters);

		const userDTOs = users.map((user) => user.toJSON());

		return ctx.json(userDTOs, 200);
	});

	return userApp;
};

export {createAppUserApi};
