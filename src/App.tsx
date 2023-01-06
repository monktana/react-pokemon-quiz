import React from 'react'

import './App.css'
import { Game } from '@/features/quiz'
import { AppProvider } from '@/providers/app'

import { GameBoy } from './features/gameboy/components/GameBoy'
import { Menu } from './features/menu'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <AppProvider>
      <GameBoy>
        { appState === 'menu' && <Menu variant='Main' />}
        { appState === 'quiz' && <Game />}
        { appState === 'gameover' && <Menu variant='End' />}
      </GameBoy>
    </AppProvider>
  )
}

export default App
