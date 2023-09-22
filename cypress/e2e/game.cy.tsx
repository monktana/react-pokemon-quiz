/// <reference types="cypress" />

import { getRessourceName } from "../../src/features/quiz/components/pokemon/util";

describe('Main Menu', () => {
  beforeEach(() => {
    cy.visit("/");

    cy.intercept('GET', Cypress.env('api_url'), {
      fixture: 'matchup/matchup.json'
    }).as('startGame');
  
    cy.get('[data-cy="start-game-button"]').click();
  });

  context('localization', () => {
    it('can switch the language', () => {
      cy.wait('@startGame').then((interception) => {
        assert.isNotNull(interception.response?.body, '1st API call has data')
        cy.get('[data-cy="language-switch"]').should('be.visible').should('be.enabled');
  
        cy.get('[data-cy="attack-name"]').should('have.text', getRessourceName(interception.response!.body.attacker.names, 'en'));
  
        cy.get('[data-cy="language-switch"]').click();
        cy.get('[data-cy="de-language"]').click();
  
        cy.get('[data-cy="attack-name"]').should('have.text', getRessourceName(interception.response!.body.attacker.names, 'de'));
      });
    });
  });

  context('color mode', () => {
    it('can switch the color mode', () => {
      cy.wait('@startGame');
      cy.get('[data-cy="color-mode-switch"]').should('be.visible').should('be.enabled');

      cy.get('html').should('have.css', 'color-scheme', 'dark');
      cy.get('body').should('have.class', 'chakra-ui-dark');

      cy.get('[data-cy="color-mode-switch"]').click();

      cy.get('html').should('have.css', 'color-scheme', 'light');
      cy.get('body').should('have.class', 'chakra-ui-light');
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
