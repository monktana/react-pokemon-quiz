import React from 'react'

import './App.css'
import { Game } from '@/features/quiz'
import { AppProvider } from '@/providers/app'

function App(): JSX.Element | null {
  return (
    <AppProvider>
      <Game/>
    </AppProvider>
  )
}

export default App
