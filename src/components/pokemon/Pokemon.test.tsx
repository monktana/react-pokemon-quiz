import { screen, within } from '@testing-library/react';
import React from 'react';
import { describe, expect, it as base } from 'vitest';

import { getResourceName, types } from '@/components';
import { bulbasaur, render } from '@/lib';
import * as TypeFixtures from '@/lib/testing/fixtures/type';

import { Pokemon } from './Pokemon';
import { TypeTag } from './TypeTag';

const it = base.extend({
  pokemon: bulbasaur,
  types: TypeFixtures,
});

describe('<Pokemon />', () => {
  it('displays the pokemon name', ({ pokemon }) => {
    render(<Pokemon pokemon={pokemon} variant="attacker" />);
    expect(screen.getByTestId('attacker-name')).toBeVisible();

    const { getByText } = within(screen.getByTestId('attacker-name'));
    expect(getByText(getResourceName(pokemon.species!.names!, 'en')!)).toBeInTheDocument();
  });

  it('displays the back sprite when attacking', ({ pokemon }) => {
    render(<Pokemon pokemon={pokemon} variant="attacker" />);

    expect(screen.getByTestId('attacker-sprite')).toBeVisible();
    expect(screen.getByTestId('attacker-sprite')).toHaveAttribute(
      'src',
      pokemon.sprites?.back_default
    );
  });

  it('displays the front sprite when defending', ({ pokemon }) => {
    render(<Pokemon pokemon={pokemon} variant="defender" />);

    expect(screen.getByTestId('defender-sprite')).toBeVisible();
    expect(screen.getByTestId('defender-sprite')).toHaveAttribute(
      'src',
      bulbasaur.sprites?.front_default
    );
  });

  it('displays the pokemons types', ({ pokemon }) => {
    render(<Pokemon pokemon={pokemon} variant="attacker" />);

    pokemon.types?.forEach((type) => {
      expect(screen.getByTestId(`${type.name}-type-tag`)).toBeVisible();
      expect(screen.getByTestId(`${type.name}-type-tag`)).toHaveTextContent(
        getResourceName(type.names!, 'en')!
      );
    });
  });
});

describe('<TypeTag />', () => {
  it('displays the information of type', ({ types }) => {
    Object.entries(types).forEach(([key, type]) => {
      render(<TypeTag type={key as types} text={type.names!} />);

      expect(screen.getByTestId(`${key}-type-tag`)).toBeVisible();
      expect(screen.getByTestId(`${key}-type-tag`)).toHaveTextContent(
        getResourceName(type.names!, 'en')!
      );
      expect(screen.getByTestId(`${key}-type-tag`)).toContainElement(
        // eslint-disable-next-line testing-library/no-node-access
        screen.getByTestId(`${key}-type-tag`).querySelector('svg')
      );
    });
  });
});
