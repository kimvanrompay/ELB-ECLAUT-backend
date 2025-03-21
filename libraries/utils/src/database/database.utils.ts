const parseStringWithWildcardsToLikeFilter = (value: string) => {
	const escapedValue = value.replace(/%/g, '\\%').replace(/_/g, '\\_');
	return escapedValue.replace(/\*/g, '%').replace(/\?/g, '_');
};

const FLOAT_PRECISION = 2;
const adjustFloatToInt = (value: number) => {
	return Math.round(value * Math.pow(10, FLOAT_PRECISION));
};

const adjustIntToFloat = (value: number) => {
	return Number((value / Math.pow(10, FLOAT_PRECISION)).toFixed(2));
};

export {
	parseStringWithWildcardsToLikeFilter,
	adjustIntToFloat,
	adjustFloatToInt,
};
