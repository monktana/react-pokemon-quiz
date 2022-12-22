
import { useCallback, useState } from "react";

import { useMatchup } from "../../api";
import { POKEMON_COUNT } from "../../types";
import { Pokemon } from "../pokemon";

const getRandomPokemonID = () => Math.floor(Math.random() * POKEMON_COUNT)

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

  return (
    <>
      <Pokemon pokemon={attacking.data}/>
      <Pokemon pokemon={defending.data}/>
      <button onClick={selectNewIDs}>next</button>
    </>
  );
}