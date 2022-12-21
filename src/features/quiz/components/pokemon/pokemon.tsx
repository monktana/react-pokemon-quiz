import { Pokemon } from "../../types"

type PokemonProps = {
  pokemon: Pokemon
}

export function Pokemon({pokemon}: PokemonProps) {
  return (
    <>{pokemon.name}</>
  )
}