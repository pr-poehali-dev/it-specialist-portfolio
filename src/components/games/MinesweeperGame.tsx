import { useState, useCallback, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

const GRID_SIZE = 10;
const MINE_COUNT = 15;
const CELL_SIZE = 30;

export default function MinesweeperGame() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(MINE_COUNT);
  const [isPlaying, setIsPlaying] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('minesweeper_highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const createBoard = useCallback(() => {
    const newBoard: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    );

    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (
                newRow >= 0 &&
                newRow < GRID_SIZE &&
                newCol >= 0 &&
                newCol < GRID_SIZE &&
                newBoard[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].adjacentMines = count;
        }
      }
    }

    return newBoard;
  }, []);

  const resetGame = useCallback(() => {
    setBoard(createBoard());
    setGameOver(false);
    setGameWon(false);
    setFlagsLeft(MINE_COUNT);
    setIsPlaying(true);
    setRevealedCount(0);
  }, [createBoard]);

  const revealCell = useCallback((row: number, col: number) => {
    if (gameOver || gameWon || !isPlaying) return;

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => r.map(c => ({ ...c })));
      const cell = newBoard[row][col];

      if (cell.isRevealed || cell.isFlagged) return prevBoard;

      if (cell.isMine) {
        newBoard.forEach(r => r.forEach(c => {
          if (c.isMine) c.isRevealed = true;
        }));
        setGameOver(true);
        setIsPlaying(false);
        return newBoard;
      }

      const reveal = (r: number, c: number) => {
        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return;
        const current = newBoard[r][c];
        if (current.isRevealed || current.isFlagged || current.isMine) return;

        current.isRevealed = true;
        setRevealedCount(prev => prev + 1);

        if (current.adjacentMines === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              reveal(r + i, c + j);
            }
          }
        }
      };

      reveal(row, col);

      const totalCells = GRID_SIZE * GRID_SIZE;
      const revealedCells = newBoard.flat().filter(c => c.isRevealed).length;
      if (revealedCells === totalCells - MINE_COUNT) {
        setGameWon(true);
        setIsPlaying(false);
        if (revealedCells > highScore) {
          setHighScore(revealedCells);
          localStorage.setItem('minesweeper_highscore', revealedCells.toString());
        }
      }

      return newBoard;
    });
  }, [gameOver, gameWon, isPlaying, highScore]);

  const toggleFlag = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameWon || !isPlaying) return;

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(r => r.map(c => ({ ...c })));
      const cell = newBoard[row][col];

      if (cell.isRevealed) return prevBoard;

      if (cell.isFlagged) {
        cell.isFlagged = false;
        setFlagsLeft(prev => prev + 1);
      } else if (flagsLeft > 0) {
        cell.isFlagged = true;
        setFlagsLeft(prev => prev - 1);
      }

      return newBoard;
    });
  }, [gameOver, gameWon, isPlaying, flagsLeft]);

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.adjacentMines === 0) return '';
    return cell.adjacentMines.toString();
  };

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return '';
    const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-600', 'text-yellow-600', 'text-pink-600', 'text-gray-600', 'text-black'];
    return colors[cell.adjacentMines] || '';
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 win98-window">
      <div className="flex justify-between items-center w-full max-w-[300px]">
        <div className="win98-input px-2 py-1 bg-black text-red-500 font-bold">
          💣 {flagsLeft}
        </div>
        <button 
          onClick={resetGame}
          className="text-2xl"
        >
          {gameOver ? '😵' : gameWon ? '😎' : isPlaying ? '🙂' : '🙂'}
        </button>
        <div className="win98-input px-2 py-1 bg-black text-red-500 font-bold">
          ⭐ {highScore}
        </div>
      </div>

      <div className="win98-input bg-win98-gray p-1">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => revealCell(rowIndex, colIndex)}
                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                className={`
                  flex items-center justify-center text-xs font-bold
                  ${cell.isRevealed 
                    ? 'bg-win98-light-gray border border-win98-dark-gray' 
                    : 'win98-button hover:bg-win98-white'
                  }
                  ${cell.isMine && cell.isRevealed ? 'bg-red-500' : ''}
                  ${getCellColor(cell)}
                `}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>

      {gameOver && (
        <div className="text-win98-black font-bold text-center">
          💥 GAME OVER!
        </div>
      )}

      {gameWon && (
        <div className="text-win98-black font-bold text-center">
          🎉 YOU WIN!
        </div>
      )}

      <div className="text-win98-dark-gray text-xs text-center max-w-[300px]">
        {isPlaying ? 'Left click to reveal, right click to flag' : 'Click the face to start'}
      </div>
    </div>
  );
}
