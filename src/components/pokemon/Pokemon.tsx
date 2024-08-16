import React, { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import type { Pokemon } from '@/api/schema';

import { PokemonContextProvider } from '@/components/pokemon/pokemon-context';

export type PokemonProps = FlexProps & {
  pokemon: Pokemon;
  children?: ReactNode | undefined
};

export function Pokemon({ pokemon, children, ...flexProps }: PokemonProps) {
  return (
    <PokemonContextProvider value={pokemon}>
      <Flex
        alignItems="center"
        width="full"
        padding={2}
        borderRadius="md"
        borderWidth="1px"
        borderColor="border.500"
        backgroundColor="background.200"
        _dark={{
          borderColor: "border.100",
          backgroundColor: "background.800"
        }}
        {...flexProps}
      >
        {children}
      </Flex>
    </PokemonContextProvider>
  );
}
