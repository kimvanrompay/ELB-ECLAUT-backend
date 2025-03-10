import type {
	DatabaseQueryFilters,
	WhereFilterType,
} from './database/database-filters.types';

const parseType = (value: unknown) => {
	if (typeof value === 'number') {
		return value;
	}

	if (value === 'null') {
		return null;
	}

	if (value === 'undefined') {
		return undefined;
	}

	if (typeof value === 'boolean') {
		return value;
	}

	if (typeof value !== 'string') {
		return value;
	}

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

const parseToCorrectType = (
	value: unknown,
	filterType: WhereFilterType
): any => {
	switch (filterType) {
		case 'eq':
		case 'neq':
		case 'neqOrNull':
			return parseType(value);
		case 'gt':
		case 'gte':
		case 'lt':
		case 'lte':
			return Number(value);
		case 'in':
		case 'notIn':
			return (value as string).split(',').map(parseType);
		case 'contains':
			return value;
		case 'notLike':
		case 'like':
			return value;

		default:
			return value;
	}
};

const parseQueryParamsToDatabaseFilters = (queryParams: {
	limit?: string | number;
	offset?: string | number;
	[key: string]: string | number | boolean | null | undefined;
}): DatabaseQueryFilters => {
	const filters: DatabaseQueryFilters = {};

	for (const [key, value] of Object.entries(queryParams)) {
		if (key === 'limit') {
			filters.limit =
				typeof value == 'number' ? value : parseInt(value as string, 10);
			continue;
		}

		if (key === 'offset') {
			filters.offset =
				typeof value == 'number' ? value : parseInt(value as string, 10);
			continue;
		}

		const regex = /^.*\[(\w+)]$/;
		const match = key.match(regex);

		const filterType = match?.[1] as WhereFilterType | undefined;

		if (!filterType) {
			continue;
		}

		const columnName = key.replace(`[${filterType}]`, '');
		const filterValue = parseToCorrectType(value, filterType);

		filters.where ??= [];
		filters.where.push({
			columnName,
			type: filterType,
			value: filterValue,
		});
	}

	return filters;
};

export {parseQueryParamsToDatabaseFilters};
