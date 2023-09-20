import React from 'react';

import { getRessourceName } from '../pokemon/util';

import { Question } from './Question';

describe('<Question />', () => {
  before(() => {
    cy.fixture('matchup/matchup').as('matchup');
  });

  it('renders', function() {
    cy.mount(<Question pokemon={this.matchup.attacker} move={this.matchup.move} />);
  });

  it('displays the attacker name', function() {
    cy.mount(<Question pokemon={this.matchup.attacker} move={this.matchup.move} />);
    cy.get("[data-cy=pokemon-name]").should("have.text", getRessourceName(this.matchup.attacker.names, 'en'));
  });

  it('displays the move name', function() {
    cy.mount(<Question pokemon={this.matchup.attacker} move={this.matchup.move} />);
    cy.get("[data-cy=attack-tag-name]").should("have.text", getRessourceName(this.matchup.move.names, 'en'));
  });

  it('displays the move type icon', function() {
    cy.mount(<Question pokemon={this.matchup.attacker} move={this.matchup.move} />);
    cy.get("[data-cy=attack-tag-icon]").should("have.attr", "name").and("include", this.matchup.move.type.name);
  });
})