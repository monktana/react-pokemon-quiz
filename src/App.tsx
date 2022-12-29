import React from 'react'

import './App.css'
import { Game } from '@/features/quiz'
import { AppProvider } from '@/providers/app'

import { MainMenu } from './features/main-menu'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);
  const startQuiz = useAppStateStore((state) => state.startQuiz);

  return (
    <AppProvider>
      { appState === 'menu' && <MainMenu startQuiz={startQuiz}/>}
      { appState === 'quiz' && <Game/>}
    </AppProvider>
  )
}

export default App
