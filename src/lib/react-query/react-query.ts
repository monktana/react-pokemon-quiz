import { DefaultOptions, QueryClient } from '@tanstack/react-query';
import { HTTPError } from 'ky';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: HTTPError
  }
}

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
