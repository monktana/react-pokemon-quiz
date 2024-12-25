import React from 'react';
import { usePokemonContext } from '@/components';

type PokemonSpriteProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const PokemonSprite = ({...props}: PokemonSpriteProps) => {
  const pokemon = usePokemonContext();

  return (
    <img
      className="size-200px"
      alt={pokemon.name!}
      {...props}
    />
  )
}