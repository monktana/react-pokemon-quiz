import { useSuspenseQuery } from '@tanstack/react-query';

import endpoints from '@/api/endpoints';
import queryKeys from '@/api/query-keys';
import { Pokemon } from '@/api/schema';
import { axios } from '@/lib/axios';
import { QueryConfig, QueryFunctionReturnType } from '@/lib/react-query';

export const getPokemon = (): Promise<Pokemon> => {
  return axios.get(endpoints.pokemon);
};

type QueryFunctionType = typeof getPokemon;

type UsePokemonOptions = {
  config?: QueryConfig<QueryFunctionType>;
};

export const usePokemon = ({ config }: UsePokemonOptions = {}) => {
  return useSuspenseQuery<QueryFunctionReturnType<QueryFunctionType>>({
    queryKey: [queryKeys.pokemon],
    queryFn: getPokemon,
    ...config,
  });
};
