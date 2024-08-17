import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { Container } from '@chakra-ui/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { Error, Game, GameOver, Loading, Menu, Navbar } from '@/components';
import { useAppState } from '@/stores';

export const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  const appState = useAppState();

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError }) => <Error reset={resetError} />}
    >
      <Suspense fallback={<Loading />}>
        <Navbar />
        <Container display="flex" alignItems="center" justifyContent="center" height="100vh">
          {appState === 'menu' && <Menu />}
          {appState === 'quiz' && <Game />}
          {appState === 'gameover' && <GameOver />}
        </Container>
      </Suspense>
    </Sentry.ErrorBoundary>
  );
};
