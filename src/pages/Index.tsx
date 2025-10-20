import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Language = 'ru' | 'en';

const translations = {
  ru: {
    boot: 'ЗАГРУЗКА СИСТЕМЫ...',
    welcome: 'Добро пожаловать в систему',
    name: 'Старший ИТ-специалист',
    experience: '25+ лет опыта',
    menu: {
      about: '1. О специалисте',
      experience: '2. Опыт работы',
      skills: '3. Технические навыки',
      portfolio: '4. Портфолио',
      contacts: '5. Контакты'
    },
    prompt: 'C:\\> Выберите раздел_',
    about: {
      title: '>>> О СПЕЦИАЛИСТЕ',
      content: 'Высококвалифицированный ИТ-специалист с более чем 25-летним опытом работы. Глубокие знания как в разработке программного обеспечения, так и в аппаратном обеспечении. Успешный опыт реализации комплексных технических проектов от концепции до внедрения.'
    },
    experienceSection: {
      title: '>>> ОПЫТ РАБОТЫ И КАРЬЕРНЫЙ ПУТЬ',
      jobs: [
        { period: '2015 - н.в.', role: 'Ведущий архитектор ИТ-систем', company: 'Tech Solutions Inc.' },
        { period: '2010 - 2015', role: 'Старший системный инженер', company: 'Enterprise Systems' },
        { period: '2005 - 2010', role: 'Инженер-разработчик', company: 'Software Dynamics' },
        { period: '2000 - 2005', role: 'Младший программист', company: 'Digital Innovations' }
      ]
    },
    skillsSection: {
      title: '>>> ТЕХНИЧЕСКИЕ НАВЫКИ И КОМПЕТЕНЦИИ',
      categories: [
        { name: 'Программирование', items: ['C/C++', 'Python', 'Java', 'JavaScript', 'Assembly', 'SQL'] },
        { name: 'Системы', items: ['Linux/Unix', 'Windows Server', 'Сетевые протоколы', 'Виртуализация'] },
        { name: 'Железо', items: ['Архитектура ПК', 'Серверное оборудование', 'Встраиваемые системы'] },
        { name: 'Инструменты', items: ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud (AWS/Azure)'] }
      ]
    },
    portfolioSection: {
      title: '>>> ПОРТФОЛИО ПРОЕКТОВ',
      projects: [
        { name: 'Распределённая система хранения данных', tech: 'C++, Linux, Docker' },
        { name: 'Платформа мониторинга серверов', tech: 'Python, PostgreSQL, React' },
        { name: 'Система управления встраиваемыми устройствами', tech: 'C, ARM, RTOS' },
        { name: 'Корпоративная облачная инфраструктура', tech: 'Kubernetes, Terraform, AWS' }
      ]
    },
    contactsSection: {
      title: '>>> КОНТАКТНАЯ ИНФОРМАЦИЯ',
      email: 'Email: senior.it@example.com',
      phone: 'Телефон: +7 (XXX) XXX-XX-XX',
      linkedin: 'LinkedIn: /in/senior-it-specialist',
      github: 'GitHub: github.com/senior-it-pro'
    },
    back: '[ ESC ] Назад в меню'
  },
  en: {
    boot: 'SYSTEM LOADING...',
    welcome: 'Welcome to the system',
    name: 'Senior IT Specialist',
    experience: '25+ years of experience',
    menu: {
      about: '1. About',
      experience: '2. Work Experience',
      skills: '3. Technical Skills',
      portfolio: '4. Portfolio',
      contacts: '5. Contacts'
    },
    prompt: 'C:\\> Select section_',
    about: {
      title: '>>> ABOUT SPECIALIST',
      content: 'Highly qualified IT specialist with over 25 years of experience. Deep knowledge in both software development and hardware. Successful experience implementing complex technical projects from concept to deployment.'
    },
    experienceSection: {
      title: '>>> WORK EXPERIENCE AND CAREER PATH',
      jobs: [
        { period: '2015 - present', role: 'Lead IT Systems Architect', company: 'Tech Solutions Inc.' },
        { period: '2010 - 2015', role: 'Senior Systems Engineer', company: 'Enterprise Systems' },
        { period: '2005 - 2010', role: 'Software Engineer', company: 'Software Dynamics' },
        { period: '2000 - 2005', role: 'Junior Programmer', company: 'Digital Innovations' }
      ]
    },
    skillsSection: {
      title: '>>> TECHNICAL SKILLS AND COMPETENCIES',
      categories: [
        { name: 'Programming', items: ['C/C++', 'Python', 'Java', 'JavaScript', 'Assembly', 'SQL'] },
        { name: 'Systems', items: ['Linux/Unix', 'Windows Server', 'Network Protocols', 'Virtualization'] },
        { name: 'Hardware', items: ['PC Architecture', 'Server Hardware', 'Embedded Systems'] },
        { name: 'Tools', items: ['Git', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud (AWS/Azure)'] }
      ]
    },
    portfolioSection: {
      title: '>>> PROJECT PORTFOLIO',
      projects: [
        { name: 'Distributed Data Storage System', tech: 'C++, Linux, Docker' },
        { name: 'Server Monitoring Platform', tech: 'Python, PostgreSQL, React' },
        { name: 'Embedded Device Management System', tech: 'C, ARM, RTOS' },
        { name: 'Corporate Cloud Infrastructure', tech: 'Kubernetes, Terraform, AWS' }
      ]
    },
    contactsSection: {
      title: '>>> CONTACT INFORMATION',
      email: 'Email: senior.it@example.com',
      phone: 'Phone: +7 (XXX) XXX-XX-XX',
      linkedin: 'LinkedIn: /in/senior-it-specialist',
      github: 'GitHub: github.com/senior-it-pro'
    },
    back: '[ ESC ] Back to menu'
  }
};

const Index = () => {
  const [lang, setLang] = useState<Language>('ru');
  const [booted, setBooted] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'about':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-dos-green">{t.about.title}</div>
            <div className="text-dos-green-dark pl-4">{t.about.content}</div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(null)}
              className="mt-8 border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black"
            >
              {t.back}
            </Button>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-dos-green">{t.experienceSection.title}</div>
            <div className="space-y-6 pl-4">
              {t.experienceSection.jobs.map((job, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-dos-green">[{job.period}]</div>
                  <div className="text-dos-green-dark pl-2">&gt; {job.role}</div>
                  <div className="text-dos-green-dark pl-2 opacity-80">{job.company}</div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(null)}
              className="mt-8 border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black"
            >
              {t.back}
            </Button>
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-dos-green">{t.skillsSection.title}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4">
              {t.skillsSection.categories.map((category, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-dos-green">[{category.name}]</div>
                  <div className="space-y-1 pl-2">
                    {category.items.map((item, i) => (
                      <div key={i} className="text-dos-green-dark">&gt; {item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(null)}
              className="mt-8 border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black"
            >
              {t.back}
            </Button>
          </div>
        );
      
      case 'portfolio':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-dos-green">{t.portfolioSection.title}</div>
            <div className="space-y-6 pl-4">
              {t.portfolioSection.projects.map((project, idx) => (
                <div key={idx} className="space-y-1 border-l-2 border-dos-green-dark pl-4 py-2">
                  <div className="text-dos-green">&gt; {project.name}</div>
                  <div className="text-dos-green-dark pl-2 opacity-80">Tech: {project.tech}</div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(null)}
              className="mt-8 border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black"
            >
              {t.back}
            </Button>
          </div>
        );
      
      case 'contacts':
        return (
          <div className="space-y-4 animate-fade-in">
            <div className="text-dos-green">{t.contactsSection.title}</div>
            <div className="space-y-3 pl-4">
              <div className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="text-dos-green" />
                <span className="text-dos-green-dark">{t.contactsSection.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="text-dos-green" />
                <span className="text-dos-green-dark">{t.contactsSection.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Linkedin" size={16} className="text-dos-green" />
                <span className="text-dos-green-dark">{t.contactsSection.linkedin}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Github" size={16} className="text-dos-green" />
                <span className="text-dos-green-dark">{t.contactsSection.github}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentSection(null)}
              className="mt-8 border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black"
            >
              {t.back}
            </Button>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <div className="text-dos-green crt-effect text-2xl">{t.welcome}</div>
              <div className="text-dos-green-dark text-xl">{t.name}</div>
              <div className="text-dos-green-dark">{t.experience}</div>
            </div>
            
            <div className="border-2 border-dos-green-dark p-6 space-y-3">
              <Card 
                className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
                onClick={() => setCurrentSection('about')}
              >
                <div className="text-dos-green">{t.menu.about}</div>
              </Card>
              <Card 
                className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
                onClick={() => setCurrentSection('experience')}
              >
                <div className="text-dos-green">{t.menu.experience}</div>
              </Card>
              <Card 
                className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
                onClick={() => setCurrentSection('skills')}
              >
                <div className="text-dos-green">{t.menu.skills}</div>
              </Card>
              <Card 
                className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
                onClick={() => setCurrentSection('portfolio')}
              >
                <div className="text-dos-green">{t.menu.portfolio}</div>
              </Card>
              <Card 
                className="bg-transparent border-none cursor-pointer hover:bg-dos-gray transition-colors p-3"
                onClick={() => setCurrentSection('contacts')}
              >
                <div className="text-dos-green">{t.menu.contacts}</div>
              </Card>
            </div>
            
            <div className="text-dos-green-dark">
              {t.prompt}
            </div>
          </div>
        );
    }
  };

  if (!booted) {
    return (
      <div className="min-h-screen bg-dos-black flex items-center justify-center scanline">
        <div className="text-dos-green crt-effect text-2xl animate-pulse">
          {t.boot}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dos-black scanline">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant={lang === 'ru' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLang('ru')}
          className={lang === 'ru' ? 'bg-dos-green text-dos-black' : 'border-dos-green text-dos-green hover:bg-dos-green hover:text-dos-black'}
        >
          RU
        </Button>
        <Button
          variant={lang === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLang('en')}
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
