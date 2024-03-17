import { Button, Grid, VStack, useColorModeValue } from '@chakra-ui/react';
import { Suspense, useCallback } from 'react';

import { useMatchup } from '@/api';
import { Loading, Question } from '@/components';
import { Pokemon } from '@/components/pokemon';
import { Score } from '@/components/score';
import { useLocalization } from '@/hooks/useLocalization';
import { useLanguageStore } from '@/stores';
import { TypeEffectiveness } from '@/types';

export function Game() {
  const { data: matchup, refetch } = useMatchup();
  const language = useLanguageStore((state) => state.language);

  const backgroundColor = useColorModeValue('background.200', 'background.800');
  const borderColor = useColorModeValue('border.500', 'border.100');

  const { getText } = useLocalization();

  const guess = useCallback((guess: TypeEffectiveness) => {
    if (guess === matchup.effectiveness) {
      refetch();
    }
  }, [matchup.effectiveness, refetch]);

  return (
    <Suspense fallback={<Loading />}>
      <VStack align="start">
        <Score />
        <Pokemon pokemon={matchup.defender} variant="defend" />
        <Pokemon pokemon={matchup.attacker} variant="attack" />
        <Question pokemon={matchup.attacker} move={matchup.move} />
        <Grid
          data-cy="decision-buttons"
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
            data-cy="no-effect-button"
            variant="primary"
            color="fire.300"
            onClick={() => guess(TypeEffectiveness.NoEffect)}
          >
            {getText(language, 'types.effectiveness.noeffect')}
          </Button>
          <Button
            data-cy="not-effective-button"
            variant="primary"
            color="electric.300"
            onClick={() => guess(TypeEffectiveness.NotVeryEffective)}
          >
            {getText(language, 'types.effectiveness.noteffective')}
          </Button>
          <Button
            data-cy="effective-button"
            variant="primary"
            color="grass.300"
            onClick={() => guess(TypeEffectiveness.Effective)}
          >
            {getText(language, 'types.effectiveness.effective')}
          </Button>
          <Button
            data-cy="super-effective-button"
            variant="primary"
            color="water.300"
            onClick={() => guess(TypeEffectiveness.SuperEffective)}
          >
            {getText(language, 'types.effectiveness.supereffective')}
          </Button>
        </Grid>
      </VStack>
    </Suspense>
  );
}
