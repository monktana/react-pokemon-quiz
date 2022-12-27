import { PropsWithChildren, useCallback } from "react"

type DecisionButtonProps = PropsWithChildren<{
  conditionMet: boolean,
  onClick?: (() => void)
}>

export function DecisionButton({conditionMet, onClick, children}: DecisionButtonProps) {
  const handleClick = useCallback(() => {
    if (conditionMet && onClick) {
      onClick();
    }
  }, [conditionMet, onClick])

  return (
    <button onClick={handleClick}>{children}</button>
  )
}