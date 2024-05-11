import './commands';

import { mount } from 'cypress/react18';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    mount: typeof mount;
  }
}

Cypress.Commands.add('mount', mount);
