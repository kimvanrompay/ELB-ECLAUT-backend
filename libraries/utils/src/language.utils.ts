const AVAILABLE_LANGUAGES = ['en', 'fr', 'de', 'es', 'nl'];

const isValidLanguage = (language: string): boolean => {
	return AVAILABLE_LANGUAGES.includes(language);
};

const getDefaultLanguage = (): string => {
	return 'en';
};

const getLanguageOrDefault = (language?: string): string => {
	if (!language || !isValidLanguage(language)) {
		return getDefaultLanguage();
	}
	return language;
};

export {
	AVAILABLE_LANGUAGES,
	isValidLanguage,
	getDefaultLanguage,
	getLanguageOrDefault,
};
