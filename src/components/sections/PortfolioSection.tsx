import { Button } from '@/components/ui/button';
import TypingText from '@/components/TypingText';
import { asciiArt } from '@/lib/asciiArt';

interface Project {
  name: string;
  tech: string;
  link?: string;
  linkText?: string;
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
      <div className="text-dos-green flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span className="text-sm md:text-base">{showContent && <TypingText text={title} speed={20} />}</span>
        <pre className="text-dos-green text-[10px] md:text-xs leading-tight whitespace-pre hidden md:block">{asciiArt.network}</pre>
      </div>
      <div className="space-y-6 md:pl-4">
        {projects.map((project, idx) => (
          <div key={idx} className="space-y-1 border-l-2 border-dos-green-dark pl-3 md:pl-4 py-2">
            <div className="text-dos-green text-sm md:text-base">&gt; {project.name}</div>
            <div className="text-dos-green-dark text-xs md:text-sm pl-2 opacity-80">Tech: {project.tech}</div>
            {project.link && (
              <div className="pl-2">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-dos-green text-xs md:text-sm hover:underline inline-flex items-center gap-1"
                >
                  → {project.linkText}
                </a>
              </div>
            )}
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

export default PortfolioSection;