/// <reference types="cypress" />

describe('Game Over', () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept('GET', Cypress.env('api_url'), {
      fixture: 'matchup/matchup.json'
    }).as('startGame');
  
    cy.get('[data-cy="start-game-button"]').click();
    cy.wait('@startGame');

    cy.get('[data-cy="no-effect-button"]').click();
  });

  context('menu bar', () => {
    it('menu bar elements are visible', () => {
      cy.get('[data-cy="language-switch"]').should('be.visible').should('be.enabled');
      cy.get('[data-cy="color-mode-switch"]').should('be.visible').should('be.enabled');
    });
  });

  context('menu options', () => {
    it('can start a new game', () => {
      cy.get('[data-cy="new-game-button"]').should('be.visible').and('be.enabled').contains('Try again', {matchCase: false});

      cy.intercept('GET', Cypress.env('api_url'), {
        fixture: 'matchup/matchup.json'
      }).as('newGame');

      cy.get('[data-cy="new-game-button"]').click();

      cy.get('[data-cy="attack-pokemon"]').should('be.visible');
      cy.get('[data-cy="defend-pokemon"]').should('be.visible');
    });

    it('can navigate back to the main menu', () => {
      cy.get('[data-cy="main-menu-button"]').should('be.visible').and('be.enabled').contains('Main Menu', {matchCase: false});
      cy.get('[data-cy="main-menu-button"]').click();

      cy.get('[data-cy="start-game-button"]').should('be.visible');
    });
  });
});
