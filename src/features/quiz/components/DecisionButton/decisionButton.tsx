import { PropsWithChildren, useCallback } from "react"

import "./decisionButton.css"

type DecisionButtonProps = PropsWithChildren<{
  isCorrect: boolean,
  onClick?: (() => void)
}>

export function DecisionButton({isCorrect, onClick, children}: DecisionButtonProps) {
  const handleClick = useCallback(() => {
    if (isCorrect && onClick) {
      onClick();
    }
  }, [isCorrect, onClick])

  return (
    <button className="decisionButton" onClick={handleClick}>{children}</button>
  )
}