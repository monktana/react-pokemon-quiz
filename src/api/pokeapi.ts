import { Pokemon, PokemonMove } from "../types"

const API_VERSION = "v2";

export class PokeAPI {
  getPokemon = async (id: string | number): Promise<Pokemon> => {
    return fetch(`https://pokeapi.co/api/${API_VERSION}/pokemon/${id}/`)
          .then(response => response.json())
  };

  getMove = async (id: string | number): Promise<PokemonMove> => {
    return fetch(`https://pokeapi.co/api/${API_VERSION}/move/${id}/`)
          .then(response => response.json())
  };
}
