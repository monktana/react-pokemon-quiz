import { useMemo } from "react";

import { Pokemon } from "../../types";

import './pokemon.css';

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
    <div className={`pokemon-container ${variant}`}>
      <div className="image-section">
        <img src={`${sprite}`} alt="pokémon sprite" />
      </div>
      <div className="info-section">
        <span>
          {pokemon.name}
        </span>
        <div className="type-pills">
          { pokemon.types.map(type => (
              <div key={type.type.url} className="type-pill">{type.type.name}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}