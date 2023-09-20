/// <reference types="cypress" />

import { TEXTS } from "../../src/hooks/i18n";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("contains a button to start a new game", () => {
    cy.get('[data-cy="new-game"]').contains(TEXTS['en']['mainmenu.button.newgame']);
  });
});
