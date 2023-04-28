import { Suspense, useCallback } from "react";

import { Button } from "@/components";
import { useScoreStore, useAppStateStore } from "@/stores";

import { useMatchup } from "../../api";
import { TypeEffectiveness, getAttackEffectiveness } from "../../utils/calculateEffectiveness";
import { Pokemon } from "../Pokemon";

export function Game() {
  const { data: matchup, refetch } = useMatchup({config: { suspense: true }});
  const increase = useScoreStore((state) => state.increase);
  const { end } = useAppStateStore((state) => ({end: state.endQuiz}));

  const guess = useCallback((guess: TypeEffectiveness) => {
    const correctAnswer = getAttackEffectiveness(matchup!.move, matchup!.defender);
    if (guess !== correctAnswer) {
      return end();
    }
    increase();
    refetch();
  }, [matchup, increase, end, refetch]);
  
  return (
    <div className="relative h-full grid bg-gradient-to-b from-yellow-100 from-0% via-slate-100 via-10% to-slate-300 to-30%">
      <Suspense fallback={<>Loading...</>}>
      { matchup && 
        <>
          <div className="grid">
            <Pokemon pokemon={matchup.defender} variant='defending'/>
            <Pokemon pokemon={matchup.attacker} variant='attacking'/>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-20 p-1 bg-black">
            <div className="w-full h-full p-1 bg-yellow-500 rounded-md">
              <div className="w-full h-full bg-blue-900 border-neutral-100 border-2">
                <div className="w-1/2 h-full grid items-start py-2 px-1">
                  <p className="text-slate-50 text-base"><span className="uppercase">{matchup.attacker.name}</span> used <span className="uppercase">{matchup.move.name}</span>!</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-20 p-1 bg-black">
            <div className="w-full h-full p-1 bg-violet-600 rounded-md">
              <div className="w-full h-full bg-slate-50">
                <div className="h-full grid grid-cols-[auto_auto] gap-x-1 items-center px-1 py-1">
                  <Button onClick={() => guess(TypeEffectiveness.NoEffect)} className="p-0 focus:border focus:border-solid focus:border-red-500 " text={"No Effect"}/>
                  <Button onClick={() => guess(TypeEffectiveness.NotVeryEffective)} className="p-0 focus:border focus:border-solid focus:border-red-500 " text={"Not Very Effective"}/>
                  <Button onClick={() => guess(TypeEffectiveness.Effective)} className="p-0 focus:border focus:border-solid focus:border-red-500 " text={"Effective"}/>
                  <Button onClick={() => guess(TypeEffectiveness.VeryEffective)} className="p-0 focus:border focus:border-solid focus:border-red-500 " text={"Super Effective"}/>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      </Suspense>
    </div>
  );
}