import React from 'react';

import { Type } from '@/api';

import { Pokemon } from './Pokemon';
import { getRessourceName } from './util';

describe('<Pokemon />', () => {
  beforeEach(() => {
    cy.fixture('pokemon/bulbasaur').as('bulbasaur');
  });

  it('renders', function () {
    cy.mount(<Pokemon pokemon={this.bulbasaur} variant="attacker" />);
  });

  it('displays the pokemon name', function () {
    cy.mount(<Pokemon pokemon={this.bulbasaur} variant="attacker" />);
    cy.get('[data-cy=attacker-name]').should(
      'have.text',
      getRessourceName(this.bulbasaur.species.names, 'en')
    );
  });

  it('displays the back sprite when attacking', function () {
    cy.mount(<Pokemon pokemon={this.bulbasaur} variant="attacker" />);
    cy.get('[data-cy=attacker-sprite]')
      .should('have.attr', 'src')
      .and('include', this.bulbasaur.sprites.back_default);
  });

  it('displays the back sprite when defending', function () {
    cy.mount(<Pokemon pokemon={this.bulbasaur} variant="defender" />);
    cy.get('[data-cy=defender-sprite]')
      .should('have.attr', 'src')
      .and('include', this.bulbasaur.sprites.front_default);
  });

  it('displays the pokemon types', function () {
    cy.mount(<Pokemon pokemon={this.bulbasaur} variant="attacker" />);
    this.bulbasaur.types.forEach((type: Type) => {
      cy.get(`[data-cy=${type.name}-type-tag]`)
        .children('span')
        .should('have.text', getRessourceName(type.names!, 'en'));

      cy.get(`[data-cy=${type.name}-type-tag]`)
        .children('svg')
        .should('have.attr', 'name')
        .and('include', type.name);
    });
  });
});
