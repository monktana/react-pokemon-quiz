/// <reference types="cypress" />

import { TypeEffectiveness, getAttackEffectiveness } from '../../src/utils';

describe('Unit Test Effectiveness Calculation', () => {
  before(() => {
    expect(getAttackEffectiveness).to.be.a('function');
  });

  before(() => {
    cy.fixture('matchup/matchup').as('matchup');
    cy.fixture('pokemon/abra').as('abra');
    cy.fixture('pokemon/bulbasaur').as('bulbasaur');
    cy.fixture('pokemon/caterpie').as('caterpie');
    cy.fixture('pokemon/charmander').as('charmander');
    cy.fixture('pokemon/clefairy').as('clefairy');
    cy.fixture('pokemon/diglett').as('diglett');
    cy.fixture('pokemon/dratini').as('dratini');
    cy.fixture('pokemon/ekans').as('ekans');
    cy.fixture('pokemon/gastly').as('gastly');
    cy.fixture('pokemon/geodude').as('geodude');
    cy.fixture('pokemon/magnemite').as('magnemite');
    cy.fixture('pokemon/mankey').as('mankey');
    cy.fixture('pokemon/pidgey').as('pidgey');
    cy.fixture('pokemon/pikachu').as('pikachu');
    cy.fixture('pokemon/rattata').as('rattata');
    cy.fixture('pokemon/squirtle').as('squirtle');
    cy.fixture('pokemon/umbreon').as('umbreon');
  });

  context('normal', () => {
    it('is effective against psychic', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.abra)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against grass', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.bulbasaur)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against bug', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.caterpie)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against fire', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.charmander)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against fairy', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.clefairy)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against ground', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.diglett)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against dragon', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.dratini)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against poison', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.ekans)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('has no effect against ghost', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.gastly)).to.eq(
        TypeEffectiveness.NoEffect
      );
    });

    it('is not very effective against rock', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.geodude)).to.eq(
        TypeEffectiveness.NotVeryEffective
      );
    });

    it('is not very effective against steel', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.magnemite)).to.eq(
        TypeEffectiveness.NotVeryEffective
      );
    });

    it('is effective against fighting', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.mankey)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against flying', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.pidgey)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against electric', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.pikachu)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against water', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.squirtle)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against normal', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.squirtle)).to.eq(
        TypeEffectiveness.Effective
      );
    });

    it('is effective against dark', function () {
      expect(getAttackEffectiveness(this.matchup.move, this.umbreon)).to.eq(
        TypeEffectiveness.Effective
      );
    });
  });
});
