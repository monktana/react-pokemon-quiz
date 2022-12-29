import "./GameOver.css";

type GameOverProps = {
  showMenu: () => void,
  newGame: () => void
}

export function GameOver({showMenu, newGame}: GameOverProps) {
  return (
    <div className="menuContainer">
      <span className="menuText">GAME OVER</span>
      <div className="buttons">
        <button className="menuButton" onClick={newGame}>New Game</button>
        <button className="menuButton" onClick={showMenu}>Back to Menu</button>
      </div>
    </div>
  );
}