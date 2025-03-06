const mapArrayOrSingleItem = <T, R>(
	arrayOrSingleItem: T | T[],
	mapFn: (item: T) => R
): R[] | R => {
	if (Array.isArray(arrayOrSingleItem)) {
		return arrayOrSingleItem.map(mapFn);
	}
	return mapFn(arrayOrSingleItem);
};

const isArrayEmpty = <T>(array: T[]): boolean => {
	return Array.isArray(array) && array.length === 0;
};

const isArrayEmptyOrUndefined = <T>(array: T[] | undefined): boolean => {
	return array === undefined || isArrayEmpty(array);
};

export {mapArrayOrSingleItem, isArrayEmptyOrUndefined, isArrayEmpty};
