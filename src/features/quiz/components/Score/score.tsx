
type ScoreProps = {
  currentScore: number
}

export function Score({currentScore}: ScoreProps) {
  return (
    <>
      <span>{currentScore}</span>
    </>
  )
}