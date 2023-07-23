import { Flex, Image, Tag, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import { Pokemon } from "../../types";

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
    <Flex flexDir={(variant === 'attacking') ? 'row' : 'row-reverse'}>
      <Image boxSize="150px" src={sprite ?? ""} alt={pokemon.name}/>
      <Flex gap={1}>
        <Text>{pokemon.name.toUpperCase()}</Text>
        <Flex gap={1}>
          {
            pokemon.types.map(type => (
              <Tag key={type.type.url} colorScheme={type.type.name} borderRadius="md">{type.type.name}</Tag>
            ))
          }
        </Flex>
      </Flex>
    </Flex>
  )
}