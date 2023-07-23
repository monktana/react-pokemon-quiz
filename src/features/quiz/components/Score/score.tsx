import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import { useContext } from "react";

import { LocalizationContext } from "@/providers";
import { useScoreStore } from "@/stores";


export function Score() {
  const score = useScoreStore((state) => state.score);
  const Localization = useContext(LocalizationContext);
  
  return (
    <StatGroup>
      <Stat>
        <StatLabel>{Localization.getText("en", "score.label")}</StatLabel>
        <StatNumber>{score}</StatNumber>
      </Stat>
    </StatGroup>
  )
}