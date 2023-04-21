export type ButtonProps = {
  text: string
  className?: string,
  onClick?: () => void
}

export function Button({className, text, onClick}: ButtonProps) {
  return (
    <div className={`relative group p-2 ${className}`}>
      <span className="block absolute w-1 h-1 top-2/4 bg-black opacity-0 group-hover:opacity-100 group-hover:animate-bounce-sideways"></span>
      <button className='font-normal text-sm bg-transparent rounded-md opacity-100' onClick={onClick}>{text}</button>
    </div>
  )
}