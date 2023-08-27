import { Flex, Tag, TagLeftIcon, TagLabel, Text } from "@chakra-ui/react";

import { useLanguageStore } from "@/stores";

import { Move, Pokemon } from "../../types";
import { TypeIcon } from "../icons";
import { getMoveName } from "../pokemon/util";

type AttackProps = {
  attacker: Pokemon,
  move: Move
}

export function Question({attacker, move}: AttackProps) {
  const language = useLanguageStore((state) => state.language);

  return (
    <Flex
      gap={1}
      alignItems="center"
      padding={2}
      width="full"
      rounded="md"
      color="font.100"
      border="1px solid"
      borderColor="border"
      backgroundColor="background.500"
    >
      <Text fontSize="3xl">
        {attacker.name}
      </Text>
      <Text fontSize="2xl"> used </Text>
      <Tag borderRadius="md" colorScheme={move.type.name}>
        <TagLeftIcon as={TypeIcon} type={move.type.name} />
        <TagLabel>{getMoveName(move, language)}</TagLabel>
      </Tag>
    </Flex>
  )
}