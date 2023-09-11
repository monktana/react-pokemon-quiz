import React from 'react';

import { Type } from '../../types';

import { Pokemon } from './Pokemon';
import { getRessourceName } from './util';

describe('<Pokemon />', () => {
  beforeEach(() => {
    cy.fixture('pokemon').as('pokemon');
  });

  it('renders', function() {
    cy.mount(<Pokemon pokemon={this.pokemon} variant="attack" />);
  });

  it('displays the pokemon name', function() {
    cy.mount(<Pokemon pokemon={this.pokemon} variant="attack" />);
    cy.get('[data-cy=attack-name]').should('have.text', getRessourceName(this.pokemon.species.names, 'en'));
  });

  it('displays the back sprite when attacking', function() {
    cy.mount(<Pokemon pokemon={this.pokemon} variant="attack" />);
    cy.get('[data-cy=attack-sprite]').should('have.attr', 'src').and('include', this.pokemon.sprites.back_default);
  });

  it('displays the back sprite when defending', function() {
    cy.mount(<Pokemon pokemon={this.pokemon} variant="defend" />);
    cy.get('[data-cy=defend-sprite]').should('have.attr', 'src').and('include', this.pokemon.sprites.front_default);
  });

  it('displays the pokemon types', function() {
    cy.mount(<Pokemon pokemon={this.pokemon} variant="attack" />);
    this.pokemon.types.forEach((type: Type, index: number) => {
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
})