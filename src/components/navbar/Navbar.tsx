import React from 'react';

import { LanguageMenu, TypeIcon } from '@/components';
import { useLocalization } from '@/hooks';
import { Button } from '@/lib/shadcn/ui';

export function Navbar() {
  const { getText } = useLocalization();

  return (
    <div className="fixed z-overlay w-full bg-background-900 dark:bg-background-100">
      <div className="flex flex-row items-center justify-end px-2 py-2 gap-2">
        <LanguageMenu />
        <Button
          data-testid="color-mode-switch"
          aria-label={getText('navbar.color.label')}
          variant="outline"
        >
          <TypeIcon type="psychic" color="current" />
        </Button>
      </div>
    </div>
  );
}
