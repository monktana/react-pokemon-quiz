import { DefaultOptions, QueryClient, UseQueryOptions } from '@tanstack/react-query';
import { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

type QueryFunctionType = (...args: any) => any;

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QueryFunctionReturnType<FunctionType extends QueryFunctionType> = PromiseValue<
  ReturnType<FunctionType>
>;

export type QueryConfig<FunctionType extends QueryFunctionType> = Omit<
  UseQueryOptions<QueryFunctionReturnType<FunctionType>>,
  'queryKey' | 'queryFn'
>;
