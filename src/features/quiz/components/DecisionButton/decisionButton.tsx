import { useCallback } from "react"

import { Button, ButtonProps } from "@/components"

import "./decisionButton.css"

type DecisionButtonProps = {
  isCorrect: boolean,
  onClick?: (() => void)
} & ButtonProps

export function DecisionButton({isCorrect, onClick, text}: DecisionButtonProps) {
  const handleClick = useCallback(() => {
    if (isCorrect && onClick) {
      onClick();
    }
  }, [isCorrect, onClick])

  return (
    <Button variant="menu" text={text} onClick={handleClick} />
  )
}