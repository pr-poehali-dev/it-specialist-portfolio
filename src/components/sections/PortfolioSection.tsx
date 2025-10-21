
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
}

const PortfolioSection = ({ title, projects, showContent, backText, onBack }: PortfolioSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-win98-black flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span className="font-bold text-sm md:text-base">{showContent && <TypingText text={title} speed={20} />}</span>
        <pre className="text-win98-blue text-[10px] md:text-xs leading-tight whitespace-pre hidden md:block">{asciiArt.network}</pre>
      </div>
      <div className="space-y-6 md:pl-4">
        {projects.map((project, idx) => (
          <div key={idx} className="space-y-1 border-l-2 border-win98-dark-gray pl-3 md:pl-4 py-2">
            <div className="text-win98-black font-bold text-sm md:text-base">&gt; {project.name}</div>
            <div className="text-win98-dark-gray text-xs md:text-sm pl-2 opacity-80">Tech: {project.tech}</div>
          </div>
        ))}
      </div>
      <button 
        onClick={onBack}
        className="win98-button px-4 py-2 mt-8 font-bold"
      >
        {backText}
      </button>
    </div>
  );
};

export default PortfolioSection;