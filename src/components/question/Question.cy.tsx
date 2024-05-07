import React from 'react';

import { getRessourceName } from '@/components';

import { Question } from './Question';

describe('<Question />', () => {
  beforeEach(() => {
    cy.fixture('pokemon/bulbasaur').as('bulbasaur');
    cy.fixture('move/round').as('round');
  });

  it('renders', function () {
    cy.mount(<Question pokemon={this.bulbasaur} move={this.round} />);
  });

  it('displays the attacker name', function () {
    cy.mount(<Question pokemon={this.bulbasaur} move={this.round} />);
    cy.get('[data-cy=question]').should(
      'contain.text',
      getRessourceName(this.bulbasaur.species.names, 'en')
    );
  });

  it('displays the moves name', function () {
    cy.mount(<Question pokemon={this.bulbasaur} move={this.round} />);
    cy.get(`[data-cy=${this.round.type.name}-type-tag]`).should(
      'have.text',
      getRessourceName(this.round.names, 'en')
    );
  });

  it('displays the icon of the moves type', function () {
    cy.mount(<Question pokemon={this.bulbasaur} move={this.round} />);
    cy.get(`[data-cy=${this.round.type.name}-type-tag]`)
      .children('svg')
      .should('have.attr', 'name')
      .and('include', this.round.type.name);
  });
});
