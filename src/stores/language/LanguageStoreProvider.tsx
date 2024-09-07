import React, { PropsWithChildren } from 'react';
import { createStore, StoreApi } from 'zustand';

import { LanguageStore } from '@/stores';
import { getAppLanguage } from '@/util';

export type LanguageStoreProviderProps = PropsWithChildren<{
  initialLanguage: string;
}>;

export const LanguageStoreContext = React.createContext<StoreApi<LanguageStore> | null>(null);

export const LanguageStoreProvider = ({
  children,
  initialLanguage,
}: LanguageStoreProviderProps) => {
  const appLanguage = getAppLanguage(initialLanguage);
  const [store] = React.useState(() =>
    createStore<LanguageStore>()((set) => ({
      language: appLanguage,
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
