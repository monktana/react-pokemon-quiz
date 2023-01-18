import React from 'react'

import './App.css'
import { Game } from '@/features/quiz'
import { AppProvider, LocalizationProvider } from '@/providers'

import { GameBoy } from './features/gameboy/components/GameBoy'
import { Menu } from './features/menu'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <AppProvider>
      <LocalizationProvider>
        <GameBoy>
          { appState === 'menu' && <Menu variant='mainmenu' />}
          { appState === 'quiz' && <Game />}
          { appState === 'gameover' && <Menu variant='gameover' />}
        </GameBoy>
      </LocalizationProvider>
    </AppProvider>
  )
}

export default App
