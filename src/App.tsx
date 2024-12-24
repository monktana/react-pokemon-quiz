import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { Error, Loading, Menu, Navbar } from '@/components';
// import { useAppState } from '@/stores';

export const App = () => {
  const { reset } = useQueryErrorResetBoundary();

  // const appState = useAppState();

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError }) => <Error reset={resetError} />}
    >
      <Suspense fallback={<Loading />}>
        <Navbar />
        <div className="flex items-center justify-center h-full">
          <Menu />
          {/*{appState === 'menu' && <Menu />}*/}
          {/*{appState === 'quiz' && <Game />}*/}
          {/*{appState === 'gameover' && <GameOver />}*/}
        </div>
      </Suspense>
    </Sentry.ErrorBoundary>
  );
};
