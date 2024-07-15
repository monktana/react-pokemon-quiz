/// <reference types="cypress" />

describe('Menu', () => {
  it('enables the player to change the language', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/first.json',
      }
    ).as('firstRound');

    cy.visit('/');

    cy.get('html').should('have.attr', 'lang', 'en');
    cy.get('[data-testid="language-switch"]')
      .should('be.visible')
      .should('be.enabled')
      .should('have.attr', 'aria-label', 'Change language');

    cy.get('[data-testid="language-switch"] svg').should('have.attr', 'aria-label', 'en');

    cy.get('[data-testid="language-switch"]').click();
    cy.wrap(['en', 'de']).each((language) => {
      cy.get(`[data-testid="${language}-language"]`).should('be.visible');
    });

    cy.get('[data-testid="de-language"]').click();

    cy.get('html').should('have.attr', 'lang', 'de');
    cy.get('[data-testid="language-switch"]').should('have.attr', 'aria-label', 'Sprache wechseln');
    cy.get('[data-testid="language-switch"] svg').should('have.attr', 'aria-label', 'de');
  });

  it('enables the player to change the color theme', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/first.json',
      }
    ).as('firstRound');

    cy.visit('/');

    cy.get('html')
      .should('have.attr', 'data-theme', 'dark')
      .should('have.attr', 'style', 'color-scheme: dark;');

    cy.get('[data-testid="color-mode-switch"]')
      .should('be.visible')
      .should('be.enabled')
      .should('have.attr', 'aria-label', 'Change color scheme');

    cy.get('[data-testid="color-mode-switch"]').click();

    cy.get('html')
      .should('have.attr', 'data-theme', 'light')
      .should('have.attr', 'style', 'color-scheme: light;');
  });

  it('displays an error fallback and enables the player to retry', () => {
    cy.on('uncaught:exception', () => false);

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 500,
        fixture: 'error/500.json',
      }
    ).as('internalError');

    cy.visit('/', {});

    cy.wait('@internalError');
    cy.get('[data-testid="start-game-button"]').click();

    cy.get('h2').contains('Something went wrong');
    cy.get('p').contains('An error occured. Please reload the site and try again.');

    cy.get('[data-testid="reset-button"]')
      .should('be.visible')
      .should('be.enabled')
      .should('have.text', 'Try Again');

    cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
      fixture: 'matchup/first.json',
    }).as('resetGame');

    cy.get('[data-testid="reset-button"]').click();
    cy.wait('@resetGame');

    cy.get('[data-testid="attacker-pokemon"]').should('be.visible');
    cy.get('[data-testid="defender-pokemon"]').should('be.visible');
  });
});
