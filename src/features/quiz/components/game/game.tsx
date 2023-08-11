import { Box, Button, Flex, Grid, Tag, TagLabel, TagLeftIcon, Text, VStack } from "@chakra-ui/react";
import { Suspense, useCallback } from "react";

import { useScoreStore, useAppStateStore } from "@/stores";

import { useMatchup } from "../../api";
import { TypeEffectiveness, getAttackEffectiveness } from "../../utils";
import { TypeIcon } from "../icons/TypeIcon";
import { Pokemon } from "../pokemon";
import { getMoveName } from "../pokemon/util";
import { Score } from "../score";

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
      <Score />
      <Suspense fallback={<>Loading...</>}>
      { matchup && 
        <VStack>
          <Flex gap={2}>
            <Pokemon pokemon={matchup.attacker} />
            <Pokemon pokemon={matchup.defender} />
          </Flex>
          <Flex
            gap={1}
            alignItems="center"
            padding={2}
            width="full"
            rounded="md"
            color="white"
            backgroundColor="#393939"
          >
            <Text fontSize="3xl">
              {matchup.attacker.name}
            </Text>
            <Text fontSize="2xl"> used </Text>
            <Tag borderRadius="md" variant="solid" colorScheme={matchup.move.type.name}>
              <TagLeftIcon as={TypeIcon} name={matchup.move.type.name} />
              <TagLabel>{getMoveName(matchup.move, "en")}</TagLabel>
            </Tag>
          </Flex>
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gap={2}
            width="full"
            rounded="md"
          >
            <Button backgroundColor="#393939" color="red" onClick={() => guess(TypeEffectiveness.NoEffect)}>{"No Effect"}</Button>
            <Button backgroundColor="#393939" color="yellow" onClick={() => guess(TypeEffectiveness.NotVeryEffective)}>{"Not Very Effective"}</Button>
            <Button backgroundColor="#393939" color="green" onClick={() => guess(TypeEffectiveness.Effective)}>{"Effective"}</Button>
            <Button backgroundColor="#393939" color="cyan" onClick={() => guess(TypeEffectiveness.VeryEffective)}>{"Super Effective"}</Button>
          </Grid>
        </VStack>
      }
      </Suspense>
    </Box>
  );
}