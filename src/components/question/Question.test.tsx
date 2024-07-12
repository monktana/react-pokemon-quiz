import { screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it as base } from 'vitest';

import { getResourceName, Question } from '@/components';
import { bulbasaur, render, round } from '@/lib';

const it = base.extend({
  pokemon: bulbasaur,
  move: round,
});

describe('<Question />', () => {
  it('displays the attacker name', ({ pokemon }) => {
    render(<Question pokemon={pokemon} move={round} />);

    expect(screen.getByTestId('question')).toBeVisible();
    expect(screen.getByTestId('question')).toHaveTextContent(
      getResourceName(pokemon.species!.names!, 'en')!
    );
  });

  it('displays the moves name', ({ move }) => {
    render(<Question pokemon={bulbasaur} move={move} />);

    expect(screen.getByTestId(`${move.type!.name}-type-tag`)).toBeVisible();
    expect(screen.getByTestId(`${move.type!.name}-type-tag`)).toHaveTextContent(
      getResourceName(move.names!, 'en')!
    );
  });

  it('displays the icon of the moves type', ({ move }) => {
    render(<Question pokemon={bulbasaur} move={move} />);

    expect(screen.getByTestId(`${move.type!.name}-type-tag`)).toBeVisible();
    expect(screen.getByTestId(`${move.type!.name}-type-tag`)).toContainElement(
      // eslint-disable-next-line testing-library/no-node-access
      screen.getByTestId(`${move.type!.name}-type-tag`).querySelector('svg')
    );
  });
});
