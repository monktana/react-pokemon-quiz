import React from 'react';

import { Type } from '@/api';
import { getResourceName } from '@/components';

import { Types } from '../icons';

import { TypeTag } from './TypeTag';

describe('<TypeTag />', () => {
  Types.forEach((type) => {
    it(`displays the information of type ${type}`, function () {
      cy.fixture(`type/${type}`).then((typeFixture: Type) => {
        cy.mount(<TypeTag type={type} text={typeFixture.names!} />);

        cy.get(`[data-cy="${type}-type-tag"]`).should(
          'have.text',
          getResourceName(typeFixture.names!, 'en')
        );
        cy.get(`[data-cy="${type}-type-tag"]`).children('svg');
      });
    });
  });
});
