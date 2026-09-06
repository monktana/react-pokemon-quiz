/**
 * The only file in the codebase allowed to call Math.random() directly.
 * Everything else goes through one of these, so a test can mock exactly the
 * decision it cares about instead of the shared global.
 */

export const chance = (probability: number): boolean => Math.random() < probability;

export const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

/**
 * Picks an item at random with probability proportional to its weight.
 * Weights don't need to sum to 1 - they're normalized against their total.
 * A zero-weight item can still be picked if every weight in the list is 0
 * (falls back to uniform in that degenerate case).
 */
export const weightedRandomItem = <T>(entries: { item: T; weight: number }[]): T => {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  if (totalWeight <= 0) return randomItem(entries.map((entry) => entry.item));

  let roll = Math.random() * totalWeight;
  for (const entry of entries) {
    roll -= entry.weight;
    if (roll < 0) return entry.item;
  }
  // Only reachable via floating-point rounding at the very end of the range.
  return entries[entries.length - 1].item;
};

// Same shuffle as before (still `sort` with a random comparator, still not
// perfectly uniform) - only the Math.random() call site moved, behavior
// didn't change.
export const shuffle = <T>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5);
