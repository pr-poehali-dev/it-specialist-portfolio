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
      content: 'В IT я пришел тогда, когда «парковка головок» была не метафорой, а рутиной. За 20+ лет в отрасли я видел всё: от железа до облаков. Это научило меня главному: отличать суть от шума и не поддаваться на уловки «инфоцыган».\n\nЯ не просто исполнитель. Я партнер, который:\n\n• Глубоко разберется в вашей проблеме\n• Предложит работающие, а не «модные» решения\n• Научит вашу команду и передаст опыт\n• Возглавит проект и приведет его к победе, потому что не боюсь меняться и учу этому других\n\nМой главный ресурс — это умение находить ответы там, где другие опускают руки. Обожаю сложные задачи! Есть такая? Расскажите мне о вашей цели.'
    },
    experienceSection: {
      title: '>>> ОПЫТ РАБОТЫ И КАРЬЕРНЫЙ ПУТЬ',
      jobs: [
        { period: '2020 - н.в.', role: 'Директор по ИТ', company: '' },
        { period: '2011 - 2020', role: 'IT менеджер', company: '' },
        { period: '2009 - 2011', role: 'Ведущий системный администратор', company: '' },
        { period: '2008 - 2009', role: 'От зам. руководителя отдела ИТ до руководителя', company: '' },
        { period: '2007 - 2008', role: 'Программист 1С', company: '' },
        { period: '2006 - 2007', role: 'Системный администратор, технический дизайнер', company: '' }
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
      email: 'Email: info@elkin.pro',
      phone: 'Телефон: +7 963 717 80 53',
      linkedin: 'LinkedIn: linkedin.com/in/ivanelkin',
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
      content: 'I entered IT when "parking heads" was not a metaphor, but a routine. Over 20+ years in the industry, I\'ve seen it all: from hardware to clouds. This taught me the main thing: to distinguish essence from noise and not fall for "infogypsy" tricks.\n\nI\'m not just an executor. I\'m a partner who:\n\n• Deeply understands your problem\n• Offers working, not "trendy" solutions\n• Teaches your team and shares experience\n• Leads the project to victory, because I\'m not afraid to change and teach others to do the same\n\nMy main resource is the ability to find answers where others give up. I love complex challenges! Got one? Tell me about your goal.'
    },
    experienceSection: {
      title: '>>> WORK EXPERIENCE AND CAREER PATH',
      jobs: [
        { period: '2020 - present', role: 'IT Director', company: '' },
        { period: '2011 - 2020', role: 'IT Manager', company: '' },
        { period: '2009 - 2011', role: 'Lead System Administrator', company: '' },
        { period: '2008 - 2009', role: 'From Deputy IT Head to IT Head', company: '' },
        { period: '2007 - 2008', role: '1C Programmer', company: '' },
        { period: '2006 - 2007', role: 'System Administrator, Technical Designer', company: '' }
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
      email: 'Email: info@elkin.pro',
      phone: 'Phone: +7 963 717 80 53',
      linkedin: 'LinkedIn: linkedin.com/in/ivanelkin',
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