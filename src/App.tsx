import { Container } from '@chakra-ui/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactElement, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Error, Game, GameOver, Loading, Menu, Navbar } from '@/components';
import { getBrowserLanguage, LanguageStoreProvider, useAppState } from '@/stores';

function App(): ReactElement | null {
  const { reset } = useQueryErrorResetBoundary();

  const appState = useAppState();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Error}>
      <Suspense fallback={<Loading />}>
        <LanguageStoreProvider initialLanguage={getBrowserLanguage()}>
          <Navbar />
          <Container display="flex" alignItems="center" justifyContent="center" height="100vh">
            {appState === 'menu' && <Menu />}
            {appState === 'quiz' && <Game />}
            {appState === 'gameover' && <GameOver />}
          </Container>
        </LanguageStoreProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
