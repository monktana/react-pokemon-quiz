import { useEffect, useState } from "react";

import { getPokemon, usePokemon } from "../../api";
import { Pokemon } from "../../types";
import { Pokemon as PokemonComponent } from "../pokemon";

export function Game() {
  const pokemonQuery = usePokemon({id: 1});
  const [pokemon, setPokemon] = useState<Pokemon>();
  
  const fetchData = () => {
    getPokemon(1).then(response => setPokemon(response));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (pokemonQuery.isLoading) {
    return (
      <>Loading</>
    )
  }

  if (pokemonQuery.isError) {
    return (
      <>{pokemonQuery.error!}</>
    )
  }

  return (
    <>    
      <PokemonComponent pokemon={pokemonQuery.data!} />
    </>
  );
}