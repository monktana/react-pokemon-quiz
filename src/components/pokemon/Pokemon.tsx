import React, { ReactNode } from 'react';

import type { Pokemon } from '@/api/schema';

import { PokemonContextProvider } from '@/components/pokemon/pokemon-context';

export type PokemonProps = {
  pokemon: Pokemon;
  children?: ReactNode | undefined
};

export function Pokemon({ pokemon, children }: PokemonProps) {
  return (
    <PokemonContextProvider value={pokemon}>
      <div className={`flex flex-col items-center w-full p-2 rounded-md border border-border-500 bg-background-200 dark:border-border-100 dark:bg-background-800`}>
        {children}
      </div>
    </PokemonContextProvider>
  );
}
