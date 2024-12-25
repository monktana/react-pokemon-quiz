import React from 'react';
import { useCallback, useState } from 'react';

import { useInvalidateMatchup, useMatchup, usePrefetchMatchup } from '@/api';
import { TypeEffectiveness } from '@/api/schema';
import { useLocalization } from '@/hooks';
import { useAppStateActions, useScoreActions } from '@/stores';

import { Pokemon, PokemonName, PokemonSprite, PokemonTags, Question, Score, useGuess } from '../';
import { Button } from '@/lib/shadcn/ui';

export function Game() {
  const [round, setRound] = useState<number>(1);
  const { data: matchup, isFetching } = useMatchup(round);
  usePrefetchMatchup(round + 1);
  useInvalidateMatchup(round - 1);

  const { getText } = useLocalization();
  const { endQuiz } = useAppStateActions();
  const { increase } = useScoreActions();
  const { makeGuess } = useGuess(matchup);

  const handleGuess = useCallback(
    (guess: TypeEffectiveness) => {
      if (!makeGuess(guess)) {
        return endQuiz();
      }

      increase();
      setRound((round) => round + 1);
    },
    [endQuiz, increase, makeGuess]
  );

  return (
    <div data-testid="game-container" className="flex-start flex items-start">
      <Score />
      <Pokemon pokemon={matchup.defender!} data-testid="defender-pokemon">
        <PokemonSprite
          data-testid="defender-sprite"
          src={matchup.defender!.sprites?.front_default ?? ''}
        />
        <div className="flex w-full items-start text-font-800 dark:text-font-100">
          <PokemonName data-testid="defender-name" />
          <PokemonTags />
        </div>
      </Pokemon>
      <Pokemon pokemon={matchup.attacker!} data-testid="attacker-pokemon">
        <div className="flex w-full flex-col items-start text-font-800 dark:text-font-100">
          <PokemonName data-testid="attacker-name" />
          <PokemonTags />
        </div>
        <PokemonSprite
          data-testid="attacker-sprite"
          src={matchup.attacker!.sprites?.back_default ?? ''}
        />
      </Pokemon>
      <Question pokemon={matchup.attacker!} move={matchup.move!} />
      <div
        data-testid="decision-buttons"
        className="grid w-full grid-cols-2 gap-2 rounded-md border border-border-500 bg-background-200 p-2 dark:border-border-100 dark:bg-background-800"
      >
        <Button
          data-testid="no-effect-button"
          disabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.NoEffect)}
        >
          {getText('types.effectiveness.noeffect')}
        </Button>
        <Button
          data-testid="not-effective-button"
          disabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.NotVeryEffective)}
        >
          {getText('types.effectiveness.noteffective')}
        </Button>
        <Button
          data-testid="effective-button"
          disabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.Effective)}
        >
          {getText('types.effectiveness.effective')}
        </Button>
        <Button
          data-testid="super-effective-button"
          disabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.SuperEffective)}
        >
          {getText('types.effectiveness.supereffective')}
        </Button>
      </div>
    </div>
  );
}
