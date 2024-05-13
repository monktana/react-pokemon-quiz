/// <reference types="cypress" />

describe('Menu', () => {
  it('enables the user to change the language', () => {
    cy.visit('/');

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

  it('enables the user to change the color theme', () => {
    cy.visit('/');

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
});
