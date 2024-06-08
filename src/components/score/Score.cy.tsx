import React from 'react';

import { geti18nText } from '@/util';

import { Score } from './Score';

describe('<Score />', () => {
  it('displays the current score', function () {
    cy.mount(<Score />, { scoreProviderOptions: { initialScore: 2 } });

    cy.get('[data-cy=score-label]').should('have.text', geti18nText('en', 'score.label'));
    cy.get('[data-cy=score-value]').should('have.text', 2);
  });
});
