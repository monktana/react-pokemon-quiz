import type { Name } from './common';

/**
 * ## Type
 * Types are properties for Pokémon and their moves.
 * Each type has three properties: which types of Pokémon it is super effective against,
 * which types of Pokémon it is not very effective against, and which types of Pokémon it is completely ineffective against
 */
export interface Type {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
}
