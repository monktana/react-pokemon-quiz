import React from 'react';

import { useCancelMatchup, usePrefetchMatchup } from '@/api';
import { useLocalization } from '@/hooks';
import { useAppStateActions, useScore, useScoreActions } from '@/stores';
import { Button } from '@/lib/shadcn/ui';

export function GameOver() {
  const { startQuiz, openMenu } = useAppStateActions();
  const score = useScore();
  const { reset } = useScoreActions();
  const { getText } = useLocalization();

  useCancelMatchup();
  usePrefetchMatchup(1);

  return (
    <div className="flex flex-row gap-2">
      <p
        data-testid="gameover-message"
        className="my-1 text-2xl text-font-800 dark:text-font-100"
      >
        {getText('gameover.text.blackout')}
      </p>
      <p
        data-testid="final-score"
        className="my-2 text-sm text-font-500 dark:text-font-300"
      >
        {getText('gameover.text.score')} {score}
      </p>
      <div className="flex flex-row gap-4 mt-8">
        <Button
          data-testid="new-game-button"
          size="lg"
          className="w-full"
          onClick={() => {
            reset();
            startQuiz();
          }}
        >
          {getText('gameover.button.newgame').toUpperCase()}
        </Button>
        <Button
          data-testid="main-menu-button"
          size="lg"
          className="w-full"
          onClick={() => {
            reset();
            openMenu();
          }}
        >
          {getText('gameover.button.mainmenu').toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
