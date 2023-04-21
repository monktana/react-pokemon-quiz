import { Suspense } from "react";


import { useMatchup } from "../../api";
import { Pokemon } from "../Pokemon";

export function Game() {
  const { data: matchup } = useMatchup();

  if (!matchup) {
    return null;
  }
  
  return (
    <div className="relative h-full grid bg-gradient-to-b from-yellow-100 from-0% via-slate-100 via-10% to-slate-300 to-30%">
      <Suspense fallback={<>Loading...</>}>
        <div className="grid">
          <Pokemon pokemon={matchup.defender} variant='defending'/>
          <Pokemon pokemon={matchup.attacker} variant='attacking'/>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-20 p-1 bg-black">
          <div className="w-full h-full p-1 bg-yellow-500 rounded-md">
            <div className="w-full h-full bg-blue-900 border-neutral-100 border-2">
              <div className="w-1/2 h-full grid items-center pl-1">
                <span className="text-slate-50 text-base uppercase">{matchup.attacker.name} uses {matchup.move.name}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-20 p-1 bg-black">
          <div className="w-full h-full p-1 bg-violet-600 rounded-md">
            <div className="w-full h-full bg-slate-50">
              <div className="h-full grid grid-cols-2 grid-rows-2 items-center p-1">
                <span className="text-base uppercase">Button 1</span>
                <span className="text-base uppercase">Button 2</span>
                <span className="text-base uppercase">Button 3</span>
                <span className="text-base uppercase">Button 4</span>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}