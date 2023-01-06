import { Button, ButtonProps } from "@/components"

type DecisionButtonProps = {
  onClick?: (() => void)
} & ButtonProps

export function DecisionButton({onClick, text}: DecisionButtonProps) {
  return (
    <Button variant="decision" text={text} onClick={onClick} />
  )
}