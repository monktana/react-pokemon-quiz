import { Button, Grid, Skeleton, VStack } from '@chakra-ui/react';

import { useMatchup } from '@/api';
import { TypeEffectiveness } from '@/api/schema';
import { useLocalization } from '@/hooks';
import { useLanguage } from '@/stores';

import { Pokemon, Question, Score, useGuess } from '../';

export function Game() {
  const { data, refetch, isRefetching } = useMatchup();
  const { getText } = useLocalization();
  const { makeGuess } = useGuess(data, refetch);
  const language = useLanguage();

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
          data-cy="no-effect-button"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.NoEffect)}
        >
          {getText(language, 'types.effectiveness.noeffect')}
        </Button>
        <Button
          data-cy="not-effective-button"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.NotVeryEffective)}
        >
          {getText(language, 'types.effectiveness.noteffective')}
        </Button>
        <Button
          data-cy="effective-button"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.Effective)}
        >
          {getText(language, 'types.effectiveness.effective')}
        </Button>
        <Button
          data-cy="super-effective-button"
          isDisabled={isRefetching}
          onClick={() => makeGuess(TypeEffectiveness.SuperEffective)}
        >
          {getText(language, 'types.effectiveness.supereffective')}
        </Button>
      </Grid>
    </VStack>
  );
}
