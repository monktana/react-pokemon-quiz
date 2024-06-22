/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    open(fixture?: string): Cypress.Chainable<void>;

    start(fixture?: string): Cypress.Chainable<void>;

    error(): Cypress.Chainable<void>;
  }
}
