
import { useCallback } from 'react';

import { TEXTS, LanguageKey, TextKey } from './i18n';

export const useLocalization = () => {
  const getText = useCallback((language: LanguageKey, key: TextKey) => {
    return TEXTS[language][key];
  }, []);

  return {getText};
}