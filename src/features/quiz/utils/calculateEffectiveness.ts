import { Pokemon, PokemonType } from "../types";

import { typeMatchups } from "./typematrix";

export enum TypeEffectiveness {
  NoEffect,
  NotVeryEffective,
  Effective,
  VeryEffective
}

export const getAttackEffectiveness = (attacking: Pokemon, defending: Pokemon): TypeEffectiveness => {
  const multiplier = getAttackMultiplier(attacking, defending);
  switch (multiplier) {
    case 0:
      return TypeEffectiveness.NoEffect;
    case 0.25:
    case 0.5:
      return TypeEffectiveness.NotVeryEffective;
    case 1:
      return TypeEffectiveness.Effective;
    case 2:
    case 4:
      return TypeEffectiveness.VeryEffective;
    default:
      throw new Error("invalid type multiplier");
  }
};

const getAttackMultiplier = (attacking: Pokemon, defending: Pokemon): number => {
  return attacking.types.reduce((multiplier, attackingType) => {
    return multiplier * defending.types.reduce((prev, defendingType) => 
      prev * getTypeMatchupMultiplier(attackingType, defendingType)
    , 1);
  }, 1);
};

const getTypeMatchupMultiplier = (attackingType: PokemonType, defendingType: PokemonType): number => {
  return typeMatchups[attackingType.type.name][defendingType.type.name];
}