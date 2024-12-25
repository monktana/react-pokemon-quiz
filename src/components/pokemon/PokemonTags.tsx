import React from 'react';
import { getResourceName, usePokemonContext } from '@/components';
import { Tag } from '@/components/tag';
import { useLanguage } from '@/stores';

type PokemonTagsProps = React.HTMLAttributes<HTMLDivElement>;

export const PokemonTags = ({...props}: PokemonTagsProps) => {
  const pokemon = usePokemonContext();
  const language = useLanguage();

  return (
    <div className="flex gap-1" {...props}>
      {pokemon.types?.map((type) => (
        <Tag key={type.id}>
          {/*Todo: insert type icon here*/}
          {getResourceName(type.names!, language)}
        </Tag>
      ))}
    </div>
  )
}