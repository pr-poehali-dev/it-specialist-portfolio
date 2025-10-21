import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { translations, Language } from '@/lib/translations';
import { useAudio } from '@/hooks/useAudio';
import { useWin98Audio } from '@/hooks/useWin98Audio';
import VersionSelector from '@/components/VersionSelector';
import BootScreen from '@/components/BootScreen';
import MainMenu from '@/components/sections/MainMenu';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ContactsSection from '@/components/sections/ContactsSection';
import MinesweeperGame from '@/components/games/MinesweeperGame';
import SolitaireGame from '@/components/games/SolitaireGame';

type Version = 'dos' | 'win98' | null;

const Index = () => {
  const [version, setVersion] = useState<Version>(null);
  const [lang, setLang] = useState<Language>('ru');
  const [booted, setBooted] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { playBeep } = useAudio(soundEnabled);
  const win98Audio = useWin98Audio(soundEnabled);
  const t = translations[lang];

  useEffect(() => {
    const saved = localStorage.getItem('retro_version');
    if (saved === 'dos' || saved === 'win98') {
      setVersion(saved);
    }
  }, []);

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

  const handleVersionSelect = (selectedVersion: 'dos' | 'win98') => {
    setVersion(selectedVersion);
    localStorage.setItem('retro_version', selectedVersion);
    if (selectedVersion === 'win98') {
      win98Audio.playStartup();
    }
  };

  const handleSectionClick = (section: string) => {
    if (version === 'win98') {
      win98Audio.playClick();
    } else {
      playBeep(1000, 80);
    }
    setCurrentSection(section);
  };

  const handleBackClick = () => {
    if (version === 'win98') {
      win98Audio.playClick();
    } else {
      playBeep(600, 80);
    }
    setCurrentSection(null);
    setShowContent(false);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      if (version === 'win98') {
        win98Audio.playNotification();
      } else {
        playBeep(1200, 50);
      }
    }
  };

  const renderSection = () => {
    const isDos = version === 'dos';
    
    switch (currentSection) {
      case 'about':
        return (
          <AboutSection
            title={t.about.title}
            content={t.about.content}
            showContent={showContent}
            backText={t.back}
            onBack={handleBackClick}
            version={version}
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
            version={version}
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
            version={version}
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
            version={version}
          />
        );
      
      case 'game':
        return (
          <div className="space-y-8">
            <div className={`text-2xl font-bold mb-4 ${isDos ? 'text-dos-green font-mono' : 'text-win98-black'}`}>
              {showContent && (isDos ? '>>> MINI GAMES' : '🎮 CLASSIC GAMES')}
            </div>
            {showContent && (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className={`font-bold text-lg mb-3 ${isDos ? 'text-dos-green font-mono' : 'text-win98-black'}`}>
                      {isDos ? '[1] MINESWEEPER' : '💣 MINESWEEPER'}
                    </div>
                    <MinesweeperGame />
                  </div>
                  <div>
                    <div className={`font-bold text-lg mb-3 ${isDos ? 'text-dos-green font-mono' : 'text-win98-black'}`}>
                      {isDos ? '[2] SOLITAIRE' : '🃏 SOLITAIRE'}
                    </div>
                    <SolitaireGame />
                  </div>
                </div>
              </>
            )}
            <button
              onClick={handleBackClick}
              className={isDos 
                ? 'border-2 border-dos-green text-dos-green px-4 py-2 flex items-center gap-2 hover:bg-dos-gray font-mono'
                : 'win98-button px-4 py-2 flex items-center gap-2 hover:bg-win98-light-gray'
              }
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
            version={version}
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
            version={version}
          />
        );
    }
  };

  if (!version) {
    return <VersionSelector onSelect={handleVersionSelect} />;
  }

  if (!booted) {
    return <BootScreen bootText={t.boot} version={version} />;
  }

  const isDos = version === 'dos';

  return (
    <div className={`min-h-screen p-4 ${isDos ? 'bg-dos-black scanline' : 'bg-win98-teal'}`}>
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <button
          onClick={toggleSound}
          className={isDos 
            ? `border-2 px-3 py-2 ${soundEnabled ? 'border-dos-green text-dos-green' : 'border-dos-green-dark text-dos-green-dark opacity-50'}`
            : `win98-button px-3 py-2 ${soundEnabled ? '' : 'opacity-50'}`
          }
        >
          {soundEnabled ? <Icon name="Volume2" size={16} /> : <Icon name="VolumeX" size={16} />}
        </button>
        <button
          onClick={() => {
            if (version === 'win98') win98Audio.playClick(); else playBeep(1000, 50);
            setLang('ru');
          }}
          className={isDos
            ? `border-2 px-3 py-2 ${lang === 'ru' ? 'bg-dos-green text-dos-black border-dos-green' : 'border-dos-green text-dos-green'}`
            : `win98-button px-3 py-2 ${lang === 'ru' ? 'border-4 border-win98-black' : ''}`
          }
        >
          RU
        </button>
        <button
          onClick={() => {
            if (version === 'win98') win98Audio.playClick(); else playBeep(1000, 50);
            setLang('en');
          }}
          className={isDos
            ? `border-2 px-3 py-2 ${lang === 'en' ? 'bg-dos-green text-dos-black border-dos-green' : 'border-dos-green text-dos-green'}`
            : `win98-button px-3 py-2 ${lang === 'en' ? 'border-4 border-win98-black' : ''}`
          }
        >
          EN
        </button>
        <button
          onClick={() => {
            setVersion(null);
            setBooted(false);
            localStorage.removeItem('retro_version');
          }}
          className={isDos
            ? 'border-2 border-dos-green text-dos-green px-3 py-2 text-xs'
            : 'win98-button px-3 py-2 text-xs'
          }
          title="Change version"
        >
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {isDos ? (
          <>
            <div className="space-y-2 mb-8">
              <div className="text-dos-green crt-effect text-sm font-mono">
                ╔════════════════════════════════════════════════════════════╗
              </div>
              <div className="text-dos-green crt-effect text-sm font-mono text-center">
                MS-DOS Version 6.22 (C) Copyright 1981-1994 Microsoft Corp.
              </div>
              <div className="text-dos-green crt-effect text-sm font-mono">
                ╚════════════════════════════════════════════════════════════╝
              </div>
            </div>
            {renderSection()}
          </>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Index;