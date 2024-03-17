import { Name } from './common';
import { Type } from './type';

/**
 * ## Pokemon
 * Pokémon are the creatures that inhabit the world of the Pokémon games.
 * They can be caught using Pokéballs and trained by battling with other Pokémon.
 * Each Pokémon belongs to a specific species but may take on a variant
 * which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings.
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
 */
export interface Pokemon {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /**
   * A set of sprites used to depict this Pokémon in the game.
   * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
   */
  sprites: PokemonSprites;
  /** A list of details showing types this Pokémon has */
  types: Type[];
}

export interface PokemonSprites {
  front_default: string | undefined;
  front_shiny: string | undefined;
  front_female: string | undefined;
  front_shiny_female: string | undefined;
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_female: string | undefined;
  back_shiny_female: string | undefined;
}
