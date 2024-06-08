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

Cypress.Commands.add('error', () => {
  cy.on('uncaught:exception', () => false);
  cy.open();

  cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
    statusCode: 500,
    body: {
      status: 500,
      title: 'Internal Server Error',
      type: 'https://tools.ietf.org/html/rfc9110#section-15.6.1',
    },
  }).as('internalError');

  cy.get('[data-cy="start-game-button"]').click();
});
