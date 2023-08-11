import { Flex, Tag, TagLeftIcon, TagLabel, Text } from "@chakra-ui/react";

import { Move, Pokemon } from "../../types";
import { TypeIcon } from "../icons/TypeIcon";
import { getMoveName } from "../pokemon/util";

type AttackProps = {
  attacker: Pokemon,
  move: Move
}

export function Attack({attacker, move}: AttackProps) {
  return (
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
      {attacker.name}
    </Text>
    <Text fontSize="2xl"> used </Text>
    <Tag size="lg" borderRadius="md" colorScheme={move.type.name}>
      <TagLeftIcon as={TypeIcon} type={move.type.name} />
      <TagLabel>{getMoveName(move, "en")}</TagLabel>
    </Tag>
  </Flex>
  )
}