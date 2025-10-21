import { useState } from 'react';

interface VersionSelectorProps {
  onSelect: (version: 'dos' | 'win98') => void;
}

const VersionSelector = ({ onSelect }: VersionSelectorProps) => {
  const [hoveredVersion, setHoveredVersion] = useState<'dos' | 'win98' | null>(null);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="text-green-500 text-4xl md:text-6xl font-bold mb-4 font-mono">
            RETRO PORTFOLIO
          </div>
          <div className="text-green-400 text-lg md:text-xl font-mono">
            Choose your experience
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* MS-DOS Version */}
          <button
            onClick={() => onSelect('dos')}
            onMouseEnter={() => setHoveredVersion('dos')}
            onMouseLeave={() => setHoveredVersion(null)}
            className="group relative bg-black border-4 border-green-500 p-8 hover:bg-green-950 transition-all duration-300"
          >
            <div className="text-green-500 text-6xl mb-4">💻</div>
            <div className="text-green-500 text-2xl md:text-3xl font-bold mb-3 font-mono">
              MS-DOS 6.22
            </div>
            <div className="text-green-400 text-sm md:text-base mb-4 font-mono">
              Classic terminal experience
            </div>
            <div className={`text-green-600 text-xs md:text-sm font-mono transition-opacity ${hoveredVersion === 'dos' ? 'opacity-100' : 'opacity-50'}`}>
              • CRT screen effect<br />
              • ASCII graphics<br />
              • Typing animations<br />
              • Retro games: Snake & Tetris<br />
              • Authentic 1994 vibes
            </div>
            {hoveredVersion === 'dos' && (
              <div className="absolute bottom-4 left-0 right-0 text-green-500 font-mono text-sm animate-pulse">
                &gt; PRESS ENTER_
              </div>
            )}
          </button>

          {/* Windows 98 Version */}
          <button
            onClick={() => onSelect('win98')}
            onMouseEnter={() => setHoveredVersion('win98')}
            onMouseLeave={() => setHoveredVersion(null)}
            className="group relative bg-teal-700 border-4 border-gray-400 p-8 hover:bg-teal-600 transition-all duration-300"
          >
            <div className="text-6xl mb-4">🪟</div>
            <div className="text-black text-2xl md:text-3xl font-bold mb-3">
              Windows 98
            </div>
            <div className="text-gray-700 text-sm md:text-base mb-4">
              Classic desktop interface
            </div>
            <div className={`text-gray-800 text-xs md:text-sm transition-opacity ${hoveredVersion === 'win98' ? 'opacity-100' : 'opacity-70'}`}>
              • 3D windows & buttons<br />
              • Tahoma font<br />
              • Modern icons<br />
              • Classic games: Minesweeper & Solitaire<br />
              • Nostalgic 1998 design
            </div>
            {hoveredVersion === 'win98' && (
              <div className="absolute bottom-4 left-0 right-0 text-black font-bold text-sm animate-pulse">
                Click to start
              </div>
            )}
          </button>
        </div>

        <div className="text-center mt-12">
          <div className="text-gray-500 text-sm font-mono">
            💾 Your choice will be saved for next visit
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionSelector;
