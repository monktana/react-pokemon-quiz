import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { calculateEffectiveness, calculateEffectivenessMultiplier } from '@/lib/calculateEffectiveness';
import { generateMatchup } from '@/lib/generateMatchup';
import { recordMatchupHistory, resetMatchupHistory } from '@/lib/matchupHistory';
import { getPokemonDataset, type PokemonDataset } from '@/lib/pokemonData';

const pokemonRecords = [
  {
    id: 1,
    name: 'fakemon-one',
    species: { id: 1, names: [{ name: 'Fakemon One', language: 'en' }] },
    sprites: {},
    typeIds: [1],
    moveIds: [10],
  },
  {
    id: 2,
    name: 'fakemon-two',
    species: { id: 2, names: [{ name: 'Fakemon Two', language: 'en' }] },
    sprites: {},
    typeIds: [2],
    moveIds: [11],
  },
  {
    id: 3,
    name: 'fakemon-three',
    species: { id: 3, names: [{ name: 'Fakemon Three', language: 'en' }] },
    sprites: {},
    typeIds: [3],
    moveIds: [12],
  },
];

const fakeDataset: PokemonDataset = {
  pokemon: pokemonRecords,
  pokemonById: new Map(pokemonRecords.map((record) => [record.id, record])),
  movesById: new Map([
    [10, { id: 10, name: 'move-one', names: [], power: 50, typeId: 1 }],
    [11, { id: 11, name: 'move-two', names: [], power: 40, typeId: 2 }],
    [12, { id: 12, name: 'move-three', names: [], power: 60, typeId: 3 }],
  ]),
  typesById: new Map([
    [1, { id: 1, name: 'fire', names: [] }],
    [2, { id: 2, name: 'water', names: [] }],
    [3, { id: 3, name: 'grass', names: [] }],
  ]),
} as unknown as PokemonDataset;

vi.mock('@/lib/pokemonData', async () => {
  const actual = await vi.importActual<typeof import('@/lib/pokemonData')>('@/lib/pokemonData');
  return {
    ...actual,
    getPokemonDataset: vi.fn(() => Promise.resolve(fakeDataset)),
  };
});

const attackerId = 1;

describe('generateMatchup', () => {
  beforeEach(() => {
    resetMatchupHistory();
  });

  it('never picks the same Pokemon as attacker and defender', async () => {
    for (let i = 0; i < 50; i++) {
      const matchup = await generateMatchup(attackerId);
      expect(matchup.attacker!.id).toBe(attackerId);
      expect(matchup.defender!.id).not.toBe(attackerId);
    }
  });

  it("picks a move that belongs to the attacker's move pool", async () => {
    const matchup = await generateMatchup(attackerId);
    const attackerRecord = fakeDataset.pokemon.find((p) => p.id === attackerId)!;
    expect(attackerRecord.moveIds).toContain(matchup.move!.id);
  });

  it('computes effectiveness consistently with calculateEffectiveness', async () => {
    const matchup = await generateMatchup(attackerId);
    const expected = calculateEffectiveness(matchup.move!.type!, matchup.defender!.types!);
    expect(matchup.effectiveness).toBe(expected);
  });

  it('omits the unused moves field on attacker and defender', async () => {
    const matchup = await generateMatchup(attackerId);
    expect(matchup.attacker!.moves).toBeUndefined();
    expect(matchup.defender!.moves).toBeUndefined();
  });

  it('computes the raw multiplier consistently with calculateEffectivenessMultiplier', async () => {
    const matchup = await generateMatchup(attackerId);
    const expected = calculateEffectivenessMultiplier(matchup.move!.type!, matchup.defender!.types!);
    expect(matchup.multiplier).toBe(expected);
  });

  it("marks stabEligible when the move's type is among the attacker's types", async () => {
    // Every fakemon in this dataset only knows a move matching its own type.
    const matchup = await generateMatchup(attackerId);
    expect(matchup.stabEligible).toBe(true);
  });

  it("marks stabEligible false when the move's type is not among the attacker's types", async () => {
    const offTypeRecords = [
      {
        id: 1,
        name: 'off-type-attacker',
        species: { id: 1, names: [{ name: 'Off Type Attacker', language: 'en' }] },
        sprites: {},
        typeIds: [1],
        moveIds: [11],
      },
      {
        id: 2,
        name: 'off-type-defender',
        species: { id: 2, names: [{ name: 'Off Type Defender', language: 'en' }] },
        sprites: {},
        typeIds: [2],
        moveIds: [10],
      },
    ];
    const offTypeDataset: PokemonDataset = {
      pokemon: offTypeRecords,
      pokemonById: new Map(offTypeRecords.map((record) => [record.id, record])),
      movesById: new Map([
        [10, { id: 10, name: 'move-one', names: [], power: 50, typeId: 1 }],
        [11, { id: 11, name: 'move-two', names: [], power: 40, typeId: 2 }],
      ]),
      typesById: new Map([
        [1, { id: 1, name: 'fire', names: [] }],
        [2, { id: 2, name: 'water', names: [] }],
      ]),
    } as unknown as PokemonDataset;

    vi.mocked(getPokemonDataset).mockResolvedValueOnce(offTypeDataset);

    // Attacker (fire) knows move-two, a water move -> no STAB.
    const matchup = await generateMatchup(1);
    expect(matchup.stabEligible).toBe(false);
  });
});

describe('generateMatchup type variation', () => {
  beforeEach(() => {
    resetMatchupHistory();
  });

  afterEach(() => {
    vi.mocked(getPokemonDataset).mockResolvedValue(fakeDataset);
  });

  it('gives an under-represented type a real shot, not one proportional to its move count', async () => {
    // 9 fire moves vs. 1 water move - naively proportional selection would
    // pick water only ~10% of the time, since it's outnumbered 9 to 1.
    const unevenPoolRecords = [
      {
        id: 1,
        name: 'attacker',
        species: { id: 1, names: [] },
        sprites: {},
        typeIds: [1],
        moveIds: [1, 2, 3, 4, 5, 6, 7, 8, 20],
      },
      {
        id: 2,
        name: 'defender',
        species: { id: 2, names: [] },
        sprites: {},
        typeIds: [4],
        moveIds: [],
      },
    ];
    const unevenPoolDataset: PokemonDataset = {
      pokemon: unevenPoolRecords,
      pokemonById: new Map(unevenPoolRecords.map((record) => [record.id, record])),
      movesById: new Map<number, { id: number; name: string; names: []; power: number; typeId: number }>([
        [1, { id: 1, name: 'fire-move-1', names: [], power: 50, typeId: 1 }],
        [2, { id: 2, name: 'fire-move-2', names: [], power: 50, typeId: 1 }],
        [3, { id: 3, name: 'fire-move-3', names: [], power: 50, typeId: 1 }],
        [4, { id: 4, name: 'fire-move-4', names: [], power: 50, typeId: 1 }],
        [5, { id: 5, name: 'fire-move-5', names: [], power: 50, typeId: 1 }],
        [6, { id: 6, name: 'fire-move-6', names: [], power: 50, typeId: 1 }],
        [7, { id: 7, name: 'fire-move-7', names: [], power: 50, typeId: 1 }],
        [8, { id: 8, name: 'fire-move-8', names: [], power: 50, typeId: 1 }],
        [20, { id: 20, name: 'water-move', names: [], power: 50, typeId: 2 }],
      ]),
      typesById: new Map([
        [1, { id: 1, name: 'fire', names: [] }],
        [2, { id: 2, name: 'water', names: [] }],
        [4, { id: 4, name: 'rock', names: [] }],
      ]),
    } as unknown as PokemonDataset;
    vi.mocked(getPokemonDataset).mockResolvedValue(unevenPoolDataset);

    const sampleSize = 300;
    let waterPicks = 0;
    for (let i = 0; i < sampleSize; i++) {
      const matchup = await generateMatchup(1);
      // generateMatchup no longer records into matchupHistory itself (see
      // its comment on why - a discarded prefetch must not pollute the
      // streaks). Battle.tsx does that once a matchup is actually shown; this
      // loop simulates one matchup being shown per iteration.
      recordMatchupHistory(matchup.move!.type!.id!, matchup.effectiveness!);
      if (matchup.move!.type!.id === 2) waterPicks++;
    }

    expect(waterPicks / sampleSize).toBeGreaterThan(0.25);
  });

  it('picks the same attack type again less often than a fresh 50/50 draw would', async () => {
    const balancedPoolRecords = [
      {
        id: 1,
        name: 'attacker',
        species: { id: 1, names: [] },
        sprites: {},
        typeIds: [1],
        moveIds: [1, 2],
      },
      {
        id: 2,
        name: 'defender',
        species: { id: 2, names: [] },
        sprites: {},
        typeIds: [4],
        moveIds: [],
      },
    ];
    const balancedPoolDataset: PokemonDataset = {
      pokemon: balancedPoolRecords,
      pokemonById: new Map(balancedPoolRecords.map((record) => [record.id, record])),
      movesById: new Map([
        [1, { id: 1, name: 'fire-move', names: [], power: 50, typeId: 1 }],
        [2, { id: 2, name: 'water-move', names: [], power: 50, typeId: 2 }],
      ]),
      typesById: new Map([
        [1, { id: 1, name: 'fire', names: [] }],
        [2, { id: 2, name: 'water', names: [] }],
        [4, { id: 4, name: 'rock', names: [] }],
      ]),
    } as unknown as PokemonDataset;
    vi.mocked(getPokemonDataset).mockResolvedValue(balancedPoolDataset);

    const sampleSize = 300;
    let repeats = 0;
    let previousTypeId: number | null = null;
    for (let i = 0; i < sampleSize; i++) {
      const matchup = await generateMatchup(1);
      // Same simulated "Battle shows this matchup" step as above.
      recordMatchupHistory(matchup.move!.type!.id!, matchup.effectiveness!);
      const typeId = matchup.move!.type!.id;
      if (typeId === previousTypeId) repeats++;
      previousTypeId = typeId!;
    }

    // With no penalty, a 2-type pool would repeat ~50% of the time.
    expect(repeats / sampleSize).toBeLessThan(0.4);
  });
});
