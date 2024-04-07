import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Matchup, TypeEffectiveness } from '@/api/schema';
import { useScoreStore } from '@/stores';

export const useGuess = (matchup: Matchup, refetch: UseSuspenseQueryResult['refetch']) => {
  const { increase, decrease } = useScoreStore((state) => ({
    increase: state.increase,
    decrease: state.decrease,
  }));

  const makeGuess = useCallback(
    (guess: TypeEffectiveness) => {
      if (matchup.effectiveness !== guess) {
        decrease();
        return;
      }
      increase();
      refetch();
    },
    [decrease, increase, matchup.effectiveness, refetch]
  );

  return { makeGuess };
};
