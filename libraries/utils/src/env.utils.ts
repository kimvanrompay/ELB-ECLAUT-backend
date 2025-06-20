const getEnvVariable = <T>(key: string, defaultValue: T): T => {
	const value = process.env[key];
	return value ? (value as unknown as T) : defaultValue;
};

const isProductionBuild = () => {
	return process.env.NODE_ENV === 'production';
};

const isDevelopmentBuild = () => {
	return process.env.NODE_ENV === 'development';
};

export {getEnvVariable, isProductionBuild, isDevelopmentBuild};
