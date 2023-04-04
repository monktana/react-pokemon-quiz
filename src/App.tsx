import React from 'react'

import { Menu } from '@/features/menu'
import { Game } from '@/features/quiz'

import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <div className='min-h-screen grid place-items-center bg-gradient-to-b from-sky-500 to-indigo-500'>
      <div className='grid place-items-center px-6 py-10 aspect-gameboy bg-indigo-900 rounded-lg'>
        <div className='relative px-6 py-6 pb-8 bg-black rounded-sm'>
          <span className='block absolute w-full h-8 inset-x-0 bottom-0 text-white text-center uppercase'>gameboy advanced sp</span>
          <div className=' min-w-[480px] aspect-gameboy border-solid rounded-sm bg-slate-100'>
            { appState === 'menu' && <Menu variant='mainmenu' /> }
            { appState === 'quiz' && <Game /> }
            { appState === 'gameover' && <Menu variant='gameover' /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
