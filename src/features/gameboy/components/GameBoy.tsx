import { PropsWithChildren } from 'react'
import './GameBoy.css'

type GameBoyProps = PropsWithChildren<{
  placeholder?: string
}>

export function GameBoy({children}: GameBoyProps) {
  return (
    <div className="gameboy-container">
      <div className="top-half">
        <div className="screen-dot"></div>
        <div className="screen-dot"></div>
        <div className="screen-dot"></div>
        <div className="screen-dot"></div>
        <div className="screen-container">
          <div className="screen-headline">
            <span>GAMEBOY ADVANCE SP</span>
          </div>
          <div className="screen">
            {children}
          </div>
        </div>
      </div>
      <div className="bottom-half">
        <div className="controlls-container">
          <div className="brightness"></div>
          <div className="cross"></div>
          <div className="buttons-a-b"></div>
          <div className="buttons-start-select"></div>
        </div>
      </div>
    </div>
  )
}