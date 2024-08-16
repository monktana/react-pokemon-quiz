 
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface InternationalName {
  name?: string | null;
  language?: string | null;
}

export interface Matchup {
  attacker?: Pokemon;
  defender?: Pokemon;
  move?: Move;
  effectiveness?: TypeEffectiveness;
}

export interface Move {
  /** @format int32 */
  id?: number;
  name?: string | null;
  names?: InternationalName[] | null;
  /** @format int32 */
  power?: number | null;
  type?: Type;
}

export interface Pokemon {
  /** @format int32 */
  id?: number;
  name?: string | null;
  moves?: Move[] | null;
  sprites?: PokemonSprites;
  species?: PokemonSpecies;
  types?: Type[] | null;
}

export interface PokemonSpecies {
  /** @format int32 */
  id?: number;
  name?: string | null;
  names?: InternationalName[] | null;
}

export interface PokemonSprites {
  front_default?: string | null;
  front_shiny?: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
  back_default?: string | null;
  back_shiny?: string | null;
  back_female?: string | null;
  back_shiny_female?: string | null;
}

export interface Type {
  /** @format int32 */
  id?: number;
  name?: string | null;
  names?: InternationalName[] | null;
}

export enum TypeEffectiveness {
  NoEffect = 'NoEffect',
  NotVeryEffective = 'NotVeryEffective',
  Effective = 'Effective',
  SuperEffective = 'SuperEffective',
}
