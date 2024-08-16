import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import { usePokemonContext } from '@/components';

type PokemonSpriteProps = ImageProps;

export const PokemonSprite = ({...props}: PokemonSpriteProps) => {
  const pokemon = usePokemonContext();

  return (
    <Image
      boxSize="200px"
      alt={pokemon.name!}
      {...props}
    />
  )
}