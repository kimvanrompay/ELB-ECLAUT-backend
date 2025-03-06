import type {Knex} from 'knex';

import type {
	DatabaseQueryFilters,
	IWhereFilterAdapter,
	WhereFilter,
} from './database-filters.types';
import {parseStringWithWildcardsToLikeFilter} from './database.utils';

const KnexWhereFilterAdapter: IWhereFilterAdapter<Knex.QueryBuilder> = {
	eq: (query, columnName, value) => query.where(columnName, value),
	neq: (query, columnName, value) => query.whereNot(columnName, value),
	gt: (query, columnName, value) => query.where(columnName, '>', value),
	gte: (query, columnName, value) => query.where(columnName, '>=', value),
	lt: (query, columnName, value) => query.where(columnName, '<', value),
	lte: (query, columnName, value) => query.where(columnName, '<=', value),
	in: (query, columnName, value) => query.whereIn(columnName, value),
	notIn: (query, columnName, value) => query.whereNotIn(columnName, value),
	neqOrNull: (query, columnName, value) =>
		query.where((qb) => qb.whereNot(columnName, value).orWhereNull(columnName)),
	contains: (query, columnName: string, value: string) =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		query.whereJsonObject(columnName, JSON.stringify([value])),
	like: (query, columnName, value: string) =>
		query.where(
			columnName,
			'ilike',
			`%${parseStringWithWildcardsToLikeFilter(value)}%`
		),
	notLike: (query, columnName, value: string) =>
		query.whereNot(
			columnName,
			'ilike',
			`%${parseStringWithWildcardsToLikeFilter(value)}%`
		),
};

const KnexFilterAdapter = {
	applyWhereFilters<TRecord extends Record<string, unknown>, TResult>(
		query: Knex.QueryBuilder<TRecord, TResult>,
		filters: DatabaseQueryFilters
	) {
		filters.where?.forEach((filter: WhereFilter) => {
			const {columnName, value, type} = filter;
			const whereFilterFuntion = KnexWhereFilterAdapter[type];

			if (whereFilterFuntion) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				whereFilterFuntion(query, columnName, value);
			}
		});

		return query;
	},

	applyLimitFilters<TRecord extends Record<string, unknown>, TResult>(
		query: Knex.QueryBuilder<TRecord, TResult>,
		filters: DatabaseQueryFilters
	) {
		if (filters.limit) {
			query.limit(filters.limit);
		}

		if (filters.offset) {
			query.offset(filters.offset);
		}

		return query;
	},
	applyOrderByFilters<TRecord extends Record<string, unknown>, TResult>(
		query: Knex.QueryBuilder<TRecord, TResult>,
		filters: DatabaseQueryFilters
	) {
		if (filters.orderBy && filters.orderBy.length > 0) {
			query.orderBy(
				filters.orderBy.map((filter) => ({
					column: filter.columnName,
					order: filter.value,
				}))
			);
		}

		return query;
	},

	applyFilters<TRecord extends Record<string, unknown>, TResult>(
		query: Knex.QueryBuilder<TRecord, TResult>,
		filters?: DatabaseQueryFilters
	) {
		if (!filters) {
			return query;
		}

		this.applyWhereFilters(query, filters);
		this.applyLimitFilters(query, filters);
		this.applyOrderByFilters(query, filters);

		return query;
	},
};

export {KnexFilterAdapter};
