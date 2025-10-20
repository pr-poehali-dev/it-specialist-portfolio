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
    <div className="min-h-screen bg-dos-black scanline">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleSound}
          className={soundEnabled 
            ? 'border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black' 
            : 'border-dos-green-dark text-dos-green-dark hover:bg-dos-green-dark hover:text-dos-black opacity-50'
          }
        >
          {soundEnabled ? <Icon name="Volume2" size={16} /> : <Icon name="VolumeX" size={16} />}
        </Button>
        <Button
          variant={lang === 'ru' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            playBeep(1000, 50);
            setLang('ru');
          }}
          className={lang === 'ru' ? 'bg-dos-green text-dos-black' : 'border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black'}
        >
          RU
        </Button>
        <Button
          variant={lang === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            playBeep(1000, 50);
            setLang('en');
          }}
          className={lang === 'en' ? 'bg-dos-green text-dos-black' : 'border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black'}
        >
          EN
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
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
      </div>
    </div>
  );
};

export default Index;
