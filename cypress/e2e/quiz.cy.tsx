/// <reference types="cypress" />

describe('Quiz', () => {
  it('enables the player to start a new game', () => {
    cy.start();

    cy.get('[data-cy="score-label"]').should('be.visible').should('have.text', 'Score');
    cy.get('[data-cy="score-value"]').should('be.visible').should('have.text', '0');

    cy.get('[data-cy="game-container"]').should('be.visible');
    cy.get('[data-cy="attacker-pokemon"]')
      .should('be.visible')
      .contains('bellsprout', { matchCase: false });
    cy.get('[data-cy="defender-pokemon"]')
      .should('be.visible')
      .contains('tauros', { matchCase: false });
    cy.get('[data-cy="question"]').should('be.visible').contains('round', { matchCase: false });

    cy.get('[data-cy="decision-buttons"]').should('be.visible');
    cy.get('[data-cy="no-effect-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'No effect');
    cy.get('[data-cy="not-effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Not very effective');
    cy.get('[data-cy="effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Effective');
    cy.get('[data-cy="super-effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Super effective');
  });

  it('enables the player to play multiple rounds', () => {
    cy.start();

    cy.get('[data-cy="score-value"]').should('be.visible').should('have.text', '0');
    cy.get('[data-cy="attacker-pokemon"]')
      .should('be.visible')
      .contains('bellsprout', { matchCase: false });
    cy.get('[data-cy="defender-pokemon"]')
      .should('be.visible')
      .contains('tauros', { matchCase: false });

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
      },
      {
        fixture: 'matchup/third.json',
      }
    ).as('thirdRound');

    cy.get('[data-cy="effective-button"]').click();

    cy.get('[data-cy="score-value"]').should('have.text', '1');
    cy.get('[data-cy="attacker-pokemon"]').contains('abra', { matchCase: false });
    cy.get('[data-cy="defender-pokemon"]').contains('golduck', { matchCase: false });
    cy.get('[data-cy="question"]').should('be.visible').contains('knock off', { matchCase: false });

    cy.wait('@thirdRound');
    cy.get('[data-cy="effective-button"]').click();

    cy.get('[data-cy="score-value"]').should('have.text', '2');
    cy.get('[data-cy="attacker-pokemon"]').contains('gloom', { matchCase: false });
    cy.get('[data-cy="defender-pokemon"]').contains('ditto', { matchCase: false });
    cy.get('[data-cy="question"]').contains('cut', { matchCase: false });
  });

  it('enables the player to lose if a wrong answer is given', () => {
    cy.start();

    cy.get('[data-cy="super-effective-button"]').click();

    cy.contains('you whited out...', { matchCase: false });
    cy.contains('your final score is 0', { matchCase: false });

    cy.get('[data-cy="new-game-button"]').should('be.visible').and('be.enabled');
    cy.get('[data-cy="main-menu-button"]').should('be.visible').and('be.enabled');
  });

  it('enables the player to start a new game after losing', () => {
    cy.start();

    cy.get('[data-cy="super-effective-button"]').click();

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        fixture: 'matchup/first.json',
      }
    ).as('newGame');

    cy.get('[data-cy="new-game-button"]').click();

    cy.get('[data-cy="attacker-pokemon"]').should('be.visible');
    cy.get('[data-cy="defender-pokemon"]').should('be.visible');
    cy.get('[data-cy="question"]').should('be.visible');
    cy.get('[data-cy="decision-buttons"]').should('be.visible');
  });

  it('displays a loading screen to the player when starting the game', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        fixture: 'matchup/first.json',
        delay: 1000,
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

    cy.get('[data-cy="start-game-button"]').click();
    cy.get('[data-cy="loading-container"]').should('be.visible');

    cy.wait('@startGame');

    cy.get('[data-cy="attacker-pokemon"]').should('be.visible');
    cy.get('[data-cy="defender-pokemon"]').should('be.visible');
  });

  it('indicates loading to the player during the game', () => {
    cy.open();

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        fixture: 'matchup/second.json',
        delay: 1000,
      }
    ).as('nextRound');

    cy.get('[data-cy="start-game-button"]').click();

    cy.get('[data-cy="game-container"]').should('be.visible');
    cy.get('[data-cy="effective-button"]').should('be.visible').and('be.enabled');
    cy.get('[data-cy="effective-button"]').click();

    cy.get('[data-cy="loading-container"]').should('exist').and('be.visible');
    cy.get('[data-cy="game-container"]').should('not.be.visible');

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        fixture: 'matchup/third.json',
      }
    ).as('lastRound');

    cy.wait('@nextRound');

    cy.get('[data-cy="game-container"]').should('be.visible');
    cy.get('[data-cy="loading-container"]').should('not.exist');
  });
});
