import { Suspense, useCallback } from "react";

import { getEnumKeys } from "@/utils";

import { useRoundScore, useMatchup } from "../../hooks";
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
  const {increaseScore} = useRoundScore();

  const loadNextRound = useCallback(() => {
    increaseScore();
    refetch();
  }, [increaseScore, refetch]);

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
                {
                  const isCorrectDecision = effectiveness === TypeEffectiveness[effectivenessKey];

                  return (
                    <DecisionButton
                      key={effectivenessKey}
                      text={effectivenessTexts[effectivenessKey]}
                      isCorrect={isCorrectDecision}
                      onClick={loadNextRound}
                      variant={"menu"}
                    />
                  )
                }
              )
            }
          </div>
        </div>
      </Suspense>
    </>
  );
}