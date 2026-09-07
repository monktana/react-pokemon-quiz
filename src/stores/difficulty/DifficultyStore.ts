import { useContext } from 'react';
import { useStore } from 'zustand';

import { DifficultyStoreContext } from '@/stores';

export type DifficultyMode = 'simple' | 'expert';

export type DifficultyStore = {
  mode: DifficultyMode;
  actions: {
    setMode: (mode: DifficultyMode) => void;
  };
};

const useDifficultyStore = (selector: (state: DifficultyStore) => unknown) => {
  const store = useContext(DifficultyStoreContext);
  if (!store) {
    throw new Error('Missing DifficultyStoreProvider');
  }
  return useStore(store, selector);
};

export const useDifficultyMode = () =>
  useDifficultyStore((state) => state.mode) as DifficultyStore['mode'];

export const useDifficultyActions = () =>
  useDifficultyStore((state) => state.actions) as DifficultyStore['actions'];
