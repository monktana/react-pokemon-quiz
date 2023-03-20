import { Suspense, useCallback } from "react";

import { useAppStateStore, useScoreStore } from "@/stores";
import { getEnumKeys } from "@/utils";

import { useMatchup } from "../../api";
import { getAttackEffectiveness, TypeEffectiveness } from "../../utils/calculateEffectiveness";
import { DecisionButton } from "../DecisionButton";
import { Pokemon } from "../pokemon";
import "./game.css";

const effectivenessKeys = getEnumKeys(TypeEffectiveness);
const effectivenessTexts = {
  "NoEffect": "No Effect",
  "NotVeryEffective": "Not effective",
  "Effective": "Effective",
  "VeryEffective": "Super effective",
}

export function Game() {
  const { data: matchup, refetch } = useMatchup();
  const endGame = useAppStateStore((state) => state.endQuiz);
  const increaseScore = useScoreStore((state) => state.increase);

  const loadNextRound = useCallback(() => {
    increaseScore();
    refetch();
  }, [increaseScore, refetch]);

  if (!matchup) {
    return null;
  }
  
  const effectiveness = getAttackEffectiveness(matchup.move, matchup.defender);

  return (
    <div className="game-container">
      <Suspense fallback={<>Loading...</>}>
        <div className="pokemon-section">
          <Pokemon pokemon={matchup.defender} variant='defending'/>
          <Pokemon pokemon={matchup.attacker} variant='attacking'/>
        </div>
        <div className="option-section">
          <div className="option-text-area">
            <div className="option-text">
              {`${matchup.attacker.name.toUpperCase()} uses ${matchup.move.name.toUpperCase()}`}
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
                      onClick={() => {
                        if(isCorrectDecision) {
                          loadNextRound();
                        } else {
                          endGame();
                        }}
                      }
                      variant={"menu"}
                    />
                  )
                }
              )
            }
          </div>
        </div>
      </Suspense>
    </div>
  );
}