import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { Suspense, useCallback } from "react";

import { useLocalization } from "@/hooks/useLocalization";
import { useScoreStore, useAppStateStore, useLanguageStore } from "@/stores";

import { useMatchup } from "../../api";
import { TypeEffectiveness, getAttackEffectiveness } from "../../utils";
import { Pokemon } from "../pokemon";
import { Question } from "../question";
import { Score } from "../score";

export function Game() {
  const { data: matchup, refetch } = useMatchup({config: { suspense: true }});
  const { end } = useAppStateStore((state) => ({end: state.endQuiz}));
  const increase = useScoreStore((state) => state.increase);
  const language = useLanguageStore((state) => state.language);

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
      <Suspense fallback={<>Loading...</>}>
      { matchup && 
        <VStack align="start">
          <Score />
          <Pokemon pokemon={matchup.defender} variant="defend" />
          <Pokemon pokemon={matchup.attacker} variant="attack" />
          <Question attacker={matchup.attacker} move={matchup.move} />
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
            <Button variant="primary" color="fire.300" onClick={() => guess(TypeEffectiveness.NoEffect)}>
              {getText(language, 'types.effectiveness.noeffect')}
            </Button>
            <Button variant="primary" color="electric.300" onClick={() => guess(TypeEffectiveness.NotVeryEffective)}>
              {getText(language, 'types.effectiveness.noteffective')}
            </Button>
            <Button variant="primary" color="grass.300" onClick={() => guess(TypeEffectiveness.Effective)}>
              {getText(language, 'types.effectiveness.effective')}
            </Button>
            <Button variant="primary" color="water.300" onClick={() => guess(TypeEffectiveness.SuperEffective)}>
              {getText(language, 'types.effectiveness.supereffective')}
            </Button>
          </Grid>
        </VStack>
      }
      </Suspense>
    </Box>
  );
}