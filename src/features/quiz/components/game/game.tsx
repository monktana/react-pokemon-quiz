import { Box, Button, Flex, Grid, Tag, Text } from "@chakra-ui/react";
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
    <Box>
      <Suspense fallback={<>Loading...</>}>
      { matchup && 
        <>
          <Flex flexDir="column" gap={1}>
            <Pokemon pokemon={matchup.defender} variant='defending'/>
            <Pokemon pokemon={matchup.attacker} variant='attacking'/>
          </Flex>
          <Flex flexDir="column" gap={2}>
            <Flex gap={1} alignItems="center">
              <Text fontWeight="bold" fontSize="3xl">
                {matchup.attacker.name}                
              </Text>
              <Text> used </Text>
              <Tag borderRadius="md" variant="solid" colorScheme={matchup.move.type.name}>
                {getMoveName(matchup.move, "en")}
              </Tag>
            </Flex>
            <Grid
              gridTemplateColumns="repeat(2, 1fr)"
              gap={1}
            >
              <Button colorScheme="red" onClick={() => guess(TypeEffectiveness.NoEffect)}>{"No Effect"}</Button>
              <Button colorScheme="orange" onClick={() => guess(TypeEffectiveness.NotVeryEffective)}>{"Not Very Effective"}</Button>
              <Button colorScheme="gray" onClick={() => guess(TypeEffectiveness.Effective)}>{"Effective"}</Button>
              <Button colorScheme="green" onClick={() => guess(TypeEffectiveness.VeryEffective)}>{"Super Effective"}</Button>
            </Grid>
          </Flex>
        </>
      }
      </Suspense>
    </Box>
  );
}