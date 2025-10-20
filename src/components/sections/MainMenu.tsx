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
        <div className="text-dos-green crt-effect text-2xl">{welcome}</div>
        <div className="text-dos-green-dark text-xl">{name}</div>
        <div className="text-dos-green-dark">{experience}</div>
      </div>
      
      <div className="flex gap-8 items-start">
        <div className="border-2 border-dos-green-dark p-6 space-y-3 flex-1">
          <Card 
            className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
            onClick={() => onSectionClick('about')}
          >
            <div className="text-dos-green">{menu.about}</div>
          </Card>
          <Card 
            className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
            onClick={() => onSectionClick('experience')}
          >
            <div className="text-dos-green">{menu.experience}</div>
          </Card>
          <Card 
            className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
            onClick={() => onSectionClick('skills')}
          >
            <div className="text-dos-green">{menu.skills}</div>
          </Card>
          <Card 
            className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
            onClick={() => onSectionClick('portfolio')}
          >
            <div className="text-dos-green">{menu.portfolio}</div>
          </Card>
          <Card 
            className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
            onClick={() => onSectionClick('game')}
          >
            <div className="text-dos-green">{menu.game}</div>
          </Card>
          <Card 
            className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
            onClick={() => onSectionClick('contacts')}
          >
            <div className="text-dos-green">{menu.contacts}</div>
          </Card>
        </div>
        <pre className="text-dos-green text-xs leading-tight whitespace-pre hidden lg:block">{asciiArt.computer}</pre>
      </div>
      
      <div className="text-dos-green-dark">
        {prompt}
      </div>
    </div>
  );
};

export default MainMenu;