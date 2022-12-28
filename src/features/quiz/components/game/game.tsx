import { Suspense, useCallback, useState } from "react";

import { getEnumKeys } from "@/utils";

import { useMatchup } from "../../api";
import { POKEMON_COUNT } from "../../types";
import { getAttackEffectiveness, TypeEffectiveness } from "../../utils/calculateEffectiveness";
import { DecisionButton } from "../DecisionButton";
import { Pokemon } from "../Pokemon";
import "./game.css";

const getRandomPokemonID = () => Math.floor(Math.random() * POKEMON_COUNT);
const effectivenessKeys = getEnumKeys(TypeEffectiveness);
const effectivenessTexts = {
  "NoEffect": "No Effect",
  "NotVeryEffective": "Not effective",
  "Effective": "Effective",
  "VeryEffective": "Super effective",
}

export function Game() {
  const [first, setFirst] = useState<number>(getRandomPokemonID());
  const [second, setSecond] = useState<number>(getRandomPokemonID());
  const [attacking, defending] = useMatchup({attacking: `${first}`, defending: `${second}`});

  const selectNewIDs = useCallback(() => {
    setFirst(getRandomPokemonID());
    setSecond(getRandomPokemonID());
  }, []);

  if (!attacking.data || !defending.data) {
    return null;
  }
  
  const effectiveness = getAttackEffectiveness(attacking.data, defending.data);

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <div className="pokemon-section">
          <Pokemon pokemon={defending.data} variant='defending'/>
          <Pokemon pokemon={attacking.data} variant='attacking'/>
        </div>
        <div className="option-section">
          <div className="option-text-area">
            <div className="option-text">
              {`${attacking.data.name.toUpperCase()} is attacking. What will happen?`}
            </div>
          </div>
          <div className="option-buttons">
            {
              effectivenessKeys.map(effectivenessKey => 
                (
                  <DecisionButton key={effectivenessKey} conditionMet={effectiveness === TypeEffectiveness[effectivenessKey]} onClick={selectNewIDs}>
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