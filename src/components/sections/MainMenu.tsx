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
}

const MainMenu = ({ welcome, name, experience, menu, prompt, onSectionClick }: MainMenuProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="text-win98-black text-3xl font-bold">{welcome}</div>
        <div className="text-win98-blue text-xl font-semibold">{name}</div>
        <div className="text-win98-black">{experience}</div>
      </div>
      
      <div className="flex gap-8 items-start">
        <div className="win98-window p-4 space-y-2 flex-1">
          <button 
            className="win98-button w-full text-left px-4 py-3 hover:bg-win98-light-gray transition-colors"
            onClick={() => onSectionClick('about')}
          >
            <div className="text-win98-black font-semibold">📄 {menu.about}</div>
          </button>
          <button 
            className="win98-button w-full text-left px-4 py-3 hover:bg-win98-light-gray transition-colors"
            onClick={() => onSectionClick('experience')}
          >
            <div className="text-win98-black font-semibold">💼 {menu.experience}</div>
          </button>
          <button 
            className="win98-button w-full text-left px-4 py-3 hover:bg-win98-light-gray transition-colors"
            onClick={() => onSectionClick('skills')}
          >
            <div className="text-win98-black font-semibold">⚡ {menu.skills}</div>
          </button>
          <button 
            className="win98-button w-full text-left px-4 py-3 hover:bg-win98-light-gray transition-colors"
            onClick={() => onSectionClick('portfolio')}
          >
            <div className="text-win98-black font-semibold">🎨 {menu.portfolio}</div>
          </button>
          <button 
            className="win98-button w-full text-left px-4 py-3 hover:bg-win98-light-gray transition-colors"
            onClick={() => onSectionClick('game')}
          >
            <div className="text-win98-black font-semibold">🎮 {menu.game}</div>
          </button>
          <button 
            className="win98-button w-full text-left px-4 py-3 hover:bg-win98-light-gray transition-colors"
            onClick={() => onSectionClick('contacts')}
          >
            <div className="text-win98-black font-semibold">📧 {menu.contacts}</div>
          </button>
        </div>
        <div className="text-6xl hidden lg:block">{asciiArt.computer}</div>
      </div>
      
      <div className="text-win98-dark-gray">
        {prompt}
      </div>
    </div>
  );
};

export default MainMenu;