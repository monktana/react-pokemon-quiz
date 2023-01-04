import { useQuery } from 'react-query'

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Pokemon, Move } from "../types";

type PokemonMatchup = {
  attacker: Pokemon,
  defender: Pokemon,
  move: Move
}

export const getMatchup = (): Promise<PokemonMatchup> => {
  return axios.get('/');
};

type QueryFnType = typeof getMatchup;

type UseMatchupOptions = {
  config?: QueryConfig<QueryFnType>;
}

export const useMatchup = ({ config }: UseMatchupOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['matchup'],
    queryFn: () => getMatchup(),
  });
};