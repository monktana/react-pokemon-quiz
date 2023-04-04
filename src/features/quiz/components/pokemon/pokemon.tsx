import { useMemo } from "react";

import { Pokemon } from "../../types";

type PokemonProps = {
  pokemon: Pokemon,
  variant: 'attacking' | 'defending'
}

export function Pokemon({pokemon, variant}: PokemonProps) {
  const sprite = useMemo(() => {
    if (variant === 'attacking') {
      return pokemon.sprites.back_default;
    }
    return pokemon.sprites.front_default;
  }, [pokemon.sprites.back_default, pokemon.sprites.front_default, variant]);


  return (
    <div className='flex flex-row h-1/2'>
      <img src={`${sprite}`} alt={`${variant} pokémon's sprite`} className="pixelated"/>
      {/* <div className='container max-h-min flex-col bg-slate-400 border border-black rounded'>
        <span className="self-start uppercase">
          {`${pokemon.name}`}
        </span>
        <div className="flex gap-1">
          {
            pokemon.types.map(type => (
              <div key={type.type.url} style={{backgroundColor: type.type.name}} className={`w-[10ch] text-xs text-center capitalize border border-solid border-black rounded`}>{type.type.name}</div>
            ))
          }
        </div>
      </div> */}
    </div>
  )
}