import { Container } from '@chakra-ui/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Menu, Navbar, GameOver } from '@/features/menu';
import { Game } from '@/features/quiz';

import { Error } from './components';
import { useAppStateStore } from './stores';

function App(): JSX.Element | null {
  const { reset } = useQueryErrorResetBoundary();
  
  const appState = useAppStateStore((state) => state.appState);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <Error reset={resetErrorBoundary}/>
      )}
    >
      <Navbar />
      <Container display="flex" alignItems="center" justifyContent="center" height="100vh">
        {appState === 'menu' && <Menu />}
        {appState === 'quiz' && <Game />}
        {appState === 'gameover' && <GameOver />}
      </Container>
    </ErrorBoundary>
  );
}

export default App;
