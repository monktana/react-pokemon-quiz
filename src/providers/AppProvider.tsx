import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/lib';
import { LanguageStoreProvider, ScoreStoreProvider } from '@/stores';
import theme from '@/theme';
import { getBrowserLanguage } from '@/util';

type AppProviderProps = {
  children: React.ReactNode;
  browserLanguage: ReturnType<typeof getBrowserLanguage>;
};

export const AppProvider = ({ children, browserLanguage }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LanguageStoreProvider initialLanguage={browserLanguage}>
          <ScoreStoreProvider initialScore={0}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
            <ReactQueryDevtools />
          </ScoreStoreProvider>
        </LanguageStoreProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
