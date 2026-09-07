import { chance } from '@/lib/random';

// Kept fairly high: a switch is a lightweight, non-punishing transition (no
// fainting involved), so it can afford to show up often without disrupting
// the core guessing loop.
const ATTACKER_SWITCH_CHANCE = 0.4;
export const shouldSwitchAttacker = (): boolean => chance(ATTACKER_SWITCH_CHANCE);
