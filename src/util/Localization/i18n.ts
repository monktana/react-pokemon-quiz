import LOCALIZATION_TEXTS from './i18n.json';

//https://datatracker.ietf.org/doc/html/rfc5646
export const Languages = ['en', 'de'] as const;
export type Language = (typeof Languages)[number];
export const isSupportedLanguage = (language: string): language is Language =>
  ['en', 'de'].includes(language);

export type TextKey = keyof (typeof LOCALIZATION_TEXTS)[Language];
export const geti18nText = (language: Language, key: TextKey) => LOCALIZATION_TEXTS[language][key];

/**
 * Maps the given browser language to a supported abbreviation.
 * Will default to 'en'.
 *
 * @param browserLanguage - The language abbreviation read from the browser.
 */
const navigatorLanguageToAppLanguage = (browserLanguage: string): Language => {
  const languageAbbreviation = browserLanguage.split('-')[0].toLowerCase();
  return isSupportedLanguage(languageAbbreviation) ? languageAbbreviation : 'en';
};

/**
 * Reads the language set in the browser.
 */
export const getBrowserLanguage = () => {
  const browserLanguage = navigator.language;
  return navigatorLanguageToAppLanguage(browserLanguage);
};
