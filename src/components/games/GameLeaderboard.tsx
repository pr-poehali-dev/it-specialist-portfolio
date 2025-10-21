import { useEffect, useState } from 'react';

interface Score {
  game: string;
  score: number;
  date: string;
}

export default function GameLeaderboard() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const snakeScore = localStorage.getItem('snakeHighScore');
    const tetrisScore = localStorage.getItem('tetrisHighScore');
    
    const allScores: Score[] = [];
    
    if (snakeScore) {
      allScores.push({
        game: 'SNAKE',
        score: parseInt(snakeScore, 10),
        date: localStorage.getItem('snakeScoreDate') || new Date().toLocaleDateString()
      });
    }
    
    if (tetrisScore) {
      allScores.push({
        game: 'TETRIS',
        score: parseInt(tetrisScore, 10),
        date: localStorage.getItem('tetrisScoreDate') || new Date().toLocaleDateString()
      });
    }
    
    setScores(allScores.sort((a, b) => b.score - a.score));
  }, []);

  const clearScores = () => {
    if (confirm('Очистить все рекорды?')) {
      localStorage.removeItem('snakeHighScore');
      localStorage.removeItem('tetrisHighScore');
      localStorage.removeItem('snakeScoreDate');
      localStorage.removeItem('tetrisScoreDate');
      setScores([]);
    }
  };

  return (
    <div className="bg-win98-gray win98-window p-4 max-w-md">
      <div className="text-win98-black font-mono mb-4">
        <div className="text-lg mb-2 font-bold">╔═══ HALL OF FAME ═══╗</div>
      </div>
      
      {scores.length === 0 ? (
        <div className="text-win98-dark-gray font-mono text-sm text-center py-4">
          Пока нет рекордов.<br/>Сыграй в игры!
        </div>
      ) : (
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div 
              key={index}
              className="flex justify-between items-center text-win98-black font-mono text-sm win98-input p-2"
            >
              <div className="flex gap-3">
                <span className="text-win98-dark-gray">#{index + 1}</span>
                <span className="text-win98-blue font-bold">{score.game}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">{score.score}</span>
                <span className="text-win98-dark-gray text-xs">{score.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {scores.length > 0 && (
        <button
          onClick={clearScores}
          className="win98-button mt-4 w-full py-2 font-mono text-xs font-bold"
        >
          ОЧИСТИТЬ РЕКОРДЫ
        </button>
      )}
    </div>
  );
}