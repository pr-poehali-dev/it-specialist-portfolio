
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
  version?: 'dos' | 'win98';
}

const SkillsSection = ({ title, categories, showContent, backText, onBack, version = 'win98' }: SkillsSectionProps) => {
  const isDos = version === 'dos';
  
  const textPrimary = isDos ? 'text-dos-green' : 'text-win98-black';
  const textMuted = isDos ? 'text-dos-green-dark' : 'text-win98-dark-gray';
  const textAccent = isDos ? 'text-dos-green' : 'text-win98-blue';
  const buttonClass = isDos ? 'border-2 border-dos-green bg-dos-black font-mono' : 'win98-button';
  const buttonHover = isDos ? 'hover:bg-dos-gray hover:text-dos-green' : '';
  
  return (
    <div className="space-y-4">
      <div className={`${textPrimary} flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${isDos ? 'font-mono' : ''}`}>
        <span className="font-bold text-sm md:text-base">{showContent && <TypingText text={title} speed={20} />}</span>
        <pre className={`${textAccent} text-[10px] md:text-xs leading-tight whitespace-pre hidden md:block`}>{asciiArt.code}</pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 md:pl-4">
        {categories.map((category, idx) => (
          <div key={idx} className="space-y-2">
            <div className={`${textPrimary} font-bold text-sm md:text-base ${isDos ? 'font-mono' : ''}`}>[{category.name}]</div>
            <div className="space-y-1 pl-2">
              {category.items.map((item, i) => (
                <div key={i} className={`${textMuted} text-sm md:text-base ${isDos ? 'font-mono' : ''}`}>&gt; {item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={onBack}
        className={`${buttonClass} px-4 py-2 mt-8 font-bold ${buttonHover}`}
      >
        {backText}
      </button>
    </div>
  );
};

export default SkillsSection;