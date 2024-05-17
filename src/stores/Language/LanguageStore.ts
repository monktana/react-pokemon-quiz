import React from 'react';
import { useStore } from 'zustand';

import { Language } from '@/hooks';
import { LanguageStoreContext } from '@/stores';

export type LanguageStore = {
  language: Language;
  actions: {
    setLanguage: (language: Language) => void;
  };
};

const useLanguageStore = (selector: (state: LanguageStore) => unknown) => {
  const store = React.useContext(LanguageStoreContext);
  if (!store) {
    throw new Error('Missing LanguageStoreProvider');
  }
  return useStore(store, selector);
};

export const useLanguage = () =>
  useLanguageStore((state) => state.language) as LanguageStore['language'];
export const useLanguageActions = (): LanguageStore['actions'] =>
  useLanguageStore((state) => state.actions) as LanguageStore['actions'];
