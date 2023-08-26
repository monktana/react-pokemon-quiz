import { Container } from '@chakra-ui/react';

import { GameOver } from '@/features/gameover';
import { Menu, Navbar } from '@/features/menu';
import { Game } from '@/features/quiz';

import { useAppStateStore } from './stores';

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <>
      <Navbar />
      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        { appState === 'menu' && <Menu /> }
        { appState === 'quiz' && <Game /> }
        { appState === 'gameover' && <GameOver /> }
      </Container>
    </>
  )
}

export default App
