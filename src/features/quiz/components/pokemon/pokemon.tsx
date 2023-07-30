import { Flex, Image, Progress, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import { Pokemon } from "../../types";
import { TypeIcon } from "../icons/TypeIcon";

type PokemonProps = {
  pokemon: Pokemon,
  variant: 'attacking' | 'defending'
}

export function Pokemon({pokemon, variant}: PokemonProps) {
  const sprite = useMemo(() => {
    if (variant === 'attacking') {
      return pokemon.sprites.back_default;
    }
    return pokemon.sprites.front_default;
  }, [pokemon.sprites.back_default, pokemon.sprites.front_default, variant]);


  return (
    <Flex
      flexDir={(variant === 'attacking') ? 'row' : 'row-reverse'}
      justifyContent="space-between"
      alignItems="center"
      flexGrow={1}
      gap={1}
    >
      <Image boxSize="150px" src={sprite} alt={pokemon.name}/>
      <Flex
        gap={1}
        flexDirection="column"
        width="full"
        padding={1}
        backgroundColor="white"
        border="1px solid"
        borderColor="black"
        rounded="md"
      >
        <Text fontWeight="bold">{pokemon.name.toUpperCase()}</Text>
        <Progress value={80} size="sm" colorScheme="green" />
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
    </Flex>
  )
}