import { useSuspenseQuery } from '@tanstack/react-query';

import { Matchup } from '@/api/schema';
import { apiClient, queryClient, QueryConfig, QueryFunctionReturnType } from '@/lib';

const endpoint = 'matchup';
const queryKey = 'matchup';

const getMatchup = async (): Promise<Matchup> => {
  const controller = new AbortController();
  const { signal } = controller;
  return apiClient(endpoint, { signal }).json<Matchup>();
};

type QueryFunctionType = typeof getMatchup;

type UseMatchupConfig = QueryConfig<QueryFunctionType>;

export const useMatchup = (config: UseMatchupConfig = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKey],
    queryFn: getMatchup,
    ...config,
  });
};

export const usePrefetchMatchup = async (config: UseMatchupConfig = {}) => {
  return await queryClient.prefetchQuery({
    queryKey: [queryKey],
    queryFn: getMatchup,
    staleTime: 10000,
    ...config,
  });
};
