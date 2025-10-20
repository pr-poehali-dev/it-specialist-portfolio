export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    boot: 'ЗАГРУЗКА СИСТЕМЫ...',
    welcome: 'Добро пожаловать в систему',
    name: 'Иван Елькин',
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
      title: '>>> ОБ ИВАНЕ ЕЛЬКИНЕ',
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
      email: 'Email: ivan.elkin@example.com',
      phone: 'Телефон: +7 (XXX) XXX-XX-XX',
      linkedin: 'LinkedIn: /in/ivan-elkin',
      github: 'GitHub: github.com/ivan-elkin',
      formTitle: '>>> ФОРМА ОБРАТНОЙ СВЯЗИ',
      namePlaceholder: 'Ваше имя',
      emailPlaceholder: 'Ваш email',
      messagePlaceholder: 'Ваше сообщение',
      sendButton: 'Отправить',
      successMessage: 'Сообщение отправлено!',
      errorMessage: 'Ошибка отправки',
      captchaLabel: 'Проверка: решите пример',
      captchaError: 'Неверный ответ. Попробуйте снова.'
    },
    back: '[ ESC ] Назад в меню'
  },
  en: {
    boot: 'SYSTEM LOADING...',
    welcome: 'Welcome to the system',
    name: 'Ivan Elkin',
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
      title: '>>> ABOUT IVAN ELKIN',
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
      email: 'Email: ivan.elkin@example.com',
      phone: 'Phone: +7 (XXX) XXX-XX-XX',
      linkedin: 'LinkedIn: /in/ivan-elkin',
      github: 'GitHub: github.com/ivan-elkin',
      formTitle: '>>> CONTACT FORM',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Your message',
      sendButton: 'Send',
      successMessage: 'Message sent!',
      errorMessage: 'Send error',
      captchaLabel: 'Verification: solve the equation',
      captchaError: 'Wrong answer. Try again.'
    },
    back: '[ ESC ] Back to menu'
  }
};