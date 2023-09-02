import {
  Box,
  Flex,
  Image,
  ResponsiveValue,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';

import { useLanguageStore } from '@/stores';

import { Pokemon } from '../../types';
import { TypeIcon } from '../icons';

import { getRessourceName } from './util';

type PokemonProps = {
  pokemon: Pokemon;
  variant: ResponsiveValue<'attack' | 'defend'>;
};

export function Pokemon({ pokemon, variant }: PokemonProps) {
  const styles = useMultiStyleConfig('Pokemon', { variant });
  const language = useLanguageStore((state) => state.language);
  const sprite =
    variant === 'attack' ? pokemon.sprites.back_default : pokemon.sprites.front_default;

  return (
    <Box __css={styles.container}>
      <Image __css={styles.image} src={sprite} alt={pokemon.name} />
      <Box __css={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="2xl">
          {getRessourceName(pokemon.species.names, language)}
        </Text>
        <Flex gap={1}>
          {pokemon.types.map((type) => (
            <Tag key={type.id} colorScheme={type.name} borderRadius="md">
              <TagLeftIcon as={TypeIcon} type={type.name} />
              <TagLabel>{getRessourceName(type.names, language)}</TagLabel>
            </Tag>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
