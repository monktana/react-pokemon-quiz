import { create } from 'zustand';

import { Language } from '@/hooks/Localization/i18n';

type LanguageStore = {
  language: Language;
  actions: {
    setLanguage: (language: Language) => void;
  };
};

const useLanguageStore = create<LanguageStore>()((set) => ({
  language: 'en',
  actions: {
    setLanguage: (language) => set({ language }),
  },
}));

const useLanguageActions = () => useLanguageStore((state) => state.actions);

export const useLanguage = () => useLanguageStore((state) => state.language);
export const useChangeLanguage = () => {
  const { setLanguage } = useLanguageActions();
  const changeLanguage = (language: Language) => {
    document.documentElement.lang = language;
    setLanguage(language);
  };

  return { changeLanguage };
};
