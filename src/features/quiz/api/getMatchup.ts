import { useQueries } from 'react-query'

import { QueryConfig } from '@/lib/react-query';

import { getPokemon } from './getPokemon';


type QueryFnType = typeof getPokemon;

type UseMatchupOptions = {
  attacking: string,
  defending: string,
  config?: QueryConfig<QueryFnType>;
};

export const useMatchup = ({ attacking, defending, config }: UseMatchupOptions) => {
  return useQueries([
    {
      ...config,
      queryKey: ['pokemon', attacking],
      queryFn: () => getPokemon({id: attacking}),
    },
    {
      ...config,
      queryKey: ['pokemon', defending],
      queryFn: () => getPokemon({id: defending}),
    }
  ]);
};