import { useSuspenseQuery } from '@tanstack/react-query';
import { Options } from 'ky';

import { Matchup } from '@/api';
import { apiClient, queryClient } from '@/lib';

const endpoint = 'matchup';
const queryKey = 'matchup';
const staleTime = 10 * 1000;

const getMatchup = async ({ signal }: Options): Promise<Matchup> => {
  return apiClient(endpoint, { signal }).json<Matchup>();
};

export const useMatchup = (id: number) => {
  return useSuspenseQuery({
    queryKey: [queryKey, id],
    queryFn: getMatchup,
    staleTime: staleTime
  });
};

export const usePrefetchMatchup = async (id: number) => {
  return await queryClient.prefetchQuery({
    queryKey: [queryKey, id],
    queryFn: getMatchup,
    staleTime: staleTime
  });
};

export const useCancelMatchup = async () => {
  return await queryClient.cancelQueries({ queryKey: [queryKey] });
};

export const useInvalidateMatchup = async (id: number) => {
  return await queryClient.invalidateQueries({ queryKey: [queryKey, id] });
};
