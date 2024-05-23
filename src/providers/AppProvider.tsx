import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';

import { queryClient } from '@/lib/react-query';
import { LanguageStoreProvider } from '@/stores';
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
          {children}
          <ReactQueryDevtools />
        </LanguageStoreProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
