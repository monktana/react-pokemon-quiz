import { Box, Button, Grid, Tag, Text } from "@chakra-ui/react";
import { Suspense, useCallback } from "react";

import { useScoreStore, useAppStateStore } from "@/stores";

import { useMatchup } from "../../api";
import { TypeEffectiveness, getAttackEffectiveness } from "../../utils";
import { Pokemon } from "../pokemon";
import { getMoveName } from "../pokemon/util";

export function Game() {
  const { data: matchup, refetch } = useMatchup({config: { suspense: true }});
  const increase = useScoreStore((state) => state.increase);
  const { end } = useAppStateStore((state) => ({end: state.endQuiz}));

  const guess = useCallback((guess: TypeEffectiveness) => {
    const correctAnswer = getAttackEffectiveness(matchup!.move, matchup!.defender);
    if (guess !== correctAnswer) {
      return end();
    }
    increase();
    refetch();
  }, [matchup, increase, end, refetch]);
  
  return (
    <div className="relative h-full grid bg-gradient-to-b from-yellow-100 from-0% via-slate-100 via-10% to-slate-300 to-30%">
      <Suspense fallback={<>Loading...</>}>
      { matchup && 
        <>
          <Grid>
            <Pokemon pokemon={matchup.defender} variant='defending'/>
            <Pokemon pokemon={matchup.attacker} variant='attacking'/>
          </Grid>
          <Box my={2}>
            <Text>
              {matchup.attacker.name} used 
              <Tag borderRadius="md" variant="solid" colorScheme={matchup.move.type.name}>
                {getMoveName(matchup.move, "en")}
              </Tag>
            </Text>
          </Box>
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gap={1}
          >
            <Button onClick={() => guess(TypeEffectiveness.NoEffect)}>{"No Effect"}</Button>
            <Button onClick={() => guess(TypeEffectiveness.NotVeryEffective)}>{"Not Very Effective"}</Button>
            <Button onClick={() => guess(TypeEffectiveness.Effective)}>{"Effective"}</Button>
            <Button onClick={() => guess(TypeEffectiveness.VeryEffective)}>{"Super Effective"}</Button>
          </Grid>
        </>
      }
      </Suspense>
    </div>
  );
}