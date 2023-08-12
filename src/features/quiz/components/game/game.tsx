import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { Suspense, useCallback } from "react";

import { useLocalization } from "@/hooks/useLocalization";
import { useScoreStore, useAppStateStore } from "@/stores";

import { useMatchup } from "../../api";
import { TypeEffectiveness, getAttackEffectiveness } from "../../utils";
import { Attack } from "../attack";
import { Pokemon } from "../pokemon";
import { Score } from "../score";

export function Game() {
  const { data: matchup, refetch } = useMatchup({config: { suspense: true }});
  const increase = useScoreStore((state) => state.increase);
  const { end } = useAppStateStore((state) => ({end: state.endQuiz}));

  const { getText } = useLocalization();

  const guess = useCallback((guess: TypeEffectiveness) => {
    const correctAnswer = getAttackEffectiveness(matchup!.move, matchup!.defender);
    if (guess !== correctAnswer) {
      return end();
    }
    increase();
    refetch();
  }, [matchup, increase, end, refetch]);
  
  return (
    <Box>
      <Score />
      <Suspense fallback={<>Loading...</>}>
      { matchup && 
        <VStack>
          <Pokemon pokemon={matchup.defender} variant="defend" />
          <Pokemon pokemon={matchup.attacker} variant="attack" />
          <Attack attacker={matchup.attacker} move={matchup.move} />
          <Grid
            gap={2}
            gridTemplateColumns="repeat(2, 1fr)"
            padding={2}
            width="full"
            rounded="md"
            border="1px solid"
            borderColor="border"
            backgroundColor="background.500"
          >
            <Button backgroundColor="background.100" color="fire.300" onClick={() => guess(TypeEffectiveness.NoEffect)}>{getText('en', 'types.effectiveness.noeffect')}</Button>
            <Button backgroundColor="background.100" color="electric.300" onClick={() => guess(TypeEffectiveness.NotVeryEffective)}>{getText('en', 'types.effectiveness.noteffective')}</Button>
            <Button backgroundColor="background.100" color="grass.300" onClick={() => guess(TypeEffectiveness.Effective)}>{getText('en', 'types.effectiveness.effective')}</Button>
            <Button backgroundColor="background.100" color="water.300" onClick={() => guess(TypeEffectiveness.SuperEffective)}>{getText('en', 'types.effectiveness.supereffective')}</Button>
          </Grid>
        </VStack>
      }
      </Suspense>
    </Box>
  );
}