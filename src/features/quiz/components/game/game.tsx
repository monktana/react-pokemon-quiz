import { Suspense } from "react";


import { useMatchup } from "../../api";
import { Pokemon } from "../Pokemon";

export function Game() {
  const { data: matchup } = useMatchup();

  if (!matchup) {
    return null;
  }
  
  return (
    <div className="h-full grid bg-gradient-to-b from-yellow-100 from-0% via-slate-100 via-10% to-slate-300 to-30%">
      <Suspense fallback={<>Loading...</>}>
        <div className="grid">
          <Pokemon pokemon={matchup.defender} variant='defending'/>
          <Pokemon pokemon={matchup.attacker} variant='attacking'/>
        </div>
      </Suspense>
    </div>
  );
}