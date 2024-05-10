/// <reference types="cypress" />

Cypress.Commands.add('start', () => {
  cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
    fixture: 'matchup/first.json',
  }).as('startGame');

  cy.visit('/');

  cy.get('[data-cy="start-game-button"]').click();
  cy.wait('@startGame');
});

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    start(): Chainable<void>;
  }
}
