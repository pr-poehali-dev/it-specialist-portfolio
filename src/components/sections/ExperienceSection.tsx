
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
  version?: 'dos' | 'win98';
}

const ExperienceSection = ({ title, jobs, showContent, backText, onBack, version = 'win98' }: ExperienceSectionProps) => {
  const isDos = version === 'dos';
  
  const textPrimary = isDos ? 'text-dos-green' : 'text-win98-black';
  const textMuted = isDos ? 'text-dos-green-dark' : 'text-win98-dark-gray';
  const textAccent = isDos ? 'text-dos-green' : 'text-win98-blue';
  const buttonClass = isDos ? 'border-2 border-dos-green bg-dos-black font-mono' : 'win98-button';
  const buttonHover = isDos ? 'hover:bg-dos-gray hover:text-dos-green' : '';
  
  return (
    <div className="space-y-4">
      <div className={`${textPrimary} font-bold text-sm md:text-base ${isDos ? 'font-mono' : ''}`}>
        {showContent && <TypingText text={title} speed={20} />}
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="space-y-6 md:pl-4 flex-1">
          {jobs.map((job, idx) => (
            <div key={idx} className="space-y-1">
              <div className={`${textPrimary} font-bold text-sm md:text-base ${isDos ? 'font-mono' : ''}`}>[{job.period}]</div>
              <div className={`${textMuted} text-sm md:text-base pl-2 ${isDos ? 'font-mono' : ''}`}>&gt; {job.role}</div>
              <div className={`${textMuted} text-sm md:text-base pl-2 opacity-80 ${isDos ? 'font-mono' : ''}`}>{job.company}</div>
            </div>
          ))}
        </div>
        <pre className={`${textAccent} text-[10px] md:text-xs leading-tight whitespace-pre hidden lg:block`}>{asciiArt.server}</pre>
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

export default ExperienceSection;