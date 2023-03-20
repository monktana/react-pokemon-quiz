import React from 'react'

import { Game } from '@/features/quiz'

import { Menu } from './features/menu'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-500 to-indigo-500'>
      <div className='container w-1/2 aspect-gameboy border-solid border-2 border-black rounded bg-slate-100'>
        { appState === 'menu' && <Menu variant='mainmenu' />}
        { appState === 'quiz' && <Game />}
        { appState === 'gameover' && <Menu variant='gameover' />}
      </div>
    </div>
  )
}

export default App
