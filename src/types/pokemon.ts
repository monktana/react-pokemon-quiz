import {
  APIResource,
  Description,
  FlavorText,
  Name,
  NamedAPIResource,
  VersionEncounterDetail,
  VersionGameIndex
} from './common'

export interface Pokemon {

  id: number

  name: string

  base_experience: number

  height: number

  is_default: boolean

  order: number

  weight: number

  abilities: PokemonAbility[]

  forms: NamedAPIResource[]

  game_indices: VersionGameIndex[]

  held_items: PokemonHeldItem[]

  location_area_encounters: string

  moves: PokemonMove[]

  sprites: PokemonSprites

  species: NamedAPIResource

  stats: PokemonStat[]

  types: PokemonType[]

  past_types: PokemonPastType[]
}

export interface PokemonAbility {

  is_hidden: boolean

  slot: number

  ability: NamedAPIResource
}

export interface PokemonType {

  slot: number

  type: NamedAPIResource
}

export interface PokemonPastType {

  generation: NamedAPIResource

  types: PokemonType[]
}

export interface PokemonHeldItem {

  item: NamedAPIResource

  version_details: PokemonHeldItemVersion[]
}

export interface PokemonHeldItemVersion {

  version: NamedAPIResource

  rarity: number
}

export interface PokemonMove {

  move: NamedAPIResource

  version_group_details: PokemonMoveVersion[]
}

export interface PokemonMoveVersion {

  move_learn_method: NamedAPIResource

  version_group: NamedAPIResource

  level_learned_at: number
}

export interface PokemonStat {

  stat: NamedAPIResource

  effort: number

  base_stat: number
}

export interface VersionSprites {

  'generation-i': GenerationISprites

  'generation-ii': GenerationIISprites

  'generation-iii': GenerationIIISprites

  'generation-iv': GenerationIVSprites

  'generation-v': GenerationVSprites

  'generation-vi': GenerationVISprites

  'generation-vii': GenerationVIISprites

  'generation-viii': GenerationVIIISprites
}

export interface PokemonSprites {

  front_default: string | null

  front_shiny: string | null

  front_female: string | null

  front_shiny_female: string | null

  back_default: string | null

  back_shiny: string | null

  back_female: string | null

  back_shiny_female: string | null

  other?: OtherPokemonSprites

  versions: VersionSprites
}

export interface OtherPokemonSprites {

  dream_world: DreamWorld

  'official-artwork': OfficialArtwork

  home: Home
}

export interface DreamWorld {

  front_default: string | null

  front_female: string | null
}

interface OfficialArtwork {

  front_default: string | null
}

export interface Home {

  front_default: string | null

  front_female: string | null

  front_shiny: string | null

  front_shiny_female: string | null
}

export interface GenerationISprites {

  'red-blue': RedBlue

  yellow: Yellow
}

export interface RedBlue {

  back_default: string | null

  back_gray: string | null

  back_transparent: string | null

  front_default: string | null

  front_gray: string | null

  front_transparent: string | null
}

export interface Yellow {

  back_default: string | null

  back_gray: string | null

  back_transparent: string | null

  front_default: string | null

  front_gray: string | null

  front_transparent: string | null
}

export interface GenerationIISprites {

  crystal: Crystal

  gold: Gold

  silver: Silver
}

export interface Crystal {

  back_default: string | null

  back_shiny: string | null

  back_shiny_transparent: string | null

  back_transparent: string | null

  front_default: string | null

  front_shiny: string | null

  front_shiny_transparent: string | null

  front_transparent: string | null
}

export interface Gold {

  back_default: string | null

  back_shiny: string | null

  front_default: string | null

  front_shiny: string | null

  front_transparent: string | null
}

interface Silver {

  back_default: string | null

  back_shiny: string | null

  front_default: string | null

  front_shiny: string | null

  front_transparent: string | null
}

export interface GenerationIIISprites {

  emerald: Emerald

  'firered-leafgreen': FireredLeafgreen

  'ruby-sapphire': RubySapphire
}

export interface Emerald {

  front_default: string | null

  front_shiny: string | null
}

export interface FireredLeafgreen {

  back_default: string | null

  back_shiny: string | null

  front_default: string | null

  front_shiny: string | null
}

export interface RubySapphire {

  back_default: string | null

  back_shiny: string | null

  front_default: string | null

  front_shiny: string | null
}

export interface GenerationIVSprites {

  'diamond-pearl': DiamondPearl

  'heartgold-soulsilver': HeartgoldSoulsilver

  platinum: Platinum
}

export interface DiamondPearl {

  back_default: string | null

  back_shiny: string | null

  back_female: string | null

  front_default: string | null

  front_shiny: string | null

  back_shiny_female: string | null

  front_female: string | null

  front_shiny_female: string | null
}

export interface HeartgoldSoulsilver {

  back_default: string | null

  back_shiny: string | null

  back_female: string | null

  front_default: string | null

  front_shiny: string | null

  back_shiny_female: string | null

  front_female: string | null

  front_shiny_female: string | null
}

export interface Platinum {

  back_default: string | null

  back_shiny: string | null

  back_female: string | null

  front_default: string | null

  front_shiny: string | null

  back_shiny_female: string | null

  front_female: string | null

  front_shiny_female: string | null
}

export interface GenerationVSprites {

  'black-white': BlackWhite
}

export interface BlackWhite {

  animated: Animated

  back_default: string | null

  back_shiny: string | null

  back_female: string | null

  front_default: string | null

  front_shiny: string | null

  back_shiny_female: string | null

  front_female: string | null

  front_shiny_female: string | null
}

export interface Animated {

  back_default: string | null

  back_shiny: string | null

  back_female: string | null

  front_default: string | null

  front_shiny: string | null

  back_shiny_female: string | null

  front_female: string | null

  front_shiny_female: string | null
}

export interface GenerationVISprites {

  'omegaruby-alphasapphire': OmegarubyAlphasapphire

  'x-y': XY
}

export interface OmegarubyAlphasapphire {

  front_default: string | null

  front_female: string | null

  front_shiny: string | null

  front_shiny_female: string | null
}

export interface XY {

  front_default: string | null

  front_female: string | null

  front_shiny: string | null

  front_shiny_female: string | null
}

export interface GenerationVIISprites {

  icons: GenerationViiIcons

  'ultra-sun-ultra-moon': UltraSunUltraMoon
}

export interface GenerationViiIcons {

  front_default: string | null

  front_female: string | null
}

export interface UltraSunUltraMoon {

  front_default: string | null

  front_female: string | null

  front_shiny: string | null

  front_shiny_female: string | null
}

export interface GenerationVIIISprites {

  icons: GenerationViiiIcons
}

export interface GenerationViiiIcons {

  front_default: string | null

  front_female: string | null
}

export interface LocationAreaEncounter {

  location_area: NamedAPIResource

  version_details: VersionEncounterDetail[]
}

export interface PokemonColor {

  id: number

  name:
  | 'black'
  | 'blue'
  | 'brown'
  | 'gray'
  | 'green'
  | 'pink'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow'

  names: Name[]

  pokemon_species: NamedAPIResource[]
}

export interface PokemonForm {

  id: number

  name: string

  order: number

  form_order: number

  is_default: boolean

  is_battle_only: boolean

  is_mega: boolean

  form_name: string

  pokemon: NamedAPIResource

  sprites: PokemonFormSprites

  version_group: NamedAPIResource

  names: Name[]

  form_names: Name[]

  types: PokemonType[]
}

export interface PokemonFormSprites {

  front_default: string | null

  front_female: string | null

  front_shiny: string | null

  front_shiny_female: string | null

  back_default: string | null

  back_female: string | null

  back_shiny: string | null

  back_shiny_female: string | null
}

export interface PokemonHabitat {

  id: number

  name:
  | 'cave'
  | 'forest'
  | 'grassland'
  | 'mountain'
  | 'rare'
  | 'rough-terrain'
  | 'sea'
  | 'urban'
  | 'waters-edge'

  names: Name[]

  pokemon_species: NamedAPIResource[]
}

export interface PokemonShape {

  id: number

  name: string

  awesome_names: AwesomeName[]

  names: Name[]

  pokemon_species: NamedAPIResource[]
}

export interface AwesomeName {

  awesome_name: string

  language: NamedAPIResource
}

export interface PokemonSpecies {

  id: number

  name: string

  order: number

  gender_rate: number

  capture_rate: number

  base_happiness: number

  is_baby: boolean

  is_legendary: boolean

  is_mythical: boolean

  hatch_counter: number

  has_gender_differences: boolean

  forms_switchable: boolean

  growth_rate: NamedAPIResource

  pokedex_numbers: PokemonSpeciesDexEntry[]

  egg_groups: NamedAPIResource[]

  color: NamedAPIResource

  shape: NamedAPIResource

  evolves_from_species: NamedAPIResource

  evolution_chain: APIResource

  habitat: NamedAPIResource

  generation: NamedAPIResource

  names: Name[]

  pal_park_encounters: PalParkEncounterArea[]

  flavor_text_entries: FlavorText[]

  form_descriptions: Description[]

  genera: Genus[]

  varieties: PokemonSpeciesVariety[]
}

export interface Genus {

  genus: string

  language: NamedAPIResource
}

export interface PokemonSpeciesDexEntry {

  entry_number: number

  pokedex: NamedAPIResource
}

export interface PalParkEncounterArea {

  base_score: number

  rate: number

  area: NamedAPIResource
}

export interface PokemonSpeciesVariety {

  is_default: boolean

  pokemon: NamedAPIResource
}
