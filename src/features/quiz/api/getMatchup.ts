import { useSuspenseQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';

import { Pokemon, Move } from '../types';

type PokemonMatchup = {
  attacker: Pokemon;
  defender: Pokemon;
  move: Move;
};

export const getMatchup = (): Promise<PokemonMatchup> => {
  return axios.get('/matchup');
};

type QueryFnType = typeof getMatchup;

type UseMatchupOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMatchup = ({ config }: UseMatchupOptions = {}) => {
  return useSuspenseQuery<QueryFnReturnType<QueryFnType>>({
    queryKey: ['matchup'],
    queryFn: getMatchup,
    ...config,
  });
};
