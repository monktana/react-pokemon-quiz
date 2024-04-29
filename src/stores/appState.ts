import { create } from 'zustand';

type AppState = 'menu' | 'quiz' | 'gameover';

type AppStateStore = {
  appState: AppState;
  actions: {
    startQuiz: () => void;
    endQuiz: () => void;
    openMenu: () => void;
  };
};

const useAppStateStore = create<AppStateStore>()((set) => ({
  appState: 'menu',
  actions: {
    startQuiz: () => set({ appState: 'quiz' }),
    endQuiz: () => set({ appState: 'gameover' }),
    openMenu: () => set({ appState: 'menu' }),
  },
}));

export const useAppState = () => useAppStateStore((state) => state.appState);
export const useAppStateActions = () => useAppStateStore((state) => state.actions);
