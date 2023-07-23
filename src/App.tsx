import { Container } from '@chakra-ui/react'

import { Menu } from '@/features/menu'
import { Game } from '@/features/quiz'

import { Score } from './features/quiz/components/score'
import { useAppStateStore } from './stores'

function App(): JSX.Element | null {
  const appState = useAppStateStore((state) => state.appState);

  return (
    <Container
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.300"
    >
      <Score pos="absolute" top={2} left={4} />
      { appState === 'menu' && <Menu /> }
      { appState === 'quiz' && <Game /> }
      { appState === 'gameover' && <Menu /> }
    </Container>
  )
}

export default App
