import { Button, Grid, VStack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

import { useInvalidateMatchup, useMatchup, usePrefetchMatchup } from '@/api';
import { TypeEffectiveness } from '@/api/schema';
import { useLocalization } from '@/hooks';
import { useAppStateActions, useScoreActions } from '@/stores';

import { Pokemon, Question, Score, useGuess } from '../';

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
    <VStack data-testid="game-container" align="start">
      <Score />
      <Pokemon pokemon={matchup.defender!} variant="defender" />
      <Pokemon pokemon={matchup.attacker!} variant="attacker" />
      <Question pokemon={matchup.attacker!} move={matchup.move!} />
      <Grid
        data-testid="decision-buttons"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        padding={2}
        width="full"
        rounded="md"
        border="1px solid"
        borderColor="border.500"
        backgroundColor="background.200"
        _dark={{
          borderColor: 'border.100',
          backgroundColor: 'background.800',
        }}
      >
        <Button
          data-testid="no-effect-button"
          isDisabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.NoEffect)}
        >
          {getText('types.effectiveness.noeffect')}
        </Button>
        <Button
          data-testid="not-effective-button"
          isDisabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.NotVeryEffective)}
        >
          {getText('types.effectiveness.noteffective')}
        </Button>
        <Button
          data-testid="effective-button"
          isDisabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.Effective)}
        >
          {getText('types.effectiveness.effective')}
        </Button>
        <Button
          data-testid="super-effective-button"
          isDisabled={isFetching}
          onClick={() => handleGuess(TypeEffectiveness.SuperEffective)}
        >
          {getText('types.effectiveness.supereffective')}
        </Button>
      </Grid>
    </VStack>
  );
}
