import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Matchup, TypeEffectiveness } from '@/api/schema';
import { useAppStateActions, useScoreActions } from '@/stores';

export const useGuess = (matchup: Matchup, refetch: UseSuspenseQueryResult['refetch']) => {
  const { increase } = useScoreActions();
  const { endQuiz } = useAppStateActions();

  const makeGuess = useCallback(
    (guess: TypeEffectiveness) => {
      if (matchup.effectiveness !== guess) {
        endQuiz();
        return;
      }
      increase();
      refetch();
    },
    [endQuiz, increase, matchup.effectiveness, refetch]
  );

  return { makeGuess };
};
