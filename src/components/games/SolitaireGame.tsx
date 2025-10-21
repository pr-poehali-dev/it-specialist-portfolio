import { useState, useCallback, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type Suit = '♠' | '♥' | '♦' | '♣';
type Card = {
  suit: Suit;
  value: number;
  faceUp: boolean;
};

const suits: Suit[] = ['♠', '♥', '♦', '♣'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export default function SolitaireGame() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [waste, setWaste] = useState<Card[]>([]);
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []]);
  const [foundation, setFoundation] = useState<Card[][]>([[], [], [], []]);
  const [gameWon, setGameWon] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('solitaire_best');
    if (saved) setBestMoves(parseInt(saved));
  }, []);

  const createDeck = useCallback(() => {
    const newDeck: Card[] = [];
    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({ suit, value, faceUp: false });
      });
    });
    return newDeck.sort(() => Math.random() - 0.5);
  }, []);

  const resetGame = useCallback(() => {
    const shuffled = createDeck();
    const newTableau: Card[][] = [[], [], [], [], [], [], []];
    
    let cardIndex = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = shuffled[cardIndex++];
        if (j === i) card.faceUp = true;
        newTableau[j].push(card);
      }
    }

    setTableau(newTableau);
    setDeck(shuffled.slice(cardIndex));
    setWaste([]);
    setFoundation([[], [], [], []]);
    setGameWon(false);
    setIsPlaying(true);
    setMoves(0);
  }, [createDeck]);

  const drawCard = useCallback(() => {
    if (deck.length === 0) {
      setDeck(waste.reverse().map(card => ({ ...card, faceUp: false })));
      setWaste([]);
    } else {
      const card = deck[0];
      card.faceUp = true;
      setWaste([...waste, card]);
      setDeck(deck.slice(1));
    }
    setMoves(m => m + 1);
  }, [deck, waste]);

  const getCardDisplay = (card: Card) => {
    const isRed = card.suit === '♥' || card.suit === '♦';
    const color = isRed ? 'text-red-600' : 'text-black';
    const valueMap: { [key: number]: string } = {
      1: 'A', 11: 'J', 12: 'Q', 13: 'K'
    };
    const displayValue = valueMap[card.value] || card.value.toString();
    
    return (
      <div className={`flex flex-col items-center justify-between h-full p-1 ${color}`}>
        <div className="text-xs font-bold">{displayValue}{card.suit}</div>
        <div className="text-2xl">{card.suit}</div>
        <div className="text-xs font-bold transform rotate-180">{displayValue}{card.suit}</div>
      </div>
    );
  };

  const checkWin = useCallback((newFoundation: Card[][]) => {
    const allComplete = newFoundation.every(pile => pile.length === 13);
    if (allComplete) {
      setGameWon(true);
      setIsPlaying(false);
      if (bestMoves === 0 || moves < bestMoves) {
        setBestMoves(moves);
        localStorage.setItem('solitaire_best', moves.toString());
      }
    }
  }, [moves, bestMoves]);

  return (
    <div className="flex flex-col gap-4 p-4 win98-window overflow-x-auto">
      <div className="flex justify-between items-center min-w-[500px]">
        <div className="flex gap-2">
          <button
            onClick={drawCard}
            disabled={!isPlaying}
            className="win98-button w-16 h-20 text-2xl font-bold hover:bg-win98-light-gray disabled:opacity-50"
          >
            🂠
          </button>
          <div className="win98-input w-16 h-20 bg-white flex items-center justify-center">
            {waste.length > 0 && waste[waste.length - 1].faceUp ? (
              <div className="w-full h-full bg-white border border-win98-dark-gray">
                {getCardDisplay(waste[waste.length - 1])}
              </div>
            ) : (
              <div className="text-win98-dark-gray text-xs">Empty</div>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          {foundation.map((pile, idx) => (
            <div
              key={idx}
              className="win98-input w-14 h-20 bg-white flex items-center justify-center"
            >
              {pile.length > 0 ? (
                <div className="w-full h-full bg-white border border-win98-dark-gray">
                  {getCardDisplay(pile[pile.length - 1])}
                </div>
              ) : (
                <div className="text-4xl opacity-20">{suits[idx]}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 min-w-[500px]">
        {tableau.map((pile, idx) => (
          <div key={idx} className="flex-1 min-h-[200px]">
            <div className="win98-input bg-white h-24 flex items-center justify-center">
              {pile.length === 0 ? (
                <div className="text-win98-dark-gray text-xs">K</div>
              ) : (
                <div className="relative w-full">
                  {pile.map((card, cardIdx) => (
                    <div
                      key={cardIdx}
                      className={`absolute w-full ${card.faceUp ? 'bg-white border border-win98-dark-gray' : 'bg-blue-800 border border-white'}`}
                      style={{
                        top: cardIdx * 20,
                        height: '80px',
                        zIndex: cardIdx,
                      }}
                    >
                      {card.faceUp ? getCardDisplay(card) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                          <div className="text-white text-4xl opacity-30">🂠</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center min-w-[500px]">
        <button
          onClick={resetGame}
          className="win98-button px-4 py-2 font-bold hover:bg-win98-light-gray flex items-center gap-2"
        >
          <Icon name="Play" size={16} />
          NEW GAME
        </button>
        
        <div className="flex gap-4 text-sm">
          <div className="win98-input px-3 py-1 bg-black text-red-500 font-bold">
            Moves: {moves}
          </div>
          <div className="win98-input px-3 py-1 bg-black text-red-500 font-bold">
            Best: {bestMoves || '-'}
          </div>
        </div>
      </div>

      {gameWon && (
        <div className="text-center">
          <div className="text-win98-black font-bold text-xl mb-2">
            🎉 CONGRATULATIONS! 🎉
          </div>
          <div className="text-win98-dark-gray text-sm">
            You won in {moves} moves!
          </div>
          {moves === bestMoves && bestMoves > 0 && (
            <div className="text-win98-blue font-bold text-sm mt-1">
              NEW RECORD!
            </div>
          )}
        </div>
      )}

      <div className="text-win98-dark-gray text-xs text-center min-w-[500px]">
        Classic Klondike Solitaire - Arrange all cards in foundation piles by suit
      </div>
    </div>
  );
}
