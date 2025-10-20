import { Button } from '@/components/ui/button';
import TypingText from '@/components/TypingText';
import { asciiArt } from '@/lib/asciiArt';

interface Job {
  period: string;
  role: string;
  company: string;
}

interface ExperienceSectionProps {
  title: string;
  jobs: Job[];
  showContent: boolean;
  backText: string;
  onBack: () => void;
}

const ExperienceSection = ({ title, jobs, showContent, backText, onBack }: ExperienceSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="text-dos-green text-sm md:text-base">
        {showContent && <TypingText text={title} speed={20} />}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="space-y-6 md:pl-4 flex-1">
          {jobs.map((job, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-dos-green text-sm md:text-base">[{job.period}]</div>
              <div className="text-dos-green-dark text-sm md:text-base pl-2">&gt; {job.role}</div>
              <div className="text-dos-green-dark text-sm md:text-base pl-2 opacity-80">{job.company}</div>
            </div>
          ))}
        </div>
        <pre className="text-dos-green text-[10px] md:text-xs leading-tight whitespace-pre hidden lg:block">{asciiArt.server}</pre>
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

export default ExperienceSection;
