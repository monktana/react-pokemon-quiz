import { useSuspenseQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';
import { Move } from '@/types';

import endpoints from './endpoints';
import queryKeys from './query-keys';

export const getMove = (): Promise<Move> => {
  return axios.get(endpoints.move);
};

type QueryFnType = typeof getMove;

type UseMoveOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMove = ({ config }: UseMoveOptions = {}) => {
  return useSuspenseQuery<QueryFnReturnType<QueryFnType>>({
    queryKey: [queryKeys.move],
    queryFn: getMove,
    ...config,
  });
};
