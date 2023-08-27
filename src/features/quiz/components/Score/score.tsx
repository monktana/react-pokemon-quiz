import { HStack, Stat, StatProps, StatLabel, StatNumber } from "@chakra-ui/react";
import { useContext } from "react";

import { LocalizationContext } from "@/providers";
import { useLanguageStore, useScoreStore } from "@/stores";


export function Score(props: StatProps) {
  const score = useScoreStore((state) => state.score);
  const language = useLanguageStore((state) => state.language);
  const Localization = useContext(LocalizationContext);
  
  return (
    <Stat {...props}>
      <HStack>
        <StatLabel color="font.500">{Localization.getText(language, "score.label")}</StatLabel>
        <StatNumber color="font.100">{score}</StatNumber>
      </HStack>
    </Stat>
  )
}