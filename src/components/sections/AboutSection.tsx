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
      <div className="text-dos-green text-sm md:text-base">
        {showContent && <TypingText text={title} speed={20} />}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        <pre className="text-dos-green text-[10px] md:text-xs leading-tight whitespace-pre hidden sm:block">{asciiArt.computer}</pre>
        <div className="text-dos-green-dark text-sm md:text-base md:pl-4 flex-1">
          {showContent && <TypingText text={content} speed={15} />}
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mt-8 border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black"
      >
        {backText}
      </Button>
    </div>
  );
};

export default AboutSection;
