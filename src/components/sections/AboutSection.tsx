import { Button } from '@/components/ui/button';
import TypingText from '@/components/TypingText';
import { asciiArt } from '@/lib/asciiArt';

interface AboutSectionProps {
  title: string;
  content: string;
  showContent: boolean;
  backText: string;
  onBack: () => void;
}

const AboutSection = ({ title, content, showContent, backText, onBack }: AboutSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-win98-black text-2xl font-bold">
        {showContent && <TypingText text={title} speed={20} />}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        <pre className="text-win98-black text-[10px] md:text-xs leading-tight whitespace-pre hidden sm:block">{asciiArt.computer}</pre>
        <div className="text-win98-black text-sm md:text-base md:pl-4 flex-1">
          {showContent && <TypingText text={content} speed={15} />}
        </div>
      </div>
      <button 
        onClick={onBack}
        className="win98-button px-4 py-2 mt-8 hover:bg-win98-light-gray"
      >
        {backText}
      </button>
    </div>
  );
};

export default AboutSection;