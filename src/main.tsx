import { ColorModeScript, theme } from '@chakra-ui/react';
import * as Sentry from "@sentry/react";
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from '@/providers';

import App from './App';
import { SENTRY_DSN } from './config';

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost"],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </AppProvider>
  </React.StrictMode>
);
