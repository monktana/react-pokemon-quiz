/// <reference types="cypress" />

Cypress.Commands.add('open', () => {
  cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
    fixture: 'matchup/first.json',
  }).as('startGame');

  cy.visit('/', {
    onBeforeLoad(win) {
      // set the browser language to english
      Object.defineProperty(win.navigator, 'language', {
        value: 'en',
      });
    },
  });
});

Cypress.Commands.add('start', () => {
  cy.open();

  cy.get('[data-cy="start-game-button"]').click();
  cy.wait('@startGame');
});
