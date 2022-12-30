import React from 'react'

import './App.css'
// import { Game } from '@/features/quiz'
import { AppProvider } from '@/providers/app'

import { GameBoy } from './features/gameboy/components/GameBoy'

// import { GameOver } from './features/game-over'
// import { MainMenu } from './features/main-menu'
// import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  // const appState = useAppStateStore((state) => state.appState);
  // const startQuiz = useAppStateStore((state) => state.startQuiz);
  // const openMenu = useAppStateStore((state) => state.openMenu);
  // const endQuiz = useAppStateStore((state) => state.endQuiz);

  return (
    <AppProvider>
      <GameBoy/>
      {/* { appState === 'menu' && <MainMenu startQuiz={startQuiz}/>}
      { appState === 'quiz' && <Game showMenu={openMenu} endGame={endQuiz}/>}
      { appState === 'gameover' && <GameOver showMenu={openMenu} newGame={startQuiz}/>} */}
    </AppProvider>
  )
}

export default App
