
import { Suspense, useCallback, useState } from "react";

import { useMatchup } from "../../api";
import { POKEMON_COUNT } from "../../types";
import { getAttackEffectiveness, TypeEffectiveness } from "../../utils/calculateEffectiveness";
import { Pokemon } from "../pokemon";

const getRandomPokemonID = () => Math.floor(Math.random() * POKEMON_COUNT);

export function Game() {
  const [first, setFirst] = useState<number>(getRandomPokemonID());
  const [second, setSecond] = useState<number>(getRandomPokemonID());
  const [attacking, defending] = useMatchup({attacking: `${first}`, defending: `${second}`});

  const selectNewIDs = useCallback(() => {
    setFirst(getRandomPokemonID());
    setSecond(getRandomPokemonID());
  }, []);

  if (attacking.isLoading || defending.isLoading) {
    return (
      <>Loading</>
    )
  }

  if (!attacking.data || !defending.data) {
    return null;
  }

  
  const effectiveness = getAttackEffectiveness(attacking.data, defending.data);

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <span>attacking</span><Pokemon pokemon={attacking.data}/>
        <br/>
        <span>defending</span><Pokemon pokemon={defending.data}/>
        <button onClick={() => {effectiveness === TypeEffectiveness.NoEffect && selectNewIDs()}}>No Effect</button>
        <button onClick={() => {effectiveness === TypeEffectiveness.NotVeryEffective && selectNewIDs()}}>Not Very Effective</button>
        <button onClick={() => {effectiveness === TypeEffectiveness.Effective && selectNewIDs()}}>Effective</button>
        <button onClick={() => {effectiveness === TypeEffectiveness.VeryEffective && selectNewIDs()}}>Very Effective</button>
      </Suspense>
    </>
  );
}