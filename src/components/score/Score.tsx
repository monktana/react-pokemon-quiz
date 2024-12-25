import React from 'react';

import { useLocalization } from '@/hooks';
import { useScore } from '@/stores';

export function Score() {
  const score = useScore();
  const { getText } = useLocalization();

  return (
    <div className="flex text-font-800 dark:text-font-100">
      <p data-testid="score-label" className="font-bold text-lg">{getText('score.label')}</p>
      <p data-testid="score-value">{score}</p>
    </div>
  );
}
