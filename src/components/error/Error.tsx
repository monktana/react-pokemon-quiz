import React from 'react';

import { useLocalization } from '@/hooks';
import { Icon } from '@iconify/react';
import { Button } from '@/lib/shadcn/ui';

type ErrorProps = {
  reset: () => void;
};

export const Error = ({ reset }: ErrorProps) => {
  const { getText } = useLocalization();

  return (
    <div className="h-100vh" >
      <div className="flex flex-col h-full items-center justify-center">
        <Icon icon="ghost" />
        <h2 data-testid="error-header" className="mb-2 text-xl">
          {getText('error.title')}
        </h2>
        <p data-testid="error-message" className="text-font-800 dark:text-font-100">
          {getText('error.info')}
        </p>
        <Button data-testid="reset-button" className="mt-8" onClick={reset}>
          {getText('error.button')}
        </Button>
      </div>
    </div>
  );
};
