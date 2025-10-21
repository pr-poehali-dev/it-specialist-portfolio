import { Button } from '@/components/ui/button';
import TypingText from '@/components/TypingText';
import { asciiArt } from '@/lib/asciiArt';

interface AboutSectionProps {
  title: string;
  content: string;
  showContent: boolean;
  backText: string;
  onBack: () => void;
  version?: 'dos' | 'win98';
}

const AboutSection = ({ title, content, showContent, backText, onBack, version = 'win98' }: AboutSectionProps) => {
  const isDos = version === 'dos';
  
  const textPrimary = isDos ? 'text-dos-green' : 'text-win98-black';
  const buttonClass = isDos ? 'border-2 border-dos-green bg-dos-black font-mono' : 'win98-button';
  const buttonHover = isDos ? 'hover:bg-dos-gray hover:text-dos-green' : 'hover:bg-win98-light-gray';
  
  return (
    <div className="space-y-4">
      <div className={`${textPrimary} text-2xl font-bold ${isDos ? 'font-mono' : ''}`}>
        {showContent && <TypingText text={title} speed={20} />}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        <div className={`text-5xl md:text-6xl hidden sm:block ${isDos ? 'text-dos-green' : ''}`}>{asciiArt.computer}</div>
        <div className={`${textPrimary} text-sm md:text-base md:pl-4 flex-1 ${isDos ? 'font-mono' : ''}`}>
          {showContent && <TypingText text={content} speed={15} />}
        </div>
      </div>
      <button 
        onClick={onBack}
        className={`${buttonClass} px-4 py-2 mt-8 ${buttonHover}`}
      >
        {backText}
      </button>
    </div>
  );
};

export default AboutSection;