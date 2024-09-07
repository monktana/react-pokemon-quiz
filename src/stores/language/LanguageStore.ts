import { useContext } from 'react';
import { useStore } from 'zustand';

import { LanguageStoreContext } from '@/stores';
import { Language } from '@/util';

export type LanguageStore = {
  language: Language;
  actions: {
    setLanguage: (language: Language) => void;
  };
};

const useLanguageStore = (selector: (state: LanguageStore) => unknown) => {
  const store = useContext(LanguageStoreContext);
  if (!store) {
    throw new Error('Missing LanguageStoreProvider');
  }
  return useStore(store, selector);
};

export const useLanguage = () =>
  useLanguageStore((state) => state.language) as LanguageStore['language'];

export const useLanguageActions = () =>
  useLanguageStore((state) => state.actions) as LanguageStore['actions'];
