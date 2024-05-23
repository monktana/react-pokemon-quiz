import { useSuspenseQuery } from '@tanstack/react-query';

import { Matchup } from '@/api/schema';
import { apiClient, queryClient, QueryConfig, QueryFunctionReturnType } from '@/lib';

const endpoint = 'matchup';
const queryKey = 'matchup';

const getMatchup = async (): Promise<Matchup> => {
  return apiClient(endpoint).json<Matchup>();
};

type QueryFunctionType = typeof getMatchup;

type UseMatchupConfig = QueryConfig<QueryFunctionType>;

export const useMatchup = (id: number, config: UseMatchupConfig = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKey, id],
    queryFn: getMatchup,
    staleTime: 100000,
    ...config,
  });
};

export const usePrefetchMatchup = async (id: number, config: UseMatchupConfig = {}) => {
  return await queryClient.prefetchQuery({
    queryKey: [queryKey, id],
    queryFn: getMatchup,
    staleTime: 100000,
    ...config,
  });
};
