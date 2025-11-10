import Square from './Square';

interface BoardProps {
    xIsNext: boolean;
    squares: (string | null)[];
    onPlay: (nextSquares: (string | null)[]) => void;
}
export default function Board({ xIsNext,squares,onPlay }: BoardProps) {

  function handleClick(i: number) {
    if (squares[i] || checkWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      
      nextSquares[i] = "X";

    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function checkWinner(squares: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //checking all winning combinations 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];//take three indices from lines
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
      else if (squares.every(square => square !== null)) {
        return "(Draw)";
      }
    }
    return null;
  }

  const winner = checkWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const winnerInfo = checkWinner(squares);

  return (
    <div className={`board ${winnerInfo ? 'winner' : ''}`}>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}