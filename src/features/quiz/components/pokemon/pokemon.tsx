import { useMemo } from "react";

import { Pokemon, PokemonTypes } from "../../types";

type PokemonProps = {
  pokemon: Pokemon,
  variant: 'attacking' | 'defending'
}

type PokemonTypeStyles = {[key in PokemonTypes]: string};
const TypeStyles: PokemonTypeStyles = {
  normal: 'bg-normal-500',
  fire: 'bg-fire-500',
  water: 'bg-water-400',
  electric: 'bg-electric-500',
  grass: 'bg-grass-500',
  ice: 'bg-ice-500',
  fighting: 'bg-fighting-500',
  poison: 'bg-poison-500',
  ground: 'bg-ground-500',
  flying: 'bg-flying-500',
  psychic: 'bg-psychic-500',
  bug: 'bg-bug-500',
  rock: 'bg-rock-500',
  ghost: 'bg-ghost-500',
  dragon: 'bg-dragon-500',
  dark: 'bg-dark-500',
  steel: 'bg-steel-500',
  fairy: 'bg-fairy-500'
};

export function Pokemon({pokemon, variant}: PokemonProps) {
  const sprite = useMemo(() => {
    if (variant === 'attacking') {
      return pokemon.sprites.back_default;
    }
    return pokemon.sprites.front_default;
  }, [pokemon.sprites.back_default, pokemon.sprites.front_default, variant]);


  return (
    <div className={`flex ${(variant === 'attacking') ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`${(variant === 'attacking') ? 'mb-auto' : 'mt-auto'} w-1/2 relative`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-slate-300 rounded-[50%]" />
        <img src={`${sprite}`} alt={`${variant} pokémon's sprite`} className="pixelated mx-auto scale-150"/>
      </div>
      <div className={`container w-1/2 ${(variant === 'defending') ? 'mt-4' : 'mt-0'}`}>
        <div className='flex flex-col gap-1 p-2 mx-auto h-fit w-4/5 text-base bg-slate-100 border-4 border-gray-800 rounded-md rounded-tl-2xl rounded-br-2xl'>
          <span className="uppercase">
            {`${pokemon.name}`}
          </span>
          <div className="flex gap-1 self-end">
            {
              pokemon.types.map(type => (
                <div key={type.type.url} className={`w-[10ch] text-xs text-center capitalize ${TypeStyles[type.type.name as PokemonTypes]} border border-gray-800 rounded-md`}>{type.type.name}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}