import { useCallback } from 'react';
import { create } from 'zustand';

import { isSupportedLanguage, Language } from '@/hooks/Localization/i18n';

type LanguageStore = {
  language: Language;
  actions: {
    setLanguage: (language: Language) => void;
  };
};

const navigatorLanguageToAppLanguage = (browserLanguage: string): Language => {
  const languageAbbreviation = browserLanguage.split('-')[0].toLowerCase();
  return isSupportedLanguage(languageAbbreviation) ? languageAbbreviation : 'en';
};

const getBrowserLanguage = () => {
  const browserLanguage = navigator.language ?? navigator.languages[0];
  return navigatorLanguageToAppLanguage(browserLanguage);
};

const useLanguageStore = create<LanguageStore>()((set) => ({
  language: getBrowserLanguage(),
  actions: {
    setLanguage: (language) => set({ language }),
  },
}));

const useLanguageActions = () => useLanguageStore((state) => state.actions);

export const useLanguage = () => useLanguageStore((state) => state.language);
export const useChangeLanguage = () => {
  const { setLanguage } = useLanguageActions();
  const changeLanguage = useCallback(
    (language: Language) => {
      document.documentElement.lang = language;
      setLanguage(language);
    },
    [setLanguage]
  );

  return { changeLanguage };
};
