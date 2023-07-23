import { Container } from '@chakra-ui/react';

import { Menu } from '@/features/menu'
import { Game } from '@/features/quiz'

import { Score } from './features/quiz/components/score';
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <Container minH="100vh" centerContent justifyContent="center">
      <Score pos="absolute" top={2} left={4} />
      { appState === 'menu' && <Menu /> }
      { appState === 'quiz' && <Game /> }
      { appState === 'gameover' && <Menu /> }
    </Container>
  )
}

export default App
