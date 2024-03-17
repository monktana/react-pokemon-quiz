import { useSuspenseQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';
import { Pokemon } from '@/types';

import endpoints from './endpoints';
import queryKeys from './query-keys';

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
