const renameProperty = (
	obj: Record<string, unknown>,
	oldName: string,
	newName: string
) => {
	const shallowCopy = {...obj};
	if (oldName === newName) {
		return shallowCopy;
	}

	if (oldName in shallowCopy) {
		shallowCopy[newName] = shallowCopy[oldName];
		delete shallowCopy[oldName];
	}
	return shallowCopy;
};

const renameProperties = (
	obj: Record<string, unknown>,
	renameMap: Record<string, string>
) => {
	let result = obj;
	Object.entries(renameMap).forEach(([oldName, newName]) => {
		result = renameProperty(result, oldName, newName);
	});
	return result;
};

type SnakeToCamelCase<S> = S extends `${infer T}_${infer U}`
	? `${T}${Capitalize<SnakeToCamelCase<U>>}`
	: S;

const renameSnakeCasePropertiesToCamelCase = <
	Input extends Record<string, unknown>,
>(
	obj: Input
) => {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			const newKey = key.replace(/_([a-z])/g, (g) => g[1]!.toUpperCase());
			// @ts-expect-error, we know that newKey is a correct value for the generic object
			acc[newKey] = value;
			return acc;
		},
		{} as {[K in keyof Input as SnakeToCamelCase<K>]: Input[K]}
	);
};

export {renameProperty, renameProperties, renameSnakeCasePropertiesToCamelCase};
