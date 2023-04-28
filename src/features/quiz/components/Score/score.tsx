type ScoreProps = {
  currentScore: number,
  className?: string,
}

export function Score({currentScore, className}: ScoreProps) {
  return (
    <div className={`${className} text-base font-normal text-left text-slate-50`}>
      <span className="underline decoration-slate-50 decoration-solid decoration-2 font-semibold after:content-[':'] after:no-underline">Score</span>
      <span className="ml-2 text-lg font-bold">{currentScore}</span>
    </div>
  )
}