
import { createContext, PropsWithChildren } from "react"

import { LanguageKey, TextKey } from "@/hooks/i18n";
import { useLocalization } from "@/hooks/useLocalization";

type LocalizationContext = {
  getText: (language: LanguageKey, key: TextKey) => string
};

export const LocalizationContext = createContext<LocalizationContext>({
  getText: function (): string {
    throw new Error("Function not implemented.");
  }
});

type LocalizationProviderProps = PropsWithChildren<object>

export const LocalizationProvider = ({children}: LocalizationProviderProps) => {
  const Localization = useLocalization();

  return (
    <LocalizationContext.Provider value={Localization}>
      {children}
    </LocalizationContext.Provider>
  );
}