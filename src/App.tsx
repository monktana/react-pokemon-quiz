import { Box, Container } from '@chakra-ui/react';
import React from 'react'

import { Menu } from '@/features/menu'
import { Game } from '@/features/quiz'

import { Score } from './features/quiz/components/score';
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <Container centerContent>
      <Box pos="absolute" top={2} right={4}>
        <Score />
      </Box>

      <div className='grid place-items-center px-6 py-10 aspect-gameboy bg-indigo-900 rounded-lg'>
        <div className='w-[480px] aspect-gameboy border-solid rounded-sm bg-slate-100'>
          { appState === 'menu' && <Menu variant='mainmenu' /> }
          { appState === 'quiz' && <Game /> }
          { appState === 'gameover' && <Menu variant='gameover' /> }
        </div>
      </div>
    </Container>
  )
}

export default App
