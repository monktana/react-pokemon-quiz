import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Move } from '@/api/schema';
import { axios } from '@/lib/axios';
import { QueryConfig, QueryFunctionReturnType } from '@/lib/react-query';

export const getMove = (): Promise<Move> => {
  return axios.get(endpoints.move);
};

type QueryFunctionType = typeof getMove;

type UseMoveOptions = {
  config?: QueryConfig<QueryFunctionType>;
};

export const useMove = ({ config }: UseMoveOptions = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKeys.move],
    queryFn: getMove,
    ...config,
  });
};
