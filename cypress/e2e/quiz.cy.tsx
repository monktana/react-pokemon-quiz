/// <reference types="cypress" />

describe('Quiz', () => {
  it('enables the player to start a new game', () => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
      fixture: 'matchup/first.json',
    }).as('startGame');

    cy.visit('/');
    cy.get('[data-cy="start-game-button"]').click();

    cy.wait('@startGame');

    cy.get('[data-cy="score-label"]').should('be.visible').should('have.text', 'Score');
    cy.get('[data-cy="score-value"]').should('be.visible').should('have.text', '0');

    cy.get('[data-cy="attacker-pokemon"]').should('be.visible');
    cy.get('[data-cy="defender-pokemon"]').should('be.visible');
    cy.get('[data-cy="question"]').should('be.visible');
    cy.get('[data-cy="decision-buttons"]').should('be.visible');

    cy.get('[data-cy="no-effect-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'No effect');
    cy.get('[data-cy="not-effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Not very effective');
    cy.get('[data-cy="effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Effective');
    cy.get('[data-cy="super-effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Super effective');
  });

  it('enables the player to play multiple rounds', () => {
    cy.start();

    cy.get('[data-cy="score-value"]').should('be.visible').should('have.text', '0');

    cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
      fixture: 'matchup/second.json',
    }).as('secondRound');

    cy.get('[data-cy="effective-button"]').click();
    cy.wait('@secondRound');

    cy.get('[data-cy="score-value"]').should('have.text', '1');

    cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
      fixture: 'matchup/third.json',
    }).as('thirdRound');

    cy.get('[data-cy="effective-button"]').click();
    cy.wait('@thirdRound');

    cy.get('[data-cy="score-value"]').should('have.text', '2');
  });

  it('enables the player to lose', () => {
    cy.start();

    cy.get('[data-cy="super-effective-button"]').click();

    cy.contains('you whited out...');
    cy.contains('your final score is 0');

    cy.get('[data-cy="new-game-button"]').should('be.visible').and('be.enabled');
    cy.get('[data-cy="main-menu-button"]').should('be.visible').and('be.enabled');
  });

  it('enables the player to start a new game after losing', () => {
    cy.start();

    cy.get('[data-cy="super-effective-button"]').click();

    cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
      fixture: 'matchup/first.json',
    }).as('newGame');

    cy.get('[data-cy="new-game-button"]').click();

    cy.get('[data-cy="attacker-pokemon"]').should('be.visible');
    cy.get('[data-cy="defender-pokemon"]').should('be.visible');
    cy.get('[data-cy="question"]').should('be.visible');
    cy.get('[data-cy="decision-buttons"]').should('be.visible');
  });
});
