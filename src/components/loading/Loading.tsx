import React from 'react';
import { Skeleton } from '@/lib/shadcn/ui';

export const Loading = () => {
  return (
    <div data-testid="loading-container" className="flex flex-row w-360px mx-auto my-auto">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-2 gap-2 p-2 w-full rounded-md bg-background-200 dark:bg-background-800">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
