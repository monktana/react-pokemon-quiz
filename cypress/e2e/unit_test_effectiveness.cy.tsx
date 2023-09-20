/// <reference types="cypress" />

import { TypeEffectiveness, getAttackEffectiveness } from "../../src/features/quiz/utils";

describe('Unit Test Effectiveness Calculation', () => {
  before(() => {
    expect(getAttackEffectiveness).to.be.a('function');
  });

  before(() => {
    cy.fixture('matchup').as('matchup');
  });

  context('normal', () => {
    it('is effective against psychic', function() {
      expect(getAttackEffectiveness(this.matchup.move, this.matchup.defender)).to.eq(TypeEffectiveness.Effective);
    });
  });
});