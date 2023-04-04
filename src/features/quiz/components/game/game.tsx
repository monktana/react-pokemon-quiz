import { Suspense } from "react";


import { useMatchup } from "../../api";
import { Pokemon } from "../Pokemon";
import "./game.css";

export function Game() {
  const { data: matchup } = useMatchup();

  if (!matchup) {
    return null;
  }
  
  return (
    <div className="h-full grid bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <Suspense fallback={<>Loading...</>}>
        <div className="">
          <Pokemon pokemon={matchup.defender} variant='defending'/>
          <Pokemon pokemon={matchup.attacker} variant='attacking'/>
        </div>
      </Suspense>
    </div>
  );
}