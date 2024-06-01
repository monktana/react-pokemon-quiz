import React, { PropsWithChildren } from 'react';
import { createStore, StoreApi } from 'zustand';

import { LanguageStore } from '@/stores';
import { Language } from '@/util';

export type LanguageStoreProviderProps = PropsWithChildren<{
  initialLanguage: Language;
}>;

export const LanguageStoreContext = React.createContext<StoreApi<LanguageStore> | null>(null);

export const LanguageStoreProvider = ({
  children,
  initialLanguage,
}: LanguageStoreProviderProps) => {
  const [store] = React.useState(() =>
    createStore<LanguageStore>()((set) => ({
      language: initialLanguage,
      actions: {
        setLanguage: (language) => {
          document.documentElement.lang = language;
          set({ language });
        },
      },
    }))
  );

  return <LanguageStoreContext.Provider value={store}>{children}</LanguageStoreContext.Provider>;
};
