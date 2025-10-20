import { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '@/components/ui/icon';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
  const [food, setFood] = useState<Position>({ x: 3, y: 3 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [highScore, setHighScore] = useState(0);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 7, y: 7 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPlaying(true);
  }, [generateFood]);

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

  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead: Position;

        switch (direction) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE ||
          prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
          setGameOver(true);
          setIsPlaying(false);
          playBeep(200, 300);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
          }
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          playBeep(800, 50);
          setScore(prev => prev + 10);
          setSpeed(prev => Math.max(50, prev - 5));
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [direction, isPlaying, gameOver, food, speed, generateFood, score, highScore]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection(prev => prev !== 'DOWN' ? 'UP' : prev);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection(prev => prev !== 'UP' ? 'DOWN' : prev);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isPlaying) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (Math.max(absDeltaX, absDeltaY) < 30) return;

    if (absDeltaX > absDeltaY) {
      setDirection(prev => deltaX > 0 ? (prev !== 'LEFT' ? 'RIGHT' : prev) : (prev !== 'RIGHT' ? 'LEFT' : prev));
    } else {
      setDirection(prev => deltaY > 0 ? (prev !== 'UP' ? 'DOWN' : prev) : (prev !== 'DOWN' ? 'UP' : prev));
    }

    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black border-2 border-dos-green rounded-lg">
      <div className="flex justify-between items-center w-full max-w-[300px] text-dos-green font-mono text-sm">
        <div>SCORE: {score}</div>
        <div>HIGH: {highScore}</div>
      </div>

      <div
        ref={gameAreaRef}
        className="relative border-2 border-dos-green bg-black touch-none"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-dos-green"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />
        ))}
        
        <div
          className="absolute bg-red-500 animate-pulse"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
        />

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-dos-green font-mono text-center">
              <div className="text-xl mb-2">GAME OVER</div>
              <div className="text-sm">SCORE: {score}</div>
              {score === highScore && score > 0 && (
                <div className="text-sm text-yellow-400 mt-1">NEW RECORD!</div>
              )}
            </div>
          </div>
        )}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-dos-green font-mono text-center">
              <div className="text-sm mb-2">READY?</div>
              <div className="text-xs">SWIPE OR ARROWS</div>
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

      <div className="text-dos-green-dark font-mono text-xs text-center max-w-[300px]">
        {isPlaying ? 'Swipe to move on mobile, arrows on desktop' : 'Eat red pixels, avoid walls & yourself'}
      </div>
    </div>
  );
}
