import { Move, Pokemon } from '../types';

import { typeMatchups } from './typematrix';

export enum TypeEffectiveness {
  NoEffect,
  NotVeryEffective,
  Effective,
  SuperEffective,
}

export const getAttackEffectiveness = (move: Move, pokemon: Pokemon): TypeEffectiveness => {
  const multiplier = getAttackMultiplier(move, pokemon);
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
      return TypeEffectiveness.SuperEffective;
    default:
      throw new Error('invalid type multiplier');
  }
};

const getAttackMultiplier = (move: Move, defending: Pokemon): number => {
  return defending.types.reduce(
    (prev, defendingType) => prev * getTypeMatchupMultiplier(move.type.name, defendingType.name),
    1
  );
};

const getTypeMatchupMultiplier = (attackingType: string, defendingType: string): number => {
  return typeMatchups[attackingType][defendingType];
};
