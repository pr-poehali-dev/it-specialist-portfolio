import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { translations, Language } from '@/lib/translations';
import { useAudio } from '@/hooks/useAudio';
import BootScreen from '@/components/BootScreen';
import MainMenu from '@/components/sections/MainMenu';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactsSection from '@/components/sections/ContactsSection';
import MinesweeperGame from '@/components/games/MinesweeperGame';
import SolitaireGame from '@/components/games/SolitaireGame';

const Index = () => {
  const [lang, setLang] = useState<Language>('ru');
  const [booted, setBooted] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { playBeep } = useAudio(soundEnabled);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentSection) {
      setShowContent(false);
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const handleSectionClick = (section: string) => {
    playBeep(1000, 80);
    setCurrentSection(section);
  };

  const handleBackClick = () => {
    playBeep(600, 80);
    setCurrentSection(null);
    setShowContent(false);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      playBeep(1200, 50);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return (
          <AboutSection
            title={t.about.title}
            content={t.about.content}
            showContent={showContent}
            backText={t.back}
            onBack={handleBackClick}
          />
        );
      
      case 'experience':
        return (
          <ExperienceSection
            title={t.experienceSection.title}
            jobs={t.experienceSection.jobs}
            showContent={showContent}
            backText={t.back}
            onBack={handleBackClick}
          />
        );
      
      case 'skills':
        return (
          <SkillsSection
            title={t.skillsSection.title}
            categories={t.skillsSection.categories}
            showContent={showContent}
            backText={t.back}
            onBack={handleBackClick}
          />
        );
      
      case 'portfolio':
        return (
          <PortfolioSection
            title={t.portfolioSection.title}
            projects={t.portfolioSection.projects}
            showContent={showContent}
            backText={t.back}
            onBack={handleBackClick}
          />
        );
      
      case 'game':
        return (
          <div className="space-y-8">
            <div className="text-win98-black text-2xl font-bold mb-4">
              {showContent && '🎮 CLASSIC GAMES'}
            </div>
            {showContent && (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-win98-black font-bold text-lg mb-3">💣 MINESWEEPER</div>
                    <MinesweeperGame />
                  </div>
                  <div>
                    <div className="text-win98-black font-bold text-lg mb-3">🃏 SOLITAIRE</div>
                    <SolitaireGame />
                  </div>
                </div>
              </>
            )}
            <button
              onClick={handleBackClick}
              className="win98-button px-4 py-2 flex items-center gap-2 hover:bg-win98-light-gray"
            >
              <Icon name="ArrowLeft" size={16} />
              {t.back}
            </button>
          </div>
        );
      
      case 'contacts':
        return (
          <ContactsSection
            contactInfo={t.contactsSection}
            showContent={showContent}
            backText={t.back}
            onBack={handleBackClick}
            playBeep={playBeep}
          />
        );
      
      default:
        return (
          <MainMenu
            welcome={t.welcome}
            name={t.name}
            experience={t.experience}
            menu={t.menu}
            prompt={t.prompt}
            onSectionClick={handleSectionClick}
          />
        );
    }
  };

  if (!booted) {
    return <BootScreen bootText={t.boot} />;
  }

  return (
    <div className="min-h-screen bg-win98-teal p-4">
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <button
          onClick={toggleSound}
          className={`win98-button px-3 py-2 ${soundEnabled ? '' : 'opacity-50'}`}
        >
          {soundEnabled ? <Icon name="Volume2" size={16} /> : <Icon name="VolumeX" size={16} />}
        </button>
        <button
          onClick={() => {
            playBeep(1000, 50);
            setLang('ru');
          }}
          className={`win98-button px-3 py-2 ${lang === 'ru' ? 'border-4 border-win98-black' : ''}`}
        >
          RU
        </button>
        <button
          onClick={() => {
            playBeep(1000, 50);
            setLang('en');
          }}
          className={`win98-button px-3 py-2 ${lang === 'en' ? 'border-4 border-win98-black' : ''}`}
        >
          EN
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="win98-window p-1 mb-8">
          <div className="win98-titlebar px-2 py-1 flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Icon name="Monitor" size={16} className="text-white" />
              <span className="text-white font-bold text-sm">Portfolio - Microsoft Internet Explorer</span>
            </div>
            <div className="flex gap-1">
              <button className="win98-button w-6 h-6 text-xs font-bold">_</button>
              <button className="win98-button w-6 h-6 text-xs font-bold">□</button>
              <button className="win98-button w-6 h-6 text-xs font-bold">✕</button>
            </div>
          </div>
          <div className="bg-win98-white p-6 border-2 border-win98-gray">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;