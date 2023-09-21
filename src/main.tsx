import { ColorModeScript, theme } from '@chakra-ui/react';
import * as Sentry from "@sentry/react";
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from '@/providers';

import App from './App';

Sentry.init({
  dsn: "https://a1b13ef884fb900bf80f6c81ba3090ce@o1160434.ingest.sentry.io/4505846438625280",
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost"],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </AppProvider>
  </React.StrictMode>
);
