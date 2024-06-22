/// <reference types="cypress" />

import './commands';

import { ChakraProvider } from '@chakra-ui/react';
import { mount } from 'cypress/react18';

import { LanguageStoreProvider, ScoreStoreProvider } from '@/stores';
import theme from '@/theme';

Cypress.Commands.add('mount', (component, options = {}) => {
  const {
    languageProviderOptions = { initialLanguage: 'en' },
    scoreProviderOptions = { initialScore: 0 },
    ...mountOptions
  } = options;

  return mount(
    <ChakraProvider theme={theme}>
      <LanguageStoreProvider {...languageProviderOptions}>
        <ScoreStoreProvider {...scoreProviderOptions}>{component}</ScoreStoreProvider>
      </LanguageStoreProvider>
    </ChakraProvider>,
    mountOptions
  );
});
