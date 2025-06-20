import type {DatabaseQueryFilters} from '../../src/database/database-filters.types';
import {parseQueryParamsToDatabaseFilters} from '../../src/query-params.utils';

describe('QueryParamsUtils', () => {
	describe('parseQueryParamsToDatabaseFilters', () => {
		it('should add non-filter keys to the filters object', () => {
			const queryParams = {
				a: '1',
				b: '2',
				c: 9,
				d: 'null',
				e: 'undefined',
				f: 'true',
				g: 'false',
				h: null,
				i: undefined,
				j: true,
				k: false,
			};

			const filters = parseQueryParamsToDatabaseFilters(queryParams);

			expect(filters).toEqual({});
		});

		it('should parse limit and offset to numbers', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				limit: '10',
				offset: '5',
			});

			expect(filters).toEqual({
				limit: 10,
				offset: 5,
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				limit: 99,
				offset: 100,
			});

			expect(filters2).toEqual({
				limit: 99,
				offset: 100,
			});
		});

		it('should parse EQUALS filter with string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'eq',
						columnName: 'my_column',
						value: 'Hello',
					},
				],
			};

			expect(filters).toEqual(expected);
		});

		it('should parse EQUALS filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'eq',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should parse EQUALS filter with boolean value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': 'true',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': 'false',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': true,
			});

			const filters4 = parseQueryParamsToDatabaseFilters({
				'my_column[eq]': false,
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'eq',
						columnName: 'my_column',
						value: true,
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'eq',
						columnName: 'my_column',
						value: false,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
			expect(filters3).toEqual(expected);
			expect(filters4).toEqual(expected2);
		});

		it('should parse NOT_EQUALS filter with string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'neq',
						columnName: 'my_column',
						value: 'Hello',
					},
				],
			};

			expect(filters).toEqual(expected);
		});

		it('should parse NOT_EQUALS filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'neq',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should parse NOT_EQUALS filter with boolean value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': 'true',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': 'false',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': true,
			});

			const filters4 = parseQueryParamsToDatabaseFilters({
				'my_column[neq]': false,
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'neq',
						columnName: 'my_column',
						value: true,
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'neq',
						columnName: 'my_column',
						value: false,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
			expect(filters3).toEqual(expected);
			expect(filters4).toEqual(expected2);
		});

		it('should parse IN filter with string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[in]': 'Hello,There',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[in]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'in',
						columnName: 'my_column',
						value: ['Hello', 'There'],
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'in',
						columnName: 'my_column',
						value: ['Hello'],
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
		});

		it('should parse IN filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[in]': '1,2',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[in]': '1',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'in',
						columnName: 'my_column',
						value: [1, 2],
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'in',
						columnName: 'my_column',
						value: [1],
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
		});

		it('should parse NOT_IN filter with string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[notIn]': 'Hello,There',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[notIn]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'notIn',
						columnName: 'my_column',
						value: ['Hello', 'There'],
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'notIn',
						columnName: 'my_column',
						value: ['Hello'],
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
		});

		it('should parse NOT_IN filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[notIn]': '1,2',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[notIn]': '1',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'notIn',
						columnName: 'my_column',
						value: [1, 2],
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'notIn',
						columnName: 'my_column',
						value: [1],
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
		});

		it('should parse LIKE filter', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[like]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'like',
						columnName: 'my_column',
						value: 'Hello',
					},
				],
			};

			expect(filters).toEqual(expected);
		});

		it('should parse NOT_LIKE filter', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[notLike]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'notLike',
						columnName: 'my_column',
						value: 'Hello',
					},
				],
			};

			expect(filters).toEqual(expected);
		});

		it('should parse NOT_EQUALS_OR_NULL filter with string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': 'Hello',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'neqOrNull',
						columnName: 'my_column',
						value: 'Hello',
					},
				],
			};

			expect(filters).toEqual(expected);
		});

		it('should parse NOT_EQUALS_OR_NULL filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'neqOrNull',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should parse NOT_EQUALS_OR_NULL filter with boolean value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': 'true',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': 'false',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': true,
			});

			const filters4 = parseQueryParamsToDatabaseFilters({
				'my_column[neqOrNull]': false,
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'neqOrNull',
						columnName: 'my_column',
						value: true,
					},
				],
			};

			const expected2: DatabaseQueryFilters = {
				where: [
					{
						type: 'neqOrNull',
						columnName: 'my_column',
						value: false,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected2);
			expect(filters3).toEqual(expected);
			expect(filters4).toEqual(expected2);
		});

		it('should parse GREATER_THAN filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[gt]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[gt]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[gt]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'gt',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should return NaN when parsing GREATER_THAN filter with non-number string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[gt]': 'Hello',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[gt]': 'true',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[gt]': 'false',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'gt',
						columnName: 'my_column',
						value: NaN,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should parse GREATER_THAN_OR_EQUAL filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[gte]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[gte]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[gte]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'gte',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should return NaN when parsing GREATER_THAN_OR_EQUAL filter with non-number string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[gte]': 'Hello',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[gte]': 'true',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[gte]': 'false',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'gte',
						columnName: 'my_column',
						value: NaN,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should parse LESS_THAN filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[lt]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[lt]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[lt]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'lt',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should return NaN when parsing LESS_THAN filter with non-number string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[lt]': 'Hello',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[lt]': 'true',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[lt]': 'false',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'lt',
						columnName: 'my_column',
						value: NaN,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should parse LESS_THAN_OR_EQUAL filter with number value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[lte]': '123',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[lte]': 123,
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[lte]': '123.000',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'lte',
						columnName: 'my_column',
						value: 123,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});

		it('should return NaN when parsing LESS_THAN_OR_EQUAL filter with non-number string value', () => {
			const filters = parseQueryParamsToDatabaseFilters({
				'my_column[lte]': 'Hello',
			});

			const filters2 = parseQueryParamsToDatabaseFilters({
				'my_column[lte]': 'true',
			});

			const filters3 = parseQueryParamsToDatabaseFilters({
				'my_column[lte]': 'false',
			});

			const expected: DatabaseQueryFilters = {
				where: [
					{
						type: 'lte',
						columnName: 'my_column',
						value: NaN,
					},
				],
			};

			expect(filters).toEqual(expected);
			expect(filters2).toEqual(expected);
			expect(filters3).toEqual(expected);
		});
	});
});
