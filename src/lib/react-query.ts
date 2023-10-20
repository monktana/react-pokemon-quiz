import { QueryClient, UseQueryOptions, DefaultOptions } from '@tanstack/react-query';
import { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
  queries: {},
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QueryFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
  ReturnType<FnType>  
>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<QueryFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;
