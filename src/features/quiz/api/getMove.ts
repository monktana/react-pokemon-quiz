import { useQuery } from 'react-query'

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { PokemonMove } from "../types";

export const getPokemonMove = ({ id }: { id?: string }): Promise<PokemonMove> => {
  return axios.get(`/move/${id}`);
};

type QueryFnType = typeof getPokemonMove;

type UsePokemonOptions = {
  id?: string,
  config?: QueryConfig<QueryFnType>;
};

export const usePokemonMove = ({ id, config }: UsePokemonOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['pokemonmove', id],
    queryFn: () => getPokemonMove({id}),
  });
};