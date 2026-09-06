import { TypeEffectiveness } from '@/api/schema';

/**
 * Tracks the last shown move type and effectiveness bucket across rounds of
 * a single game, so generateMatchup can down-weight picking the same one
 * again. Module-scoped like random.ts: one game = one Battle mount, and
 * Battle resets this on mount, so it never leaks between games.
 */
type MatchupHistoryState = {
  lastTypeId: number | null;
  typeStreak: number;
  lastEffectiveness: TypeEffectiveness | null;
  effectivenessStreak: number;
};

let state: MatchupHistoryState = {
  lastTypeId: null,
  typeStreak: 0,
  lastEffectiveness: null,
  effectivenessStreak: 0,
};

export const resetMatchupHistory = (): void => {
  state = { lastTypeId: null, typeStreak: 0, lastEffectiveness: null, effectivenessStreak: 0 };
};

// Multiplicative per-repeat penalty: a first repeat lands at 40% of its
// unpenalized weight, a second consecutive one at 16%, and so on - never
// zero, just increasingly unlikely the longer a streak runs.
const REPEAT_PENALTY_FACTOR = 0.4;

/**
 * Weight multiplier for picking `typeId`/`effectiveness` again this round,
 * given what the last round actually showed. 1 means no penalty applies.
 */
export const repeatPenaltyFor = (typeId: number, effectiveness: TypeEffectiveness): number => {
  let penalty = 1;
  if (typeId === state.lastTypeId) {
    penalty *= REPEAT_PENALTY_FACTOR ** state.typeStreak;
  }
  if (effectiveness === state.lastEffectiveness) {
    penalty *= REPEAT_PENALTY_FACTOR ** state.effectivenessStreak;
  }
  return penalty;
};

/** Records the round that was actually picked, updating streaks for next time. */
export const recordMatchupHistory = (typeId: number, effectiveness: TypeEffectiveness): void => {
  state = {
    lastTypeId: typeId,
    typeStreak: typeId === state.lastTypeId ? state.typeStreak + 1 : 1,
    lastEffectiveness: effectiveness,
    effectivenessStreak:
      effectiveness === state.lastEffectiveness ? state.effectivenessStreak + 1 : 1,
  };
};
