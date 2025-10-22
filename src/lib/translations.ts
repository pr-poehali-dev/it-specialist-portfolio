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
      game: '5. Мини-игра',
      contacts: '6. Контакты'
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
      title: '>>> ТЕХНИЧЕСКИЕ НАВЫКИ И ЭКСПЕРТИЗА',
      categories: [
        { name: 'Управление IT и методологии', items: ['Управление IT-отделами', 'ITSM / ITIL', 'Agile', 'Бюджетирование', 'Планирование ресурсов', 'Оптимизация процессов'] },
        { name: 'Внедрение и разработка систем', items: ['1C (КОРП, ЗУП, УТ, ЭДО)', 'CRM', 'ECM-системы', 'ЭДО, ЭЦП', 'Мобильные приложения'] },
        { name: 'Инфраструктура и облака', items: ['Проектирование ЛВС', 'VMWare', 'Облачный хостинг', 'Миграция в ЦОД', 'Серверы, СХД', 'Мониторинг'] },
        { name: 'Кибербезопасность и СКУД', items: ['Аудит ФЗ-152', 'SIEM (FireEye Helix)', 'EDR (Kaspersky, Trend Micro, Sophos)', 'Биометрические СКУД', 'Видеонаблюдение'] },
        { name: 'Промышленные системы', items: ['SCADA', 'BMS', 'IIoT', 'O&M', 'BAS', 'DESC', 'eSight'] },
        { name: 'Оптимизация затрат', items: ['IT-бюджет', 'Аппаратное и ПО', 'Облачные сервисы', 'Телеком'] }
      ]
    },
    portfolioSection: {
      title: '>>> ОПЫТ И КЛЮЧЕВЫЕ ПРОЕКТЫ',
      projects: [
        { name: 'Система «Умное предприятие»', tech: 'Управление инфраструктурой: Scada, BMS, IIoT, ИИ-аналитика' },
        { name: 'Комплекс «Virtual Visit Kit»', tech: 'Удаленный аудит инфраструктуры (награждён на международном конкурсе)' },
        { name: 'Миграция в облако и ЦОД', tech: '8 серверов, 200+ сайтов, 500к+ посещений/мес' },
        { name: 'Оптимизация IT-бюджета', tech: 'Сокращение расходов на 40% (облака + телеком)' },
        { name: 'Отказоустойчивая сеть', tech: 'ЛВС для 150-200 пользователей, автопереключение' },
        { name: 'Модернизация Wi-Fi и видеонаблюдения', tech: '3 этажа, 15 точек Ubiquiti' },
        { name: 'Внедрение систем безопасности', tech: 'FireEye Helix, Kaspersky, Trend Micro, Sophos, ФЗ-152' },
        { name: 'Управление 1С и ЭДО', tech: 'Внедрение КОРП, ЗУП, УТ, ЭДО, ЭЦП' }
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
      game: '5. Mini-game',
      contacts: '6. Contacts'
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
      title: '>>> TECHNICAL SKILLS AND EXPERTISE',
      categories: [
        { name: 'IT Management & Methodologies', items: ['IT Department Management', 'ITSM / ITIL', 'Agile', 'Budgeting', 'Resource Planning', 'Process Optimization'] },
        { name: 'System Implementation & Development', items: ['1C (KORP, ZUP, UT, EDO)', 'CRM', 'ECM Systems', 'Electronic Document Management', 'Mobile Apps'] },
        { name: 'Infrastructure & Cloud', items: ['LAN Design', 'VMWare', 'Cloud Hosting', 'Data Center Migration', 'Servers, Storage', 'Monitoring'] },
        { name: 'Cybersecurity & Access Control', items: ['Security Audits (152-FZ)', 'SIEM (FireEye Helix)', 'EDR (Kaspersky, Trend Micro, Sophos)', 'Biometric Access Control', 'Video Surveillance'] },
        { name: 'Industrial Systems', items: ['SCADA', 'BMS', 'IIoT', 'O&M', 'BAS', 'DESC', 'eSight'] },
        { name: 'Cost Optimization', items: ['IT Budget', 'Hardware & Software', 'Cloud Services', 'Telecom'] }
      ]
    },
    portfolioSection: {
      title: '>>> EXPERIENCE AND KEY PROJECTS',
      projects: [
        { name: 'Smart Enterprise System', tech: 'Infrastructure management: Scada, BMS, IIoT, AI analytics' },
        { name: 'Virtual Visit Kit', tech: 'Remote infrastructure audit (awarded at international competition)' },
        { name: 'Cloud & Data Center Migration', tech: '8 servers, 200+ sites, 500k+ visits/month' },
        { name: 'IT Budget Optimization', tech: '40% cost reduction (cloud + telecom)' },
        { name: 'Fault-Tolerant Network', tech: 'LAN for 150-200 users, auto-failover' },
        { name: 'Wi-Fi & Surveillance Modernization', tech: '3 floors, 15 Ubiquiti access points' },
        { name: 'Security Systems Implementation', tech: 'FireEye Helix, Kaspersky, Trend Micro, Sophos, 152-FZ' },
        { name: '1C & Electronic Document Management', tech: 'Implementation: KORP, ZUP, UT, EDO, Digital Signature' }
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