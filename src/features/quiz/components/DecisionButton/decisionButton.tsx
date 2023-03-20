import { Button, ButtonProps } from "@/components"

type DecisionButtonProps = {
  onClick?: (() => void)
} & ButtonProps

export function DecisionButton({onClick, text}: DecisionButtonProps) {
  return (
    <Button text={text} onClick={onClick} />
  )
}