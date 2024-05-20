/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    open(): Chainable<void>;

    start(): Chainable<void>;
  }
}
