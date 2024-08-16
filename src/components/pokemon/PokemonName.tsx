import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { getResourceName, usePokemonContext } from '@/components';
import { useLanguage } from '@/stores';

type PokemonNameProps = TextProps

export const PokemonName = ({...props}: PokemonNameProps) => {
  const language = useLanguage();
  const pokemon = usePokemonContext();

  return (
    <Text {...props} fontWeight="bold" fontSize="2xl">
      {getResourceName(pokemon.species!.names!, language)}
    </Text>
  )
}