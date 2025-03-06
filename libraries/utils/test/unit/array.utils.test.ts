import {mapArrayOrSingleItem} from '../../src';

describe('ArrayUtils', () => {
	describe('mapArrayOrSingleItem', () => {
		it('should map single item', () => {
			const result = mapArrayOrSingleItem(1, (item) => item + 1);
			expect(result).toBe(2);
		});

		it('should map array of items', () => {
			const result = mapArrayOrSingleItem([1, 2, 3], (item) => item + 1);
			expect(result).toEqual([2, 3, 4]);
		});
	});
});
