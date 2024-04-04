import { create } from 'zustand';

import { Language } from '@/hooks/Localization/i18n';

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageStore>()((set) => ({
  language: 'en',
  setLanguage: (language) => set(() => ({ language })),
}));
