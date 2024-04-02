import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Matchup } from '@/api/schema';
import { axios } from '@/lib/axios';
import { queryClient, QueryConfig, QueryFunctionReturnType } from '@/lib/react-query';

export const getMatchup = (): Promise<Matchup> => {
  return axios.get(endpoints.matchup);
};

type QueryFunctionType = typeof getMatchup;

type UseMatchupOptions = QueryConfig<QueryFunctionType>;

export const useMatchup = (config: UseMatchupOptions = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKeys.matchup],
    queryFn: getMatchup,
    ...config,
  });
};

export const usePrefetchMatchup = async (config: UseMatchupOptions = {}) => {
  return await queryClient.prefetchQuery({
    queryKey: [queryKeys.matchup],
    queryFn: getMatchup,
    staleTime: 10000,
    ...config,
  });
};
