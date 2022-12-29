import { useCallback, useState } from 'react';

import { usePokemon } from '../api/getPokemon';
import { POKEMON_COUNT } from '../types';

const getRandomPokemonID = () => Math.floor(Math.random() * POKEMON_COUNT + 1);

export const useMatchup = () => {
  const [attackingID, setAttackingID] = useState<number>(getRandomPokemonID());
  const [defendingID, setDefendingID] = useState<number>(getRandomPokemonID());

  const attacking = usePokemon({id: `${attackingID}`});
  const defending = usePokemon({id: `${defendingID}`});

  const refetch = useCallback(() => {
    setAttackingID(getRandomPokemonID());
    setDefendingID(getRandomPokemonID());
  }, []);

  return {
    attacking: attacking.data,
    defending: defending.data,
    move: null,
    refetch
  };
};