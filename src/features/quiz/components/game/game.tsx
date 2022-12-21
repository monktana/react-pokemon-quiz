import { useEffect, useState } from "react";

import { getPokemon } from "../../api";
import { Pokemon } from "../../types";

export function Game() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  
  const fetchData = () => {
    getPokemon(1).then(response => setPokemon(response));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>    
      {
        pokemon 
        ? <>Loading</> 
        : <>pokemon.name</>
      }
    </>

  );
}