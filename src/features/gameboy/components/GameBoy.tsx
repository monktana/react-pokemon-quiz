import './GameBoy.css'

export function GameBoy() {
  return (
    <div className="gameboy-container">
      <div className="top-half">
        <div className="screen-container">
          <div className="screen-headline">
            <span>GAMEBOY ADVANCE SP</span>
          </div>
          <div className="screen"></div>
        </div>
      </div>
      <div className="bottom-half">
        <div className="controlls-container">
          <div className="cross"></div>
          <div className="buttons-a-b"></div>
          <div className="buttons-start-select"></div>
        </div>
      </div>
    </div>
  )
}