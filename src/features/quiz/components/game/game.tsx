import { Suspense } from "react";

import { getEnumKeys } from "@/utils";

import { useMatchup } from "../../hooks/useMatchup";
import { getAttackEffectiveness, TypeEffectiveness } from "../../utils/calculateEffectiveness";
import { DecisionButton } from "../DecisionButton";
import { Pokemon } from "../Pokemon";
import "./game.css";

const effectivenessKeys = getEnumKeys(TypeEffectiveness);
const effectivenessTexts = {
  "NoEffect": "No Effect",
  "NotVeryEffective": "Not effective",
  "Effective": "Effective",
  "VeryEffective": "Super effective",
}

export function Game() {
  const {attacking, defending, refetch} = useMatchup();

  if (!attacking || !defending) {
    return null;
  }
  
  const effectiveness = getAttackEffectiveness(attacking, defending);

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <div className="pokemon-section">
          <Pokemon pokemon={defending} variant='defending'/>
          <Pokemon pokemon={attacking} variant='attacking'/>
        </div>
        <div className="option-section">
          <div className="option-text-area">
            <div className="option-text">
              {`${attacking.name.toUpperCase()} is attacking. What will happen?`}
            </div>
          </div>
          <div className="option-buttons">
            {
              effectivenessKeys.map(effectivenessKey => 
                (
                  <DecisionButton key={effectivenessKey} isCorrect={effectiveness === TypeEffectiveness[effectivenessKey]} onClick={refetch}>
                    {effectivenessTexts[effectivenessKey]}
                  </DecisionButton>
                )
              )
            }
          </div>
        </div>
      </Suspense>
    </>
  );
}