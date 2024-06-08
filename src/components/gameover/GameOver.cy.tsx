import React from 'react';

import { geti18nText } from '@/util';

import { GameOver } from './GameOver';

describe('<GameOver />', () => {
  it('displays the game over text', function () {
    cy.mount(<GameOver />);

    cy.contains(geti18nText('en', 'gameover.text.blackout'));
  });

  it('displays the final score', function () {
    cy.mount(<GameOver />);

    cy.contains(`${geti18nText('en', 'gameover.text.score')} 0`);
  });

  it('shows a button to start a new game', function () {
    cy.mount(<GameOver />);

    cy.get('[data-cy=new-game-button]').contains(geti18nText('en', 'gameover.button.newgame'), {
      matchCase: false,
    });
  });

  it('shows a button to return to the main menu', function () {
    cy.mount(<GameOver />);

    cy.get('[data-cy=main-menu-button]').contains(geti18nText('en', 'gameover.button.mainmenu'), {
      matchCase: false,
    });
  });
});
