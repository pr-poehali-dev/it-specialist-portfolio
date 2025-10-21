import { Card } from '@/components/ui/card';
import { asciiArt } from '@/lib/asciiArt';

interface MenuItems {
  about: string;
  experience: string;
  skills: string;
  portfolio: string;
  game: string;
  contacts: string;
}

interface MainMenuProps {
  welcome: string;
  name: string;
  experience: string;
  menu: MenuItems;
  prompt: string;
  onSectionClick: (section: string) => void;
  version?: 'dos' | 'win98';
}

const MainMenu = ({ welcome, name, experience, menu, prompt, onSectionClick, version = 'win98' }: MainMenuProps) => {
  const isDos = version === 'dos';
  
  const textPrimary = isDos ? 'text-dos-green' : 'text-win98-black';
  const textSecondary = isDos ? 'text-dos-green-dark' : 'text-win98-blue';
  const textMuted = isDos ? 'text-dos-green-dark' : 'text-win98-dark-gray';
  const windowClass = isDos ? 'border-2 border-dos-green bg-dos-gray font-mono' : 'win98-window';
  const buttonClass = isDos ? 'border-2 border-dos-green bg-dos-black font-mono' : 'win98-button';
  const buttonHover = isDos ? 'hover:bg-dos-gray hover:text-dos-green' : 'hover:bg-win98-light-gray';
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className={`${textPrimary} text-3xl font-bold ${isDos ? 'font-mono' : ''}`}>{welcome}</div>
        <div className={`${textSecondary} text-xl font-semibold ${isDos ? 'font-mono' : ''}`}>{name}</div>
        <div className={`${textPrimary} ${isDos ? 'font-mono' : ''}`}>{experience}</div>
      </div>
      
      <div className="flex gap-8 items-start">
        <div className={`${windowClass} p-4 space-y-2 flex-1`}>
          <button 
            className={`${buttonClass} w-full text-left px-4 py-3 ${buttonHover} transition-colors`}
            onClick={() => onSectionClick('about')}
          >
            <div className={`${textPrimary} font-semibold`}>{isDos ? '[1]' : '📄'} {menu.about}</div>
          </button>
          <button 
            className={`${buttonClass} w-full text-left px-4 py-3 ${buttonHover} transition-colors`}
            onClick={() => onSectionClick('experience')}
          >
            <div className={`${textPrimary} font-semibold`}>{isDos ? '[2]' : '💼'} {menu.experience}</div>
          </button>
          <button 
            className={`${buttonClass} w-full text-left px-4 py-3 ${buttonHover} transition-colors`}
            onClick={() => onSectionClick('skills')}
          >
            <div className={`${textPrimary} font-semibold`}>{isDos ? '[3]' : '⚡'} {menu.skills}</div>
          </button>
          <button 
            className={`${buttonClass} w-full text-left px-4 py-3 ${buttonHover} transition-colors`}
            onClick={() => onSectionClick('portfolio')}
          >
            <div className={`${textPrimary} font-semibold`}>{isDos ? '[4]' : '🎨'} {menu.portfolio}</div>
          </button>
          <button 
            className={`${buttonClass} w-full text-left px-4 py-3 ${buttonHover} transition-colors`}
            onClick={() => onSectionClick('game')}
          >
            <div className={`${textPrimary} font-semibold`}>{isDos ? '[5]' : '🎮'} {menu.game}</div>
          </button>
          <button 
            className={`${buttonClass} w-full text-left px-4 py-3 ${buttonHover} transition-colors`}
            onClick={() => onSectionClick('contacts')}
          >
            <div className={`${textPrimary} font-semibold`}>{isDos ? '[6]' : '📧'} {menu.contacts}</div>
          </button>
        </div>
        <div className={`text-6xl hidden lg:block ${isDos ? 'text-dos-green' : ''}`}>{asciiArt.computer}</div>
      </div>
      
      <div className={`${textMuted} ${isDos ? 'font-mono' : ''}`}>
        {prompt}
      </div>
    </div>
  );
};

export default MainMenu;