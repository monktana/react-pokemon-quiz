export type ButtonProps = {
  text: string
  className?: string,
  onClick?: () => void
}

export function Button({className, text, onClick}: ButtonProps) {
  return (
    <div className={`relative group ${className}`}>
      <button className='font-normal text-sm bg-transparent rounded-md opacity-100' onClick={onClick}>{text}</button>
    </div>
  )
}