import React from 'react';

import { Pokemon as PokemonType } from '../../types';

import { Pokemon } from './pokemon';
import { getRessourceName } from './util';

describe('<Pokemon />', () => {
  it('renders', () => {
    cy.fixture('pokemon').then((pokemon: PokemonType) => {
      cy.mount(<Pokemon pokemon={pokemon} variant="attack" />);
    })
  });

  it('displays the pokemon name', () => {
    cy.fixture('pokemon').then((pokemon: PokemonType) => {
      cy.mount(<Pokemon pokemon={pokemon} variant="attack" />);
      cy.get('[data-cy=attack-name]').should('have.text', getRessourceName(pokemon.species.names, 'en'))
    })
  });

  it('displays the back sprite when attacking', () => {
    cy.fixture('pokemon').then((pokemon: PokemonType) => {
      cy.mount(<Pokemon pokemon={pokemon} variant="attack" />);
      cy.get('[data-cy=attack-sprite]').should('have.attr', 'src').and('include', pokemon.sprites.back_default);
    })
  });

  it('displays the back sprite when defending', () => {
    cy.fixture('pokemon').then((pokemon: PokemonType) => {
      cy.mount(<Pokemon pokemon={pokemon} variant="defend" />);
      cy.get('[data-cy=defend-sprite]').should('have.attr', 'src').and('include', pokemon.sprites.front_default);
    })
  });

  it('displays the pokemon types', () => {
    cy.fixture('pokemon').then((pokemon: PokemonType) => {
      cy.mount(<Pokemon pokemon={pokemon} variant="attack" />);
      pokemon.types.forEach((type, index) => {
        cy.get("[data-cy=attack-type-tag]")
        .eq(index)
        .children("span")
        .should("have.text", getRessourceName(type.names, 'en'));

        cy.get("[data-cy=attack-type-tag]")
        .eq(index)
        .children("svg")
        .should("have.attr", "name").and("include", type.name);
      })
    })
  });
})