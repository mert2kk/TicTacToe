import Board from './Board';
import { useState } from 'react';

export default function Game() {

    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: (string | null)[]) {
        const nextHistory = [...history.slice(0, currentMove + 1),nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXIsNext(!xIsNext);
    }
    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
     }

    const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move} className='move-list-item'>
        <button className='history-button' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setXIsNext(true);
  }

 return (
  <div className="game">

     <div className="game-content">
       <div className='game-board-container'>
        <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <button className="resetButton" onClick={resetGame}>Reset Game</button>
         </div>
  </div>
      <div className="game-info">
        <h2>Steps</h2>
        <ul>{moves}</ul>
      </div>
    </div>
  </div>
);
}
