import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { queryClient } from '@/lib/react-query';
import { LanguageStoreProvider, ScoreStoreProvider } from '@/stores';
import theme from '@/theme';
import { getBrowserLanguage } from '@/util';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LanguageStoreProvider initialLanguage={getBrowserLanguage()}>
          <ScoreStoreProvider initialScore={0}>
            {children}
            <ReactQueryDevtools />
          </ScoreStoreProvider>
        </LanguageStoreProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
