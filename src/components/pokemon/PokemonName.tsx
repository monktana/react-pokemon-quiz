import React from 'react';
import { getResourceName, usePokemonContext } from '@/components';
import { useLanguage } from '@/stores';
import { cn } from '@/lib/shadcn/utils';

type PokemonNameProps = React.HTMLAttributes<HTMLParagraphElement>;

export const PokemonName = ({className, ...props}: PokemonNameProps) => {
  const language = useLanguage();
  const pokemon = usePokemonContext();

  return (
    <p className={cn('text-2xl font-bold', className)} {...props}>
      {getResourceName(pokemon.species!.names!, language)}
    </p>
  );
}