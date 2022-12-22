import { Pokemon } from "../../types"

type PokemonProps = {
  pokemon: Pokemon
}

export function Pokemon({pokemon}: PokemonProps) {
  return (
    <div>
      <img src={`${pokemon.sprites.front_default}`} alt="pokémon default sprite" />
      <span>
        {pokemon.name}
      </span>
      <div>
        {pokemon.types.map(type => (<div key={type.type.url}>{type.type.name}</div>))}
      </div>
    </div>
  )
}