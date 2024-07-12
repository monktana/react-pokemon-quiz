import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { queryClient } from '@/lib/react-query';
import { LanguageStoreProvider, ScoreStoreProvider } from '@/stores';
import theme from '@/theme';
import { Language } from '@/util';

type AppProviderProps = {
  children: React.ReactNode;
  initialLanguage: Language;
};

export const AppProvider = ({ children, initialLanguage }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <LanguageStoreProvider initialLanguage={initialLanguage}>
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
