export type ButtonProps = {
  text: string
  onClick?: () => void
}

export function Button({text, onClick}: ButtonProps) {
  return (
    <button className='p-2 font-normal text-sm bg-transparent rounded-md shadow-sm opacity-100' onClick={onClick}>{text}</button>
  )
}