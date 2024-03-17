import { useSuspenseQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { QueryFnReturnType, QueryConfig } from '@/lib/react-query';
import { Pokemon, Move, TypeEffectiveness } from '@/types';

import endpoints from './endpoints';
import queryKeys from './query-keys';

type PokemonMatchup = {
  attacker: Pokemon;
  defender: Pokemon;
  move: Move;
  effectiveness: TypeEffectiveness;
};

export const getMatchup = (): Promise<PokemonMatchup> => {
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
