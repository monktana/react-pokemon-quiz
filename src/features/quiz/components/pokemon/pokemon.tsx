import { Flex, Image, Tag, TagLabel, TagLeftIcon, Text, VStack } from "@chakra-ui/react";

import { Pokemon } from "../../types";
import { TypeIcon } from "../icons/TypeIcon";

type PokemonProps = {
  pokemon: Pokemon,
  variant: "attack" | "defend"
}

export function Pokemon({pokemon, variant}: PokemonProps) {

  const sprite = variant === "attack" ? pokemon.sprites.back_default : pokemon.sprites.front_default;

  return (
    <Flex
      gap={1}
      flexDirection={variant === "attack" ? "row" : "row-reverse"}
      alignItems="center"
      padding={2}
      width="full"
      rounded="md"
      backgroundColor="#393939"
    >
      <Image boxSize="200px" src={sprite} alt={pokemon.name}/>
      <VStack
        spacing={1}
        width="full"
        align="flex-start"
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
      </VStack> 
    </Flex>
  )
}