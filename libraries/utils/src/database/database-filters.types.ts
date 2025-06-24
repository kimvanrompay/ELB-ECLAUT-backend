type WhereFilterType =
	| 'eq'
	| 'neq'
	| 'gt'
	| 'gte'
	| 'lt'
	| 'lte'
	| 'in'
	| 'notIn'
	| 'neqOrNull'
	| 'contains'
	| 'like'
	| 'notLike';

type LimitFilterType = 'limit' | 'offset';

type OrderByFilterType = 'orderBy';

type EqualsWhereFilter = {
	type: 'eq';
	columnName: string;
	value: number | string | Date | boolean | null | undefined;
};

type NotEqualsFilter = {
	type: 'neq';
	columnName: string;
	value: number | string | Date | boolean | null | undefined;
};

type GreaterThanWhereFilter = {
	type: 'gt';
	columnName: string;
	value: number | string | Date;
};

type GreaterThanOrEqualWhereFilter = {
	type: 'gte';
	columnName: string;
	value: number | string | Date;
};

type LessThanWhereFilter = {
	type: 'lt';
	columnName: string;
	value: number | string | Date;
};

type LessThanOrEqualWhereFilter = {
	type: 'lte';
	columnName: string;
	value: number | string | Date;
};

type InWhereFilter = {
	type: 'in';
	columnName: string;
	value: (number | string)[];
};

type NotInWhereFilter = {
	type: 'notIn';
	columnName: string;
	value: (number | string)[];
};

type NotEqualOrNullWhereFilter = {
	type: 'neqOrNull';
	columnName: string;
	value: number | string | boolean;
};

type ContainsWhereFilter = {
	type: 'contains';
	columnName: string;
	value: string;
};

type LikeWhereFilter = {
	type: 'like';
	columnName: string;
	value: string;
};

type NotLikeWhereFilter = {
	type: 'notLike';
	columnName: string;
	value: string;
};

type WhereFilter =
	| EqualsWhereFilter
	| NotEqualsFilter
	| GreaterThanWhereFilter
	| GreaterThanOrEqualWhereFilter
	| LessThanWhereFilter
	| LessThanOrEqualWhereFilter
	| InWhereFilter
	| NotInWhereFilter
	| NotEqualOrNullWhereFilter
	| ContainsWhereFilter
	| LikeWhereFilter
	| NotLikeWhereFilter;

type LimitFilter = {
	type: 'limit';
	value: number;
};

type OffsetFilter = {
	type: 'offset';
	value: number;
};

type OrderByFilter = {
	type: 'orderBy';
	columnName: string;
	value: 'asc' | 'desc';
};

type DatabaseQueryFilter =
	| WhereFilter
	| LimitFilter
	| OffsetFilter
	| OrderByFilter;

type DatabaseQueryFilters = {
	where?: WhereFilter[];
	limit?: LimitFilter['value'];
	offset?: OffsetFilter['value'];
	orderBy?: Omit<OrderByFilter, 'type'>[];
};

type PaginatedDatabaseQueryFilters = {
	limit: LimitFilter['value'];
	offset: OffsetFilter['value'];
	where?: WhereFilter[];
	orderBy?: Omit<OrderByFilter, 'type'>[];
};

type WhereFilterFunction<QueryType = string, Value = any> = (
	query: QueryType,
	columnName: string,
	value: Value
) => QueryType;

interface IWhereFilterAdapter<QueryType = string> {
	eq: WhereFilterFunction<QueryType, EqualsWhereFilter['value']>;
	neq: WhereFilterFunction<QueryType, NotEqualsFilter['value']>;
	gt: WhereFilterFunction<QueryType, GreaterThanWhereFilter['value']>;
	gte: WhereFilterFunction<QueryType, GreaterThanOrEqualWhereFilter['value']>;
	lt: WhereFilterFunction<QueryType, LessThanWhereFilter['value']>;
	lte: WhereFilterFunction<QueryType, LessThanOrEqualWhereFilter['value']>;
	in: WhereFilterFunction<QueryType, InWhereFilter['value']>;
	notIn: WhereFilterFunction<QueryType, NotInWhereFilter['value']>;
	neqOrNull: WhereFilterFunction<QueryType, NotEqualOrNullWhereFilter['value']>;
	contains: WhereFilterFunction<QueryType, ContainsWhereFilter['value']>;
	like: WhereFilterFunction<QueryType, LikeWhereFilter['value']>;
	notLike: WhereFilterFunction<QueryType, NotLikeWhereFilter['value']>;
}

interface ILimitFilterAdapter<QueryType = string> {
	limit: (query: QueryType, value: LimitFilter['value']) => QueryType;
	offset: (query: QueryType, value: OffsetFilter['value']) => QueryType;
}

interface IOrderByFilterAdapter<QueryType = string> {
	orderBy: (
		query: QueryType,
		columnName: string,
		value: OrderByFilter['value']
	) => QueryType;
}

interface IDatabaseQueryFilterAdapter {
	applyWhereFilters: <Q>(query: Q, filters: DatabaseQueryFilters) => Q;
	applyLimitFilters: <Q>(query: Q, filters: DatabaseQueryFilters) => Q;
	applyOrderByFilters: <Q>(query: Q, filters: DatabaseQueryFilters) => Q;
	applyFilters: <Q>(query: Q, filters: DatabaseQueryFilters) => Q;
}

export type {
	EqualsWhereFilter,
	GreaterThanWhereFilter,
	GreaterThanOrEqualWhereFilter,
	LessThanWhereFilter,
	LessThanOrEqualWhereFilter,
	InWhereFilter,
	NotInWhereFilter,
	NotEqualOrNullWhereFilter,
	ContainsWhereFilter,
	LikeWhereFilter,
	WhereFilter,
	WhereFilterFunction,
	IWhereFilterAdapter,
	LimitFilter,
	OffsetFilter,
	OrderByFilter,
	DatabaseQueryFilter,
	ILimitFilterAdapter,
	IOrderByFilterAdapter,
	IDatabaseQueryFilterAdapter,
	DatabaseQueryFilters,
	WhereFilterType,
	LimitFilterType,
	OrderByFilterType,
	PaginatedDatabaseQueryFilters,
};
