import React from 'react'

import './App.css'
import { Game } from '@/features/quiz'
import { AppProvider } from '@/providers/app'

import { GameOver } from './features/game-over'
import { GameBoy } from './features/gameboy/components/GameBoy'
import { MainMenu } from './features/main-menu'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);
  const startQuiz = useAppStateStore((state) => state.startQuiz);
  const openMenu = useAppStateStore((state) => state.openMenu);

  return (
    <AppProvider>
      <GameBoy>
        { appState === 'menu' && <MainMenu startQuiz={startQuiz}/>}
        { appState === 'quiz' && <Game />}
        { appState === 'gameover' && <GameOver showMenu={openMenu} newGame={startQuiz}/>}
      </GameBoy>
    </AppProvider>
  )
}

export default App
