import { Flex, Image, Tag, TagLabel, TagLeftIcon, Text, VStack } from "@chakra-ui/react";

import { Pokemon } from "../../types";
import { TypeIcon } from "../icons/TypeIcon";

type PokemonProps = {
  pokemon: Pokemon
}

export function Pokemon({pokemon}: PokemonProps) {
  return (
    <VStack
      spacing={1}
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      rounded="md"
      backgroundColor="#393939"
    >
      <Image boxSize="200px" src={pokemon.sprites.front_default} alt={pokemon.name}/>
      <Flex
        gap={1}
        flexDirection="column"
        width="full"
      >
        <Text color="white" fontWeight="bold" fontSize="2xl">{pokemon.name.toUpperCase()}</Text>
        <Flex gap={1}>
          {
            pokemon.types.map(type => (
              <Tag key={type.type.url} colorScheme={type.type.name} borderRadius="md">
                <TagLeftIcon as={TypeIcon} type={type.type.name} />
                <TagLabel>{type.type.name}</TagLabel>
              </Tag>
            ))
          }
        </Flex>
      </Flex> 
    </VStack>
  )
}