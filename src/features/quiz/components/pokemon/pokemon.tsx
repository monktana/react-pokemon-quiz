import { Box, Flex, Image, ResponsiveValue, Tag, TagLabel, TagLeftIcon, Text, useMultiStyleConfig } from "@chakra-ui/react";

import { Pokemon } from "../../types";
import { TypeIcon } from "../icons";

type PokemonProps = {
  pokemon: Pokemon,
  variant: ResponsiveValue<"attack" | "defend">,
}

export function Pokemon({pokemon, variant}: PokemonProps) {
  const styles = useMultiStyleConfig('Pokemon', { variant })
  const sprite = variant === "attack" ? pokemon.sprites.back_default : pokemon.sprites.front_default;

  return (
    <Box __css={styles.container} >
      <Image __css={styles.image} src={sprite} alt={pokemon.name}/>
      <Box __css={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="2xl">{pokemon.name.toUpperCase()}</Text>
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
      </Box> 
    </Box>
  )
}