import { isSupportedLanguage, Language } from '@/hooks';

const navigatorLanguageToAppLanguage = (browserLanguage: string): Language => {
  const languageAbbreviation = browserLanguage.split('-')[0].toLowerCase();
  return isSupportedLanguage(languageAbbreviation) ? languageAbbreviation : 'en';
};

export const getBrowserLanguage = () => {
  const browserLanguage = navigator.language;
  return navigatorLanguageToAppLanguage(browserLanguage);
};
