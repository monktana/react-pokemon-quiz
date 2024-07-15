/// <reference types="cypress" />

describe('Quiz', () => {
  it('enables the player to start a new game', () => {
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

    cy.wait('@firstRound');
    cy.get('[data-testid="start-game-button"]').click();

    cy.get('[data-testid="score-label"]').should('be.visible').should('have.text', 'Score');
    cy.get('[data-testid="score-value"]').should('be.visible').should('have.text', '0');

    cy.get('[data-testid="game-container"]').should('be.visible');
    cy.get('[data-testid="attacker-pokemon"]')
      .should('be.visible')
      .contains('bellsprout', { matchCase: false });
    cy.get('[data-testid="defender-pokemon"]')
      .should('be.visible')
      .contains('tauros', { matchCase: false });
    cy.get('[data-testid="question"]').should('be.visible').contains('round', { matchCase: false });

    cy.get('[data-testid="decision-buttons"]').should('be.visible');
    cy.get('[data-testid="no-effect-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'No effect');
    cy.get('[data-testid="not-effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Not very effective');
    cy.get('[data-testid="effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Effective');
    cy.get('[data-testid="super-effective-button"]')
      .should('be.visible')
      .and('be.enabled')
      .and('have.text', 'Super effective');
  });

  it('enables the player to play multiple rounds', () => {
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
    cy.wait('@firstRound');

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/second.json',
      }
    ).as('secondRound');

    cy.get('[data-testid="start-game-button"]').click();

    cy.get('[data-testid="score-value"]').should('be.visible').should('have.text', '0');
    cy.get('[data-testid="attacker-pokemon"]')
      .should('be.visible')
      .contains('bellsprout', { matchCase: false });
    cy.get('[data-testid="defender-pokemon"]')
      .should('be.visible')
      .contains('tauros', { matchCase: false });

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/third.json',
      }
    ).as('thirdRound');

    cy.wait('@secondRound');
    cy.get('[data-testid="effective-button"]').click();

    cy.get('[data-testid="score-value"]').should('have.text', '1');
    cy.get('[data-testid="attacker-pokemon"]').contains('abra', { matchCase: false });
    cy.get('[data-testid="defender-pokemon"]').contains('golduck', { matchCase: false });
    cy.get('[data-testid="question"]')
      .should('be.visible')
      .contains('knock off', { matchCase: false });

    cy.wait('@thirdRound');
    cy.get('[data-testid="effective-button"]').click();

    cy.get('[data-testid="score-value"]').should('have.text', '2');
    cy.get('[data-testid="attacker-pokemon"]').contains('gloom', { matchCase: false });
    cy.get('[data-testid="defender-pokemon"]').contains('ditto', { matchCase: false });
    cy.get('[data-testid="question"]').contains('cut', { matchCase: false });
  });

  it('enables the player to lose if a wrong answer is given', () => {
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

    cy.wait('@firstRound');
    cy.get('[data-testid="start-game-button"]').click();

    cy.get('[data-testid="super-effective-button"]').click();

    cy.contains('you whited out...', { matchCase: false });
    cy.contains('your final score is 0', { matchCase: false });

    cy.get('[data-testid="new-game-button"]').should('be.visible').and('be.enabled');
    cy.get('[data-testid="main-menu-button"]').should('be.visible').and('be.enabled');
  });

  it('enables the player to start a new game after losing', () => {
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

    cy.wait('@firstRound');
    cy.get('[data-testid="start-game-button"]').click();

    cy.get('[data-testid="super-effective-button"]').click();

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
    ).as('newGame');

    cy.get('[data-testid="new-game-button"]').click();

    cy.get('[data-testid="attacker-pokemon"]').should('be.visible');
    cy.get('[data-testid="defender-pokemon"]').should('be.visible');
    cy.get('[data-testid="question"]').should('be.visible');
    cy.get('[data-testid="decision-buttons"]').should('be.visible');
  });

  it('displays a loading screen to the player when starting the game', () => {
    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/first.json',
        delay: 1000,
      }
    ).as('firstRound');

    cy.visit('/');

    cy.get('[data-testid="start-game-button"]').click();
    cy.get('[data-testid="loading-container"]').should('exist').and('be.visible');

    cy.wait('@firstRound');
    cy.get('[data-testid="loading-container"]').should('not.exist');

    cy.get('[data-testid="attacker-pokemon"]').should('be.visible');
    cy.get('[data-testid="defender-pokemon"]').should('be.visible');
  });

  it('indicates loading to the player during the game', () => {
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
    cy.wait('@firstRound');

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/second.json',
        delay: 1000,
      }
    ).as('secondRound');
    cy.get('[data-testid="start-game-button"]').click();

    cy.get('[data-testid="game-container"]').should('be.visible');
    cy.get('[data-testid="effective-button"]').should('be.visible').and('be.enabled');

    cy.get('[data-testid="effective-button"]').click();

    cy.get('[data-testid="loading-container"]').should('exist').and('be.visible');
    cy.get('[data-testid="game-container"]').should('not.be.visible');

    cy.wait('@secondRound');

    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/matchup`,
        times: 1,
      },
      {
        statusCode: 200,
        fixture: 'matchup/third.json',
      }
    ).as('lastRound');

    cy.get('[data-testid="game-container"]').should('be.visible');
    cy.get('[data-testid="loading-container"]').should('not.exist');
  });
});
