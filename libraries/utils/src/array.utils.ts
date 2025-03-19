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

const doesArrayHaveAllSameItems = <T>(array1: T[], array2: T[]): boolean => {
	if (array1.length !== array2.length) {
		return false;
	}

	return array1.every((item) => array2.includes(item));
};

const doesArrayContainSameItems = <T>(
	arrayWithPossibleMissingItems: T[],
	arrayThatHasAllItems: T[]
): boolean => {
	return arrayWithPossibleMissingItems.every((item) =>
		arrayThatHasAllItems.includes(item)
	);
};

export {
	mapArrayOrSingleItem,
	isArrayEmptyOrUndefined,
	isArrayEmpty,
	doesArrayHaveAllSameItems,
	doesArrayContainSameItems,
};
