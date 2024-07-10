import { Box, Flex, Image, ResponsiveValue, Text, useMultiStyleConfig } from '@chakra-ui/react';

import type { Pokemon } from '@/api/schema';
import { types } from '@/components';
import { useLanguage } from '@/stores';

import { TypeTag } from './TypeTag';
import { getResourceName } from './util';

export type PokemonProps = {
  pokemon: Pokemon;
  variant: ResponsiveValue<'attacker' | 'defender'>;
};

export function Pokemon({ pokemon, variant }: PokemonProps) {
  const styles = useMultiStyleConfig('Pokemon', { variant });
  const language = useLanguage();
  const sprite =
    variant === 'attacker' ? pokemon.sprites?.back_default : pokemon.sprites?.front_default;

  return (
    <Box __css={styles.container} data-testid={`${variant}-pokemon`}>
      <Image
        __css={styles.image}
        src={sprite!}
        alt={pokemon.name!}
        data-testid={`${variant}-sprite`}
      />
      <Box __css={styles.infoContainer}>
        <Text data-testid={`${variant}-name`} fontWeight="bold" fontSize="2xl">
          {getResourceName(pokemon.species!.names!, language)}
        </Text>
        <Flex gap={1}>
          {pokemon.types?.map((type) => (
            <TypeTag
              key={type.id}
              type={type.name! as types}
              text={type.names!}
              borderRadius="md"
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
