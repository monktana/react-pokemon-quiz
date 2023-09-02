import { create } from 'zustand';

type AppState = 'menu' | 'quiz' | 'gameover';

type AppStateStore = {
  appState: AppState;
  startQuiz: () => void;
  endQuiz: () => void;
  openMenu: () => void;
};

export const useAppStateStore = create<AppStateStore>()((set) => ({
  appState: 'menu',
  startQuiz: () => set(() => ({ appState: 'quiz' })),
  endQuiz: () => set(() => ({ appState: 'gameover' })),
  openMenu: () => set(() => ({ appState: 'menu' })),
}));
