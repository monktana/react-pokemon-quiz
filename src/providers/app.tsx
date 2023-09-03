import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Error } from '@/components';
import { queryClient } from '@/lib/react-query';
import theme from '@/theme';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <span>Loading...</span>
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={Error}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ChakraProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
