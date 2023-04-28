import React from 'react'

import { Menu } from '@/features/menu'
import { Game } from '@/features/quiz'

import { Score } from './features/quiz/components/Score';
import { useAppStateStore, useScoreStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);
  const score = useScoreStore((state) => state.score);

  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-b from-sky-500 to-indigo-500'>
      <Score className='absolute top-2 right-4' currentScore={score}/>
      <div className='grid place-items-center px-6 py-10 aspect-gameboy bg-indigo-900 rounded-lg'>
        <div className='relative px-6 py-6 pb-8 bg-black rounded-sm'>
          <span className='block absolute w-full h-8 inset-x-0 bottom-0 text-white text-center uppercase'>gameboy advanced sp</span>
          <div className='w-[480px] aspect-gameboy border-solid rounded-sm bg-slate-100'>
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
