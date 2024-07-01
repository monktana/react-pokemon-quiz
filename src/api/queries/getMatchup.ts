import { useSuspenseQuery } from '@tanstack/react-query';
import { Options } from 'ky';

import { Matchup } from '@/api/schema';
import { apiClient, queryClient, QueryConfig, QueryFunctionReturnType } from '@/lib';

const endpoint = 'matchup';
const queryKey = 'matchup';
const staleTime = 10 * 1000;

const getMatchup = async ({ signal }: Options): Promise<Matchup> => {
  return apiClient(endpoint, { signal }).json<Matchup>();
};

type QueryFunctionType = typeof getMatchup;

type UseMatchupConfig = QueryConfig<QueryFunctionType>;

export const useMatchup = (id: number, config: UseMatchupConfig = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKey, id],
    queryFn: getMatchup,
    staleTime: staleTime,
    ...config,
  });
};

export const usePrefetchMatchup = async (id: number, config: UseMatchupConfig = {}) => {
  return await queryClient.prefetchQuery({
    queryKey: [queryKey, id],
    queryFn: getMatchup,
    staleTime: staleTime,
    ...config,
  });
};

export const useCancelMatchup = async () => {
  return await queryClient.cancelQueries({ queryKey: [queryKey] });
};

export const useInvalidateMatchup = async (id: number) => {
  return await queryClient.invalidateQueries({ queryKey: [queryKey, id] });
};
