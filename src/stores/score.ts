import { create } from 'zustand';

type ScoreStore = {
  score: number;
  actions: {
    increase: () => void;
    decrease: () => void;
    reset: () => void;
  };
};

const useScoreStore = create<ScoreStore>()((set) => ({
  score: 0,
  actions: {
    increase: () => set((state) => ({ score: state.score + 1 })),
    decrease: () => set((state) => ({ score: state.score - 1 })),
    reset: () => set({ score: 0 }),
  },
}));

export const useScore = () => useScoreStore((state) => state.score);
export const useScoreActions = () => useScoreStore((state) => state.actions);
