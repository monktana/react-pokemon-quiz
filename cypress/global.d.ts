/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    open(): Cypress.Chainable<void>;

    start(): Cypress.Chainable<void>;

    error(): Cypress.Chainable<void>;
  }
}
