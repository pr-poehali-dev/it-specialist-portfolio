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
    <div className="bg-black border-2 border-dos-green p-4 rounded-lg max-w-md">
      <div className="text-dos-green font-mono mb-4">
        <div className="text-lg mb-2">╔═══ HALL OF FAME ═══╗</div>
      </div>
      
      {scores.length === 0 ? (
        <div className="text-dos-green-dark font-mono text-sm text-center py-4">
          Пока нет рекордов.<br/>Сыграй в игры!
        </div>
      ) : (
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div 
              key={index}
              className="flex justify-between items-center text-dos-green font-mono text-sm border border-dos-green/30 p-2"
            >
              <div className="flex gap-3">
                <span className="text-dos-green-dark">#{index + 1}</span>
                <span className="text-yellow-400">{score.game}</span>
              </div>
              <div className="flex gap-3">
                <span>{score.score}</span>
                <span className="text-dos-green-dark text-xs">{score.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {scores.length > 0 && (
        <button
          onClick={clearScores}
          className="mt-4 w-full py-2 border border-dos-green text-dos-green hover:bg-dos-green hover:text-black font-mono text-xs transition-colors"
        >
          ОЧИСТИТЬ РЕКОРДЫ
        </button>
      )}
    </div>
  );
}
