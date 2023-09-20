import type {
  Name,
} from './common';
import { Type } from './type';

/**
 * ## Move
 * Moves are the skills of Pokémon in battle. In battle, a Pokémon uses one move each turn.
 * Some moves (including those learned by Hidden Machine) can be used outside of battle as well,
 * usually for the purpose of removing obstacles or exploring new areas.
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Move) for greater detaill
 */
export interface Move {  
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** The elemental type of this move */
  type: Type;
}
