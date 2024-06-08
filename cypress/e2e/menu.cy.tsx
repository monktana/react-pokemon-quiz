/// <reference types="cypress" />

describe('Menu', () => {
  it('enables the player to change the language', () => {
    cy.open();

    cy.get('html').should('have.attr', 'lang', 'en');
    cy.get('[data-cy="language-switch"]')
      .should('be.visible')
      .should('be.enabled')
      .should('have.attr', 'aria-label', 'Change language');

    cy.get('[data-cy="language-switch"] svg').should('have.attr', 'aria-label', 'en');

    cy.get('[data-cy="language-switch"]').click();
    cy.wrap(['en', 'de']).each((language) => {
      cy.get(`[data-cy="${language}-language"]`).should('be.visible');
    });

    cy.get('[data-cy="de-language"]').click();

    cy.get('html').should('have.attr', 'lang', 'de');
    cy.get('[data-cy="language-switch"]').should('have.attr', 'aria-label', 'Sprache wechseln');
    cy.get('[data-cy="language-switch"] svg').should('have.attr', 'aria-label', 'de');
  });

  it('enables the player to change the color theme', () => {
    cy.open();

    cy.get('html')
      .should('have.attr', 'data-theme', 'dark')
      .should('have.attr', 'style', 'color-scheme: dark;');

    cy.get('[data-cy="color-mode-switch"]')
      .should('be.visible')
      .should('be.enabled')
      .should('have.attr', 'aria-label', 'Change color scheme');

    cy.get('[data-cy="color-mode-switch"]').click();

    cy.get('html')
      .should('have.attr', 'data-theme', 'light')
      .should('have.attr', 'style', 'color-scheme: light;');
  });

  it('displays a fallback to the player when an error occurs', () => {
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

    cy.get('h2').contains('Something went wrong');
    cy.get('p').contains('An error occured. Please reload the site and try again.');
  });

  it('enables the player to retry on error', () => {
    cy.error();

    cy.get('[data-cy="reset-button"]')
      .should('be.visible')
      .should('be.enabled')
      .should('have.text', 'Try Again');

    cy.intercept('GET', `${Cypress.env('apiUrl')}/matchup`, {
      fixture: 'matchup/second.json',
    }).as('retry');

    cy.get('[data-cy="reset-button"]').click();
    cy.wait('@retry');

    cy.get('[data-cy="attacker-pokemon"]').should('be.visible');
    cy.get('[data-cy="defender-pokemon"]').should('be.visible');
  });
});
