import {
  Name,
  NamedAPIResource,
} from './common';
import { Type } from './type';

export const POKEMON_COUNT = 809;
export const POKEMON_MOVE_COUNT = 742;

export interface Pokemon {
  id: number;
  name: string;
  names: Name[];
  sprites: PokemonSprites;
  types: Type[];
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export const PokemonTypeVariants = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export type PokemonTypes = (typeof PokemonTypeVariants)[number];

export interface VersionSprites {
  'generation-i': GenerationISprites;
  'generation-ii': GenerationIISprites;
  'generation-iii': GenerationIIISprites;
  'generation-iv': GenerationIVSprites;
  'generation-v': GenerationVSprites;
  'generation-vi': GenerationVISprites;
  'generation-vii': GenerationVIISprites;
  'generation-viii': GenerationVIIISprites;
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
  other?: OtherPokemonSprites;
  versions: VersionSprites;
}

export interface OtherPokemonSprites {
  dream_world: DreamWorld;
  'official-artwork': OfficialArtwork;
  home: Home;
}

export interface DreamWorld {
  front_default: string | undefined;
  front_female: string | undefined;
}

interface OfficialArtwork {
  front_default: string | undefined;
}

export interface Home {
  front_default: string | undefined;
  front_female: string | undefined;
  front_shiny: string | undefined;
  front_shiny_female: string | undefined;
}

export interface GenerationISprites {
  'red-blue': RedBlue;
  yellow: Yellow;
}

export interface RedBlue {
  back_default: string | undefined;
  back_gray: string | undefined;
  back_transparent: string | undefined;
  front_default: string | undefined;
  front_gray: string | undefined;
  front_transparent: string | undefined;
}

export interface Yellow {
  back_default: string | undefined;
  back_gray: string | undefined;
  back_transparent: string | undefined;
  front_default: string | undefined;
  front_gray: string | undefined;
  front_transparent: string | undefined;
}

export interface GenerationIISprites {
  crystal: Crystal;
  gold: Gold;
  silver: Silver;
}

export interface Crystal {
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_shiny_transparent: string | undefined;
  back_transparent: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  front_shiny_transparent: string | undefined;
  front_transparent: string | undefined;
}

export interface Gold {
  back_default: string | undefined;
  back_shiny: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  front_transparent: string | undefined;
}

interface Silver {
  back_default: string | undefined;
  back_shiny: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  front_transparent: string | undefined;
}

export interface GenerationIIISprites {
  emerald: Emerald;
  'firered-leafgreen': FireredLeafgreen;
  'ruby-sapphire': RubySapphire;
}

export interface Emerald {
  front_default: string | undefined;
  front_shiny: string | undefined;
}

export interface FireredLeafgreen {
  back_default: string | undefined;
  back_shiny: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
}

export interface RubySapphire {
  back_default: string | undefined;
  back_shiny: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
}

export interface GenerationIVSprites {
  'diamond-pearl': DiamondPearl;
  'heartgold-soulsilver': HeartgoldSoulsilver;
  platinum: Platinum;
}

export interface DiamondPearl {
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_female: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_female: string | undefined;
  front_shiny_female: string | undefined;
}

export interface HeartgoldSoulsilver {
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_female: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_female: string | undefined;
  front_shiny_female: string | undefined;
}

export interface Platinum {
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_female: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_female: string | undefined;
  front_shiny_female: string | undefined;
}

export interface GenerationVSprites {
  'black-white': BlackWhite;
}

export interface BlackWhite {
  animated: Animated;
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_female: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_female: string | undefined;
  front_shiny_female: string | undefined;
}

export interface Animated {
  back_default: string | undefined;
  back_shiny: string | undefined;
  back_female: string | undefined;
  front_default: string | undefined;
  front_shiny: string | undefined;
  back_shiny_female: string | undefined;
  front_female: string | undefined;
  front_shiny_female: string | undefined;
}

export interface GenerationVISprites {
  'omegaruby-alphasapphire': OmegarubyAlphasapphire;
  'x-y': XY;
}

export interface OmegarubyAlphasapphire {
  front_default: string | undefined;
  front_female: string | undefined;
  front_shiny: string | undefined;
  front_shiny_female: string | undefined;
}

export interface XY {
  front_default: string | undefined;
  front_female: string | undefined;
  front_shiny: string | undefined;
  front_shiny_female: string | undefined;
}

export interface GenerationVIISprites {
  icons: GenerationViiIcons;
  'ultra-sun-ultra-moon': UltraSunUltraMoon;
}

export interface GenerationViiIcons {
  front_default: string | undefined;
  front_female: string | undefined;
}

export interface UltraSunUltraMoon {
  front_default: string | undefined;
  front_female: string | undefined;
  front_shiny: string | undefined;
  front_shiny_female: string | undefined;
}

export interface GenerationVIIISprites {
  icons: GenerationViiiIcons;
}

export interface GenerationViiiIcons {
  front_default: string | undefined;
  front_female: string | undefined;
}
