import { Button } from '@/components/ui/button';
import TypingText from '@/components/TypingText';
import { asciiArt } from '@/lib/asciiArt';

interface Category {
  name: string;
  items: string[];
}

interface SkillsSectionProps {
  title: string;
  categories: Category[];
  showContent: boolean;
  backText: string;
  onBack: () => void;
}

const SkillsSection = ({ title, categories, showContent, backText, onBack }: SkillsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-dos-green flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span className="text-sm md:text-base">{showContent && <TypingText text={title} speed={20} />}</span>
        <pre className="text-dos-green text-[10px] md:text-xs leading-tight whitespace-pre hidden md:block">{asciiArt.code}</pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:pl-4">
        {categories.map((category, idx) => (
          <div key={idx} className="space-y-2">
            <div className="text-dos-green text-sm md:text-base">[{category.name}]</div>
            <div className="space-y-1 pl-2">
              {category.items.map((item, i) => (
                <div key={i} className="text-dos-green-dark text-sm md:text-base">&gt; {item}</div>
              ))}
            </div>
          </div>
        ))}
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

export default SkillsSection;
