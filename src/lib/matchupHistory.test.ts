import { beforeEach, describe, expect, it } from 'vitest';

import { TypeEffectiveness } from '@/api/schema';
import { recordMatchupHistory, repeatPenaltyFor, resetMatchupHistory } from '@/lib/matchupHistory';

describe('matchupHistory', () => {
  beforeEach(() => {
    resetMatchupHistory();
  });

  it('applies no penalty before anything has been recorded', () => {
    expect(repeatPenaltyFor(1, TypeEffectiveness.Effective)).toBe(1);
  });

  it('applies no penalty to a type/effectiveness that was not just shown', () => {
    recordMatchupHistory(1, TypeEffectiveness.NotVeryEffective);
    expect(repeatPenaltyFor(2, TypeEffectiveness.Effective)).toBe(1);
  });

  it('penalizes repeating the last type independently of effectiveness', () => {
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    expect(repeatPenaltyFor(1, TypeEffectiveness.SuperEffective)).toBeCloseTo(0.4);
  });

  it('penalizes repeating the last effectiveness bucket independently of type', () => {
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    expect(repeatPenaltyFor(2, TypeEffectiveness.Effective)).toBeCloseTo(0.4);
  });

  it('compounds the penalty when both type and effectiveness repeat', () => {
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    expect(repeatPenaltyFor(1, TypeEffectiveness.Effective)).toBeCloseTo(0.4 * 0.4);
  });

  it('deepens the penalty the longer a streak runs', () => {
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    expect(repeatPenaltyFor(1, TypeEffectiveness.NotVeryEffective)).toBeCloseTo(0.4 ** 2);
  });

  it('resets the streak once a different type/effectiveness breaks it', () => {
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    recordMatchupHistory(2, TypeEffectiveness.SuperEffective);
    expect(repeatPenaltyFor(2, TypeEffectiveness.SuperEffective)).toBeCloseTo(0.4 * 0.4);
    expect(repeatPenaltyFor(1, TypeEffectiveness.Effective)).toBe(1);
  });

  it('resetMatchupHistory clears streaks back to no-penalty', () => {
    recordMatchupHistory(1, TypeEffectiveness.Effective);
    resetMatchupHistory();
    expect(repeatPenaltyFor(1, TypeEffectiveness.Effective)).toBe(1);
  });
});
