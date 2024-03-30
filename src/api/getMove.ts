import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Move } from '@/api/schema';
import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';

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
