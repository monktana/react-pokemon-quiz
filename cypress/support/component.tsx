/// <reference types="cypress" />

import './commands';

import { mount } from 'cypress/react18';

import { LanguageStoreProvider, ScoreStoreProvider } from '../../src/stores';

Cypress.Commands.add('mount', (component, options = {}) => {
  const {
    languageProviderOptions = { initialLanguage: 'en' },
    scoreProviderOptions = { initialScore: 0 },
    ...mountOptions
  } = options;

  return mount(
    <LanguageStoreProvider {...languageProviderOptions}>
      <ScoreStoreProvider {...scoreProviderOptions}>{component}</ScoreStoreProvider>
    </LanguageStoreProvider>,
    mountOptions
  );
});
