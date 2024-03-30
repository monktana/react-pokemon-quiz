import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Pokemon } from '@/api/schema';
import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';

export const getPokemon = (): Promise<Pokemon> => {
  return axios.get(endpoints.pokemon);
};

type QueryFnType = typeof getPokemon;

type UsePokemonOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const usePokemon = ({ config }: UsePokemonOptions = {}) => {
  return useSuspenseQuery<QueryFnReturnType<QueryFnType>>({
    queryKey: [queryKeys.pokemon],
    queryFn: getPokemon,
    ...config,
  });
};
