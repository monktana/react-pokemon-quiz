export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface APIResource {
  url: string;
}

export interface VersionEncounterDetail {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface VersionGroupFlavorText {
  text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export interface Encounter {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
}

export interface MachineVersionDetail {
  machine: APIResource;
  version_group: NamedAPIResource;
}

export interface Effect {
  effect: string;
  language: NamedAPIResource;
}

export interface VerboseEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface GenerationGameIndex {
  game_index: number;
  generation: NamedAPIResource;
}
