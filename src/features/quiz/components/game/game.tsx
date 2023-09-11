import { Button, Grid, VStack, useColorModeValue } from '@chakra-ui/react';
import { Suspense, useCallback } from 'react';

import { Loading } from '@/components';
import { useLocalization } from '@/hooks/useLocalization';
import { useScoreStore, useAppStateStore, useLanguageStore } from '@/stores';

import { useMatchup } from '../../api';
import { TypeEffectiveness, getAttackEffectiveness } from '../../utils';
import { Pokemon } from '../pokemon';
import { Question } from '../question';
import { Score } from '../score';

export function Game() {
  const { data: matchup, refetch } = useMatchup();
  const { end } = useAppStateStore((state) => ({ end: state.endQuiz }));
  const increase = useScoreStore((state) => state.increase);
  const language = useLanguageStore((state) => state.language);

  const backgroundColor = useColorModeValue('background.200', 'background.800');
  const borderColor = useColorModeValue('border.500', 'border.100');

  const { getText } = useLocalization();

  const guess = useCallback(
    (guess: TypeEffectiveness) => {
      const correctAnswer = getAttackEffectiveness(matchup!.move, matchup!.defender);
      if (guess !== correctAnswer) {
        return end();
      }
      increase();
      refetch();
    },
    [matchup, increase, end, refetch]
  );

  return (
    <Suspense fallback={<Loading />}>
      {matchup && (
        <VStack align="start">
          <Score />
          <Pokemon pokemon={matchup.defender} variant="defend" />
          <Pokemon pokemon={matchup.attacker} variant="attack" />
          <Question pokemon={matchup.attacker} move={matchup.move} />
          <Grid
            gap={2}
            gridTemplateColumns="repeat(2, 1fr)"
            padding={2}
            width="full"
            rounded="md"
            border="1px solid"
            borderColor={borderColor}
            backgroundColor={backgroundColor}
          >
            <Button
              variant="primary"
              color="fire.300"
              onClick={() => guess(TypeEffectiveness.NoEffect)}
            >
              {getText(language, 'types.effectiveness.noeffect')}
            </Button>
            <Button
              variant="primary"
              color="electric.300"
              onClick={() => guess(TypeEffectiveness.NotVeryEffective)}
            >
              {getText(language, 'types.effectiveness.noteffective')}
            </Button>
            <Button
              variant="primary"
              color="grass.300"
              onClick={() => guess(TypeEffectiveness.Effective)}
            >
              {getText(language, 'types.effectiveness.effective')}
            </Button>
            <Button
              variant="primary"
              color="water.300"
              onClick={() => guess(TypeEffectiveness.SuperEffective)}
            >
              {getText(language, 'types.effectiveness.supereffective')}
            </Button>
          </Grid>
        </VStack>
      )}
    </Suspense>
  );
}
