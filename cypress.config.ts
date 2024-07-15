import { defineConfig } from 'cypress';
import { devServer } from '@cypress/vite-dev-server';

export default defineConfig({
  component: {
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: 'react',
      });
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.tsx',
  },
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.preferences.default.darkTheme = true;
          launchOptions.preferences.default.intl = {
            accept_languages: 'en-US,en,de-DE,de',
            selected_languages: 'en-US,en',
          };
          return launchOptions;
        }

        if (browser.name === 'electron') {
          // launchOptions.preferences is a `BrowserWindow` `options` object
          launchOptions.preferences.darkTheme = true;
          launchOptions.preferences.intl = {
            accept_languages: 'en-US,en,de-DE,de',
            selected_languages: 'en-US,en',
          };

          return launchOptions;
        }
      });
    },
  },
  env: {
    apiUrl: 'https://api.pokequiz.me/api/v1',
  },
});
