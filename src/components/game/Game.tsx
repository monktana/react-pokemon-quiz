import { Button, Grid, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';

import { useMatchup } from '@/api';
import { TypeEffectiveness } from '@/api/schema';
import { Question } from '@/components';
import { useGuess } from '@/components/game/useGuess';
import { Pokemon } from '@/components/pokemon';
import { Score } from '@/components/score';
import { useLocalization } from '@/hooks';
import { useLanguageStore } from '@/stores';

export function Game() {
  const { data, refetch, isRefetching } = useMatchup();
  const { getText } = useLocalization();
  const { makeGuess } = useGuess(data, refetch);
  const language = useLanguageStore((state) => state.language);

  const backgroundColor = useColorModeValue('background.200', 'background.800');
  const borderColor = useColorModeValue('border.500', 'border.100');

  return (
    <VStack align="start">
      <Score />
      <Skeleton isLoaded={!isRefetching} variant="quiz" width="full">
        <Pokemon pokemon={data.defender!} variant="defender" />
      </Skeleton>
      <Skeleton isLoaded={!isRefetching} variant="quiz" width="full">
        <Pokemon pokemon={data.attacker!} variant="attacker" />
      </Skeleton>
      <Skeleton isLoaded={!isRefetching} variant="quiz" width="full">
        <Question pokemon={data.attacker!} move={data.move!} />
      </Skeleton>
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
          color="fire.500"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.Value0)}
        >
          {getText(language, 'types.effectiveness.noeffect')}
        </Button>
        <Button
          data-cy="not-effective-button"
          color="electric.500"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.Value1)}
        >
          {getText(language, 'types.effectiveness.noteffective')}
        </Button>
        <Button
          data-cy="effective-button"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.Value2)}
        >
          {getText(language, 'types.effectiveness.effective')}
        </Button>
        <Button
          data-cy="super-effective-button"
          color="grass.500"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.Value3)}
        >
          {getText(language, 'types.effectiveness.supereffective')}
        </Button>
      </Grid>
    </VStack>
  );
}
