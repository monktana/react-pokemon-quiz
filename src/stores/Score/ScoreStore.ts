import { useContext } from 'react';
import { useStore } from 'zustand';

import { ScoreStoreContext } from '@/stores';

export type ScoreStore = {
  score: number;
  actions: {
    increase: () => void;
    decrease: () => void;
    reset: () => void;
  };
};

const useScoreStore = (selector: (state: ScoreStore) => unknown) => {
  const store = useContext(ScoreStoreContext);
  if (!store) {
    throw new Error('Missing ScoreStoreProvider');
  }
  return useStore(store, selector);
};

export const useScore = () => useScoreStore((state) => state.score) as ScoreStore['score'];
export const useScoreActions = () =>
  useScoreStore((state) => state.actions) as ScoreStore['actions'];
