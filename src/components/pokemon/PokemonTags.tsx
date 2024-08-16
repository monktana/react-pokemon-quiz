import React from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { types, TypeTag, usePokemonContext } from '@/components';

type PokemonTagsProps = FlexProps;

export const PokemonTags = ({...props}: PokemonTagsProps) => {
  const pokemon = usePokemonContext();

  return (
    <Flex gap={1} {...props}>
      {pokemon.types?.map((type) => (
        <TypeTag
          key={type.id}
          type={type.name! as types}
          text={type.names!}
          borderRadius="md"
        />
      ))}
    </Flex>
  )
}