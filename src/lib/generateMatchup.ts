import { Matchup, Type, TypeEffectiveness } from '@/api/schema';
import { bucketizeEffectiveness, calculateEffectivenessMultiplier } from '@/lib/calculateEffectiveness';
import { recordMatchupHistory, repeatPenaltyFor } from '@/lib/matchupHistory';
import {
  getPokemonDataset,
  hydrateMove,
  hydratePokemon,
  hydrateType,
  PokemonDataset,
} from '@/lib/pokemonData';
import { randomItem, weightedRandomItem } from '@/lib/random';

const pickDefenderRecord = (dataset: PokemonDataset, attackerId: number) => {
  const candidates = dataset.pokemon.filter((pokemon) => pokemon.id !== attackerId);
  return randomItem(candidates.length > 0 ? candidates : dataset.pokemon);
};

const groupMoveIdsByType = (dataset: PokemonDataset, moveIds: number[]): Map<number, number[]> => {
  const byType = new Map<number, number[]>();
  for (const moveId of moveIds) {
    const typeId = dataset.movesById.get(moveId)!.typeId;
    const movesOfType = byType.get(typeId);
    if (movesOfType) {
      movesOfType.push(moveId);
    } else {
      byType.set(typeId, [moveId]);
    }
  }
  return byType;
};

type TypeCandidate = { typeId: number; multiplier: number; effectiveness: TypeEffectiveness };

/**
 * Picks which attack type this round uses. Every type in the attacker's move
 * pool gets an equal base chance (instead of whichever type has the most
 * moves - Normal chief among them - dominating), further down-weighted if it
 * would repeat the last round's type or resulting effectiveness bucket. See
 * matchupHistory.ts for the repeat-penalty mechanics.
 */
const pickAttackType = (
  dataset: PokemonDataset,
  movesByType: Map<number, number[]>,
  defenderTypes: Type[]
): TypeCandidate => {
  const candidates: TypeCandidate[] = [...movesByType.keys()].map((typeId) => {
    const multiplier = calculateEffectivenessMultiplier(hydrateType(dataset, typeId), defenderTypes);
    return { typeId, multiplier, effectiveness: bucketizeEffectiveness(multiplier) };
  });

  return weightedRandomItem(
    candidates.map((candidate) => ({
      item: candidate,
      weight: repeatPenaltyFor(candidate.typeId, candidate.effectiveness),
    }))
  );
};

export const generateMatchup = async (attackerId: number): Promise<Matchup> => {
  const dataset = await getPokemonDataset();

  const attackerRecord = dataset.pokemonById.get(attackerId)!;
  const defenderRecord = pickDefenderRecord(dataset, attackerId);

  const attacker = hydratePokemon(dataset, attackerRecord);
  const defender = hydratePokemon(dataset, defenderRecord);

  const movesByType = groupMoveIdsByType(dataset, attackerRecord.moveIds);
  const chosenType = pickAttackType(dataset, movesByType, defender.types!);
  const move = hydrateMove(dataset, randomItem(movesByType.get(chosenType.typeId)!));

  recordMatchupHistory(chosenType.typeId, chosenType.effectiveness);

  return {
    attacker,
    defender,
    move,
    multiplier: chosenType.multiplier,
    effectiveness: chosenType.effectiveness,
    stabEligible: attacker.types!.some((type) => type.id === move.type!.id),
  };
};
