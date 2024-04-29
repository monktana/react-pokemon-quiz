import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Matchup } from '@/api/schema';
import { axios, queryClient, QueryConfig, QueryFunctionReturnType } from '@/lib';

export const getMatchup = (): Promise<Matchup> => {
  return axios.get(endpoints.matchup);
};

type QueryFunctionType = typeof getMatchup;

type UseMatchupConfig = QueryConfig<QueryFunctionType>;

export const useMatchup = (config: UseMatchupConfig = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKeys.matchup],
    queryFn: getMatchup,
    ...config,
  });
};

export const usePrefetchMatchup = async (config: UseMatchupConfig = {}) => {
  return await queryClient.prefetchQuery({
    queryKey: [queryKeys.matchup],
    queryFn: getMatchup,
    staleTime: 10000,
    ...config,
  });
};
