import { useCallback, useState } from "react";

export const useRoundScore = () => {
  const [roundScore, setRoundScore] = useState<number>(0);

  const increaseScore = useCallback(() => {
    setRoundScore((currentScore: number) => currentScore + 1)
  }, []);

  const decreaseScore = useCallback(() => {
    setRoundScore((currentScore: number) => currentScore - 1)
  }, []);

  const resetScore = useCallback(() => {
    setRoundScore(0)
  }, []);

  return {
    roundScore,
    increaseScore,
    decreaseScore,
    resetScore
  }
}