
import { useCallback } from 'react';

import LOCALIZATION_TEXTS from './i18n.json';
export type LanguageKey = keyof typeof LOCALIZATION_TEXTS;
export type TextKey = keyof typeof LOCALIZATION_TEXTS.de;

export const useLocalization = () => {
  const getText = useCallback((language: LanguageKey, key: TextKey) => {
    return LOCALIZATION_TEXTS[language][key];
  }, []);

  return {getText};
}