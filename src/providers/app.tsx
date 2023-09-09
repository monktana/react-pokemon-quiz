import { ChakraProvider } from '@chakra-ui/react';
import * as Sentry from "@sentry/react";
import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Error, Loading } from '@/components';
import { queryClient } from '@/lib/react-query';
import theme from '@/theme';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Sentry.ErrorBoundary fallback={<Error />}>
        <React.Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </React.Suspense>
      </Sentry.ErrorBoundary>
    </ChakraProvider>
  );
};
