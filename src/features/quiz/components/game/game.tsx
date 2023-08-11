import { Box, Button, Flex, Grid, VStack } from "@chakra-ui/react";
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
          <Flex gap={2}>
            <Pokemon pokemon={matchup.attacker} />
            <Pokemon pokemon={matchup.defender} />
          </Flex>
          <Attack attacker={matchup.attacker} move={matchup.move} />
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gap={2}
            width="full"
            rounded="md"
          >
            <Button backgroundColor="#393939" onClick={() => guess(TypeEffectiveness.NoEffect)}>{getText('en', 'types.effectiveness.noeffect')}</Button>
            <Button backgroundColor="#393939" onClick={() => guess(TypeEffectiveness.NotVeryEffective)}>{getText('en', 'types.effectiveness.noteffective')}</Button>
            <Button backgroundColor="#393939" onClick={() => guess(TypeEffectiveness.Effective)}>{getText('en', 'types.effectiveness.effective')}</Button>
            <Button backgroundColor="#393939" onClick={() => guess(TypeEffectiveness.SuperEffective)}>{getText('en', 'types.effectiveness.supereffective')}</Button>
          </Grid>
        </VStack>
      }
      </Suspense>
    </Box>
  );
}