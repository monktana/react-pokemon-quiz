import React from 'react';

import { Move, Pokemon } from '@/api/schema';
import { getResourceName } from '@/components';
import { useLocalization } from '@/hooks';
import { useLanguage } from '@/stores';
import { Tag } from '@/components/tag';

type AttackProps = {
  pokemon: Pokemon;
  move: Move;
};

export function Question({ pokemon: attacker, move }: AttackProps) {
  const language = useLanguage();
  const { getTemplatedText } = useLocalization();

  return (
    <div
      data-testid="question"
      className={`flex flex-col gap-1 items-center p-2 w-full rounded-md text-font-800 border-1 border-border-500 bg-background-200 dark:text-font-100 dark:border-border-100 dark:bg-background-800`}
    >
      <div className="flex gap-2 text-xl">
        {getTemplatedText(
          'game.question.effectiveness',
          <p key={attacker.species!.name}>
            {getResourceName(attacker.species!.names!, language)!}
          </p>,
          <Tag key={move.type!.name}>
            {getResourceName(move.type!.names!, language)}
          </Tag>
        )}
      </div>
    </div>
  );
}
