import { describe, expect, it, vi } from 'vitest';

import { shouldSwitchAttacker } from '@/lib/roundChance';

describe('shouldSwitchAttacker', () => {
  it('returns true when the roll lands below the switch chance', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(shouldSwitchAttacker()).toBe(true);
    randomSpy.mockRestore();
  });

  it('returns false when the roll lands exactly on the switch chance', () => {
    // chance() uses a strict `<`, so landing exactly on the threshold (0.4)
    // must not trigger it - this also pins the constant's actual value.
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.4);
    expect(shouldSwitchAttacker()).toBe(false);
    randomSpy.mockRestore();
  });

  it('returns false when the roll lands above the switch chance', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.99);
    expect(shouldSwitchAttacker()).toBe(false);
    randomSpy.mockRestore();
  });

  it('returns true for a roll comfortably below the switch chance', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(shouldSwitchAttacker()).toBe(true);
    randomSpy.mockRestore();
  });
});
