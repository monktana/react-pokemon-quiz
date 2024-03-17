import { Container } from '@chakra-ui/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Error, Loading, Menu, Navbar, GameOver, Game } from '@/components';
import { useAppStateStore } from '@/stores';

function App(): JSX.Element | null {
  const { reset } = useQueryErrorResetBoundary();

  const appState = useAppStateStore((state) => state.appState);

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Error}>
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Container display="flex" alignItems="center" justifyContent="center" height="100vh">
          {appState === 'menu' && <Menu />}
          {appState === 'quiz' && <Game />}
          {appState === 'gameover' && <GameOver />}
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
