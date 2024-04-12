import { Box, Flex, Image, ResponsiveValue, Text, useMultiStyleConfig } from '@chakra-ui/react';

import type { Pokemon } from '@/api/schema';
import { TypeTag } from '@/components/pokemon/TypeTag';
import { useLanguageStore } from '@/stores';

import { getRessourceName } from './util';

type PokemonProps = {
  pokemon: Pokemon;
  variant: ResponsiveValue<'attacker' | 'defender'>;
};

export function Pokemon({ pokemon, variant }: PokemonProps) {
  const styles = useMultiStyleConfig('Pokemon', { variant });
  const language = useLanguageStore((state) => state.language);
  const sprite =
    variant === 'attacker' ? pokemon.sprites?.back_default : pokemon.sprites?.front_default;

  return (
    <Box __css={styles.container} data-cy={`${variant}-pokemon`}>
      <Image __css={styles.image} src={sprite!} alt={pokemon.name!} data-cy={`${variant}-sprite`} />
      <Box __css={styles.infoContainer}>
        <Text data-cy={`${variant}-name`} fontWeight="bold" fontSize="2xl">
          {getRessourceName(pokemon.species!.names!, language)}
        </Text>
        <Flex gap={1}>
          {pokemon.types?.map((type) => <TypeTag key={type.id} type={type} borderRadius="md" />)}
        </Flex>
      </Box>
    </Box>
  );
}
