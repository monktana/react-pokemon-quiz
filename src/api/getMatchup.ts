import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Matchup } from '@/api/schema';
import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';


export const getMatchup = (): Promise<Matchup> => {
  return axios.get(endpoints.matchup);
};

type QueryFnType = typeof getMatchup;

type UseMatchupOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMatchup = ({ config }: UseMatchupOptions = {}) => {
  return useSuspenseQuery<QueryFnReturnType<QueryFnType>>({
    queryKey: [queryKeys.matchup],
    queryFn: getMatchup,
    ...config,
  });
};
