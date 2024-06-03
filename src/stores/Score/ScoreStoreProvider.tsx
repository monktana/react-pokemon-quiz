import React, { PropsWithChildren } from 'react';
import { createStore, StoreApi } from 'zustand';

import { ScoreStore } from '@/stores';

export type ScoreStoreProviderProps = PropsWithChildren<{
  initialScore: number;
}>;

export const ScoreStoreContext = React.createContext<StoreApi<ScoreStore> | null>(null);

export const ScoreStoreProvider = ({ children, initialScore }: ScoreStoreProviderProps) => {
  const [store] = React.useState(() =>
    createStore<ScoreStore>()((set) => ({
      score: initialScore,
      actions: {
        increase: () => set((state) => ({ score: state.score + 1 })),
        decrease: () => set((state) => ({ score: state.score - 1 })),
        reset: () => set({ score: 0 }),
      },
    }))
  );

  return <ScoreStoreContext.Provider value={store}>{children}</ScoreStoreContext.Provider>;
};
