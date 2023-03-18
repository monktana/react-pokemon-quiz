import React from 'react'

import './App.css'
import { Game } from '@/features/quiz'

import { Menu } from './features/menu'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <div className="content">
      { appState === 'menu' && <Menu variant='mainmenu' />}
      { appState === 'quiz' && <Game />}
      { appState === 'gameover' && <Menu variant='gameover' />}
    </div>
  )
}

export default App
