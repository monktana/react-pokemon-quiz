/// <reference types="cypress" />

import { TypeEffectiveness, getAttackEffectiveness } from "../../src/features/quiz/utils";

describe('Unit Test Effectiveness Calculation', () => {
  before(() => {
    expect(getAttackEffectiveness).to.be.a('function');
  });

  before(() => {
    cy.fixture('matchup').as('matchup');
    cy.fixture('pokemon/bulbasaur').as('bulbasaur');
    cy.fixture('pokemon/charmander').as('charmander');
    cy.fixture('pokemon/squirtle').as('squirtle');
  });

  context('normal', () => {
    it('is effective against psychic', function() {
      expect(getAttackEffectiveness(this.matchup.move, this.matchup.defender)).to.eq(TypeEffectiveness.Effective);
    });

    it('is effective against grass', function() {
      expect(getAttackEffectiveness(this.matchup.move, this.bulbasaur)).to.eq(TypeEffectiveness.Effective);
    });

    it('is effective against fire', function() {
      expect(getAttackEffectiveness(this.matchup.move, this.charmander)).to.eq(TypeEffectiveness.Effective);
    });

    it('is effective against water', function() {
      expect(getAttackEffectiveness(this.matchup.move, this.squirtle)).to.eq(TypeEffectiveness.Effective);
    });
  });
});