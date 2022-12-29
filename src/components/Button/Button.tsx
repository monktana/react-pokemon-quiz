import './Button.css'

type ButtonVariant = 'menu'

export type ButtonProps = {
  text: string
  variant: ButtonVariant,
  onClick?: () => void
}

export function Button({text, variant, onClick}: ButtonProps) {
  return (
    <button className={`button ${variant}`} onClick={onClick}>{text}</button>
  )
}