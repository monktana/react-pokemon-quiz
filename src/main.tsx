import { ColorModeScript, theme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from '@/providers';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </AppProvider>
  </React.StrictMode>
);
