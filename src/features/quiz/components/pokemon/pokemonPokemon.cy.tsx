import React from 'react';

import { Pokemon } from './pokemon'

describe('<Pokemon />', () => {
  it('renders', () => {
    cy.mount(<Pokemon />)
  })
})