/// <reference types="cypress" />

// open the application and prefetch the initial matchup
Cypress.Commands.add('open', (fixture: string = 'matchup/first.json') => {
  cy.intercept(
    {
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/matchup`,
      times: 1,
    },
    {
      fixture: fixture,
    }
  ).as('startGame');

  cy.visit('/', {
    onBeforeLoad(win) {
      // set the browser language to english
      Object.defineProperty(win.navigator, 'language', {
        value: 'en',
      });
    },
  });
  cy.wait('@startGame');
});

// start the game and prefetch the next matchup
Cypress.Commands.add('start', (fixture: string = 'matchup/second.json') => {
  cy.open();

  cy.intercept(
    {
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/matchup`,
      times: 1,
    },
    {
      fixture: fixture,
    }
  ).as('secondRound');

  cy.get('[data-testid="start-game-button"]').click();
  cy.wait('@secondRound');
});

Cypress.Commands.add('error', () => {
  cy.on('uncaught:exception', () => false);

  cy.intercept(
    {
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/matchup`,
      times: 1,
    },
    {
      fixture: 'error/500.json',
    }
  ).as('internalError');

  cy.visit('/', {
    onBeforeLoad(win) {
      // set the browser language to english
      Object.defineProperty(win.navigator, 'language', {
        value: 'en',
      });
    },
  });
  cy.wait('@internalError');

  cy.get('[data-testid="start-game-button"]').click();
});
