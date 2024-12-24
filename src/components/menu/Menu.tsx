import React from 'react';

import { usePrefetchMatchup } from '@/api';
import { useLocalization } from '@/hooks';
import { useAppStateActions, useScoreActions } from '@/stores';
import { Button } from '@/lib/shadcn/ui/button';

// const animationKeyframes = frames`
//   0% { transform: rotate(0) }
//   10% { transform: rotate(-25deg) }
//   30% { transform: rotate(17deg) }
//   60% { transform: rotate(-10deg) }
//   80% { transform: rotate(5deg) }
//   90% { transform: rotate(0) }
//   100% { transform: rotate(0) }
// `;
//
// const animation = `${animationKeyframes} 4s ease-in-out infinite`;

export function Menu() {
  const { startQuiz } = useAppStateActions();
  const { reset } = useScoreActions();
  const { getText } = useLocalization();

  usePrefetchMatchup(1);

  const startGame = () => {
    reset();
    startQuiz();
  };

  return (
    <div className="flex flex-row gap-2">
      <div
        data-testid="pokeball"
        className="relative w-12 h-12 rounded-full border-4 border-black bg-gradient-to-r from-red-500 to-red-500"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-black"
        />
      </div>
      <Button
        data-testid="start-game-button"
        className="mt-8"
        onClick={startGame}
      >
        {getText('mainmenu.button.newgame').toUpperCase()}
      </Button>
    </div>
  );
}
