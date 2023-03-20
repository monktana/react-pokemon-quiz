import React from 'react'
import ReactDOM from 'react-dom/client'

import { AppProvider, LocalizationProvider } from '@/providers'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </AppProvider>
  </React.StrictMode>
)
