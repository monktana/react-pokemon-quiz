import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/lib';
import { LanguageStoreProvider, ScoreStoreProvider } from '@/stores';
import { getBrowserLanguage } from '@/util';

type AppProviderProps = {
  children: React.ReactNode;
  browserLanguage: ReturnType<typeof getBrowserLanguage>;
};

export const AppProvider = ({ children, browserLanguage }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageStoreProvider initialLanguage={browserLanguage}>
        <ScoreStoreProvider initialScore={0}>
          {children}
          <ReactQueryDevtools />
        </ScoreStoreProvider>
      </LanguageStoreProvider>
    </QueryClientProvider>
  );
};
