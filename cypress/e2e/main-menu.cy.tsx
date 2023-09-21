/// <reference types="cypress" />
/// <reference types="cypress" />

describe('Main Menu', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context('localization', () => {
    it('contains the language button', () => {
      cy.get('[data-cy="language-switch"]')
        .should('be.visible')
        .should('be.enabled');
    });

    it('can switch the language', () => {
      cy.get('[data-cy="new-game"]').contains('Click to play', { matchCase: false });

      cy.get('[data-cy="language-switch"]').click();
  
      cy.get('[data-cy="en-language"]').should('be.visible');
      cy.get('[data-cy="de-language"]').should('be.visible');
      cy.get('[data-cy="de-language"]').click();
  
      cy.get('[data-cy="new-game"]').contains('Neues Spiel', { matchCase: false });
    });
  });

  context('color mode', () => {
    it('contains the color mode button', () => {
      cy.get('[data-cy="color-mode-switch"]')
        .should('be.visible')
        .should('be.enabled');
    });

    it('can switch the color mode', () => {
      cy.get('html').should('have.css', 'color-scheme', 'dark');
      cy.get('body').should('have.class', 'chakra-ui-dark');

      cy.get('[data-cy="color-mode-switch"]').click();

      cy.get('html').should('have.css', 'color-scheme', 'light');
      cy.get('body').should('have.class', 'chakra-ui-light');
    });
  });

  context('new game', () => {
    it('contains a button to start a new game', () => {
      cy.get('[data-cy="new-game"]')
        .should('be.visible')
        .should('be.enabled');
    });

    it('can start a new game', () => {
      cy.fixture('matchup/matchup').then((matchup) => {
        cy.intercept('GET', 'http://localhost:3000', {
          body: matchup
        });
  
        cy.get('[data-cy="new-game"]').click();

        cy.get('[data-cy=attack-sprite]').should('have.attr', 'src').and('include', matchup.attacker.sprites.back_default);
        cy.get('[data-cy=defend-sprite]').should('have.attr', 'src').and('include', matchup.defender.sprites.front_default);
      })
    });
  });
});
