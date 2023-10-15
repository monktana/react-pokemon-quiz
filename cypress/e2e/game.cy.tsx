/// <reference types="cypress" />

describe('Game', () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept('GET', Cypress.env('api_url'), {
      fixture: 'matchup/matchup.json'
    }).as('startGame');
  
    cy.get('[data-cy="start-game-button"]').click();
  });

  context('menu bar', () => {
    it('can switch the language', () => {
      cy.wait('@startGame');

      cy.get('[data-cy="language-switch"]').should('be.visible').should('be.enabled');
      cy.get('[data-cy="color-mode-switch"]').should('be.visible').should('be.enabled');
    });
  });

  context('game', () => {
    it('displays all game elements', () => {
      cy.wait('@startGame');
      cy.get('[data-cy="score-label"]').should('be.visible').should('have.text', 'Score');
      cy.get('[data-cy="score-value"]').should('be.visible').should('have.text', '0');

      cy.get('[data-cy="attack-pokemon"]').should('be.visible');
      cy.get('[data-cy="defend-pokemon"]').should('be.visible');

      cy.get('[data-cy="question-container"]').should('be.visible');

      cy.get('[data-cy="decision-buttons"]').should('be.visible');

      cy.get('[data-cy="no-effect-button"]').should('be.visible').and('be.enabled').and('have.text', 'No effect');
      cy.get('[data-cy="not-effective-button"]').should('be.visible').and('be.enabled').and('have.text', 'Not very effective');
      cy.get('[data-cy="effective-button"]').should('be.visible').and('be.enabled').and('have.text', 'Effective');
      cy.get('[data-cy="super-effective-button"]').should('be.visible').and('be.enabled').and('have.text', 'Super effective');
    });

    it('loads the next round on a correct answer', () => {
      cy.wait('@startGame');

      cy.intercept('GET', Cypress.env('api_url'), {
        fixture: 'matchup/matchup.json'
      }).as('nextRound');
      cy.get('[data-cy="effective-button"]').click();

      cy.wait('@nextRound');

      cy.get('[data-cy="score-value"]').should('be.visible').should('have.text', '1');
    });

    it('displays the game over screen on the first wrong answer', () => {
      cy.wait('@startGame');

      cy.get('[data-cy="no-effect-button"]').click();

      cy.contains('you whited out...');
      cy.contains('your final score is 0');
    });

    it('displays the game over screen on the second wrong answer', () => {
      cy.wait('@startGame');

      cy.get('[data-cy="not-effective-button"]').click();

      cy.contains('you whited out...');
    });

    it('displays the game over screen on the third wrong answer', () => {
      cy.wait('@startGame');

      cy.get('[data-cy="super-effective-button"]').click();

      cy.contains('you whited out...');
    });
  });
});
