const parseStringWithWildcardsToLikeFilter = (value: string) => {
	const escapedValue = value.replace(/%/g, '\\%').replace(/_/g, '\\_');
	return escapedValue.replace(/\*/g, '%').replace(/\?/g, '_');
};

export {parseStringWithWildcardsToLikeFilter};
