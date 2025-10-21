
import TypingText from '@/components/TypingText';
import { asciiArt } from '@/lib/asciiArt';

interface Project {
  name: string;
  tech: string;
}

interface PortfolioSectionProps {
  title: string;
  projects: Project[];
  showContent: boolean;
  backText: string;
  onBack: () => void;
  version?: 'dos' | 'win98';
}

const PortfolioSection = ({ title, projects, showContent, backText, onBack, version = 'win98' }: PortfolioSectionProps) => {
  const isDos = version === 'dos';
  
  const textPrimary = isDos ? 'text-dos-green' : 'text-win98-black';
  const textMuted = isDos ? 'text-dos-green-dark' : 'text-win98-dark-gray';
  const textAccent = isDos ? 'text-dos-green' : 'text-win98-blue';
  const borderColor = isDos ? 'border-dos-green-dark' : 'border-win98-dark-gray';
  const buttonClass = isDos ? 'border-2 border-dos-green bg-dos-black font-mono' : 'win98-button';
  const buttonHover = isDos ? 'hover:bg-dos-gray hover:text-dos-green' : '';
  
  return (
    <div className="space-y-4">
      <div className={`${textPrimary} flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${isDos ? 'font-mono' : ''}`}>
        <span className="font-bold text-sm md:text-base">{showContent && <TypingText text={title} speed={20} />}</span>
        <pre className={`${textAccent} text-[10px] md:text-xs leading-tight whitespace-pre hidden md:block`}>{asciiArt.network}</pre>
      </div>
      <div className="space-y-6 md:pl-4">
        {projects.map((project, idx) => (
          <div key={idx} className={`space-y-1 border-l-2 ${borderColor} pl-3 md:pl-4 py-2`}>
            <div className={`${textPrimary} font-bold text-sm md:text-base ${isDos ? 'font-mono' : ''}`}>&gt; {project.name}</div>
            <div className={`${textMuted} text-xs md:text-sm pl-2 opacity-80 ${isDos ? 'font-mono' : ''}`}>Tech: {project.tech}</div>
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

export default PortfolioSection;