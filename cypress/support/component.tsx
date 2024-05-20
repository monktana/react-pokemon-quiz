/// <reference types="cypress" />

import './commands';

import { mount } from 'cypress/react18';

import { LanguageStoreProvider } from '../../src/stores';

Cypress.Commands.add('mount', (component, options) => {
  return mount(
    <LanguageStoreProvider initialLanguage="en">{component}</LanguageStoreProvider>,
    options
  );
});
