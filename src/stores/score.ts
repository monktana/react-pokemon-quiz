import { create } from "zustand";

type ScoreStore = {
  score: number,
  increase: () => void,
  decrease: () => void,
  reset: () => void,
}

export const useScoreStore = create<ScoreStore>()((set) => ({
  score: 0,
  increase: () => set((state) => ({score: state.score + 1})),
  decrease: () => set((state) => ({score: state.score - 1})),
  reset: () => set(() => ({score: 0})),
}));
