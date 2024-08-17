import '@/lib/sentry';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from '@/providers';
import { getBrowserLanguage } from '@/util';

import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider initialLanguage={getBrowserLanguage()}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
