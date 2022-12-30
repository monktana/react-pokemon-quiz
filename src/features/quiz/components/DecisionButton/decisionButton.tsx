import { useCallback } from "react"

import { Button, ButtonProps } from "@/components"

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
    <Button variant="decision" text={text} onClick={handleClick} />
  )
}