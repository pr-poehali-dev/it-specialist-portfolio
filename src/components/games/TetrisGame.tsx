import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '@/components/ui/icon';

type Cell = 0 | 1;
type Board = Cell[][];
type Tetromino = number[][];

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;

const TETROMINOS: { [key: string]: { shape: Tetromino; color: string } } = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' },
};

const TETROMINO_KEYS = Object.keys(TETROMINOS);

export default function TetrisGame() {
  const [board, setBoard] = useState<Board>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<{ shape: Tetromino; x: number; y: number; color: string } | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const dropIntervalRef = useRef<number | null>(null);

  const playBeep = (frequency: number, duration: number) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'square';
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const getRandomTetromino = useCallback(() => {
    const key = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
    const { shape, color } = TETROMINOS[key];
    return {
      shape,
      color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
      y: 0,
    };
  }, []);

  const checkCollision = useCallback((piece: typeof currentPiece, board: Board, offsetX = 0, offsetY = 0): boolean => {
    if (!piece) return false;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x + offsetX;
          const newY = piece.y + y + offsetY;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const mergePieceToBoard = useCallback((piece: typeof currentPiece, board: Board): Board => {
    if (!piece) return board;
    
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] && piece.y + y >= 0) {
          newBoard[piece.y + y][piece.x + x] = 1;
        }
      }
    }
    
    return newBoard;
  }, []);

  const clearLines = useCallback((board: Board): { newBoard: Board; linesCleared: number } => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell === 1)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    return { newBoard, linesCleared };
  }, []);

  const rotatePiece = useCallback((piece: typeof currentPiece): Tetromino => {
    if (!piece) return [];
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return rotated;
  }, []);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || !isPlaying || gameOver) return;
    
    if (!checkCollision(currentPiece, board, dx, dy)) {
      setCurrentPiece({ ...currentPiece, x: currentPiece.x + dx, y: currentPiece.y + dy });
      if (dx !== 0) playBeep(400, 30);
    }
  }, [currentPiece, board, checkCollision, isPlaying, gameOver]);

  const rotate = useCallback(() => {
    if (!currentPiece || !isPlaying || gameOver) return;
    
    const rotated = rotatePiece(currentPiece);
    const rotatedPiece = { ...currentPiece, shape: rotated };
    
    if (!checkCollision(rotatedPiece, board)) {
      setCurrentPiece(rotatedPiece);
      playBeep(600, 30);
    }
  }, [currentPiece, board, checkCollision, rotatePiece, isPlaying, gameOver]);

  const drop = useCallback(() => {
    if (!currentPiece || !isPlaying || gameOver) return;
    
    if (!checkCollision(currentPiece, board, 0, 1)) {
      setCurrentPiece({ ...currentPiece, y: currentPiece.y + 1 });
    } else {
      const newBoard = mergePieceToBoard(currentPiece, board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      if (linesCleared > 0) {
        playBeep(800, 100);
        setLines(prev => prev + linesCleared);
        setScore(prev => prev + linesCleared * 100 * level);
        setLevel(Math.floor((lines + linesCleared) / 10) + 1);
      }
      
      setBoard(clearedBoard);
      const newPiece = getRandomTetromino();
      
      if (checkCollision(newPiece, clearedBoard)) {
        setGameOver(true);
        setIsPlaying(false);
        playBeep(200, 300);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('tetrisHighScore', score.toString());
        }
      } else {
        setCurrentPiece(newPiece);
        playBeep(300, 30);
      }
    }
  }, [currentPiece, board, checkCollision, mergePieceToBoard, clearLines, getRandomTetromino, isPlaying, gameOver, score, level, lines, highScore]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || !isPlaying || gameOver) return;
    
    let dropDistance = 0;
    while (!checkCollision(currentPiece, board, 0, dropDistance + 1)) {
      dropDistance++;
    }
    
    setCurrentPiece({ ...currentPiece, y: currentPiece.y + dropDistance });
    playBeep(500, 50);
    setTimeout(() => drop(), 50);
  }, [currentPiece, board, checkCollision, drop, isPlaying, gameOver]);

  const resetGame = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(getRandomTetromino());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setIsPlaying(true);
  }, [getRandomTetromino]);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('tetrisHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const speed = Math.max(100, 800 - (level - 1) * 50);
    dropIntervalRef.current = window.setInterval(drop, speed);

    return () => {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
      }
    };
  }, [drop, isPlaying, gameOver, level]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          rotate();
          break;
        case 'Enter':
          e.preventDefault();
          hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotate, hardDrop, isPlaying, gameOver]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isPlaying || gameOver) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (Math.max(absDeltaX, absDeltaY) < 30) {
      rotate();
      touchStartRef.current = null;
      return;
    }

    if (absDeltaX > absDeltaY) {
      movePiece(deltaX > 0 ? 1 : -1, 0);
    } else if (deltaY > 0) {
      hardDrop();
    }

    touchStartRef.current = null;
  };

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] && currentPiece.y + y >= 0) {
            displayBoard[currentPiece.y + y][currentPiece.x + x] = 1;
          }
        }
      }
    }
    
    return displayBoard;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black border-2 border-dos-green rounded-lg">
      <div className="grid grid-cols-3 gap-4 w-full max-w-[200px] text-dos-green font-mono text-xs">
        <div>SCORE<br/>{score}</div>
        <div>LEVEL<br/>{level}</div>
        <div>LINES<br/>{lines}</div>
      </div>

      <div
        className="relative border-2 border-dos-green bg-black touch-none"
        style={{
          width: BOARD_WIDTH * CELL_SIZE,
          height: BOARD_HEIGHT * CELL_SIZE,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {renderBoard().map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`absolute border border-dos-green/20 ${cell ? 'bg-dos-green' : ''}`}
              style={{
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-dos-green font-mono text-center">
              <div className="text-xl mb-2">GAME OVER</div>
              <div className="text-sm">SCORE: {score}</div>
              <div className="text-sm">HIGH: {highScore}</div>
              {score === highScore && score > 0 && (
                <div className="text-sm text-yellow-400 mt-1">NEW RECORD!</div>
              )}
            </div>
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-dos-green font-mono text-center text-sm">
              READY?
            </div>
          </div>
        )}
      </div>

      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-4 py-2 bg-dos-green text-black font-mono text-sm hover:bg-dos-green/80 transition-colors rounded"
      >
        <Icon name="Play" size={16} />
        {gameOver ? 'RETRY' : 'START'}
      </button>

      <div className="text-dos-green-dark font-mono text-xs text-center max-w-[200px]">
        {isPlaying ? '← → move, ↑/tap rotate, ↓ drop' : 'Classic Tetris'}
      </div>
      
      <div className="text-dos-green font-mono text-xs">HIGH SCORE: {highScore}</div>
    </div>
  );
}
