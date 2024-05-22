import { useCallback } from 'react';

import { Matchup, TypeEffectiveness } from '@/api/schema';

export const useGuess = (matchup: Matchup) => {
  const makeGuess = useCallback(
    (guess: TypeEffectiveness) => {
      return matchup.effectiveness === guess;
    },
    [matchup.effectiveness]
  );

  return { makeGuess };
};
