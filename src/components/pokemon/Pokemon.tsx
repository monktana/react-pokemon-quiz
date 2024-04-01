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
import { Suspense } from 'react';

import type { Pokemon } from '@/api/schema';
import { Loading } from '@/components';
import { useLanguageStore } from '@/stores';

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
    variant === 'attack' ? pokemon.sprites?.back_default : pokemon.sprites?.front_default;

  return (
    <Box __css={styles.container} data-cy={`${variant}-pokemon`}>
      <Suspense fallback={<Loading />}>
        <Image __css={styles.image} src={sprite!} alt={pokemon.name!} data-cy={`${variant}-sprite`} />
        <Box __css={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="2xl" data-cy={`${variant}-name`}>
            {getRessourceName(pokemon.species!.names!, language)}
          </Text>
          <Flex gap={1}>
            {pokemon.types?.map((type) => (
              <Tag
                key={type.id}
                colorScheme={type.name!}
                borderRadius="md"
                data-cy={`${variant}-type-tag`}
              >
                <TagLeftIcon as={TypeIcon} type={type.name!} />
                <TagLabel>{getRessourceName(type.names!, language)}</TagLabel>
              </Tag>
            ))}
          </Flex>
        </Box>
      </Suspense>
    </Box>
  );
}
