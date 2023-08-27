import { create } from "zustand";

import { LanguageKey } from "@/hooks/useLocalization";

type LanguageStore = {
  language: LanguageKey,
  setLanguage: (language: LanguageKey) => void,
}

export const useLanguageStore = create<LanguageStore>()((set) => ({
  language: "en",
  setLanguage: (language) => set(() => ({language})),
}));
