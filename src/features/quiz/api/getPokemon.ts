import { useQuery } from 'react-query'

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Pokemon } from "../types";

export const getPokemon = ({ id }: { id: string }): Promise<Pokemon> => {
  return axios.get(`/pokemon/${id}`);
};

type QueryFnType = typeof getPokemon;

type UsePokemonOptions = {
  id: string,
  config?: QueryConfig<QueryFnType>;
};

export const usePokemon = ({ id, config }: UsePokemonOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon({id}),
  });
};