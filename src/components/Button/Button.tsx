export type ButtonProps = {
  text: string
  onClick?: () => void
}

export function Button({text, onClick}: ButtonProps) {
  return (
    <div className="relative group">
      <span className="block absolute w-1 h-1 top-2/4 bg-black opacity-0 group-hover:opacity-100 group-hover:animate-bounce-sideways"></span>
      <button className='p-2 font-normal text-sm bg-transparent rounded-md shadow-sm opacity-100' onClick={onClick}>{text}</button>
    </div>
  )
}