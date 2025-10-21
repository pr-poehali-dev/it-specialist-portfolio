import { useState, useEffect } from 'react';

import Icon from '@/components/ui/icon';
import TypingText from '@/components/TypingText';

interface ContactInfo {
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  formTitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendButton: string;
  successMessage: string;
  errorMessage: string;
  captchaLabel: string;
  captchaError: string;
}

interface ContactsSectionProps {
  contactInfo: ContactInfo;
  showContent: boolean;
  backText: string;
  onBack: () => void;
  playBeep: (frequency: number, duration: number) => void;
}

const ContactsSection = ({ contactInfo, showContent, backText, onBack, playBeep }: ContactsSectionProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: '' });
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
      setCaptchaError(true);
      playBeep(400, 100);
      return;
    }
    
    setFormStatus('sending');
    playBeep(1000, 50);
    
    try {
      const response = await fetch('https://functions.poehali.dev/3fe6ac37-32dd-4977-9aee-d20afd4e01f6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus('success');
        playBeep(1200, 100);
        setFormData({ name: '', email: '', message: '' });
        generateCaptcha();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        playBeep(400, 200);
        generateCaptcha();
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      playBeep(400, 200);
      generateCaptcha();
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-win98-black font-bold text-sm md:text-base">
        {showContent && <TypingText text={contactInfo.title} speed={20} />}
      </div>
      <div className="space-y-3 md:pl-4">
        <a 
          href="mailto:info@elkin.pro" 
          className="flex items-center gap-3 hover:text-win98-blue transition-colors cursor-pointer"
        >
          <Icon name="Mail" size={16} className="text-win98-blue flex-shrink-0" />
          <span className="text-win98-dark-gray text-sm md:text-base break-all">{contactInfo.email}</span>
        </a>
        <a 
          href="tel:+79637178053" 
          className="flex items-center gap-3 hover:text-win98-blue transition-colors cursor-pointer"
        >
          <Icon name="Phone" size={16} className="text-win98-blue flex-shrink-0" />
          <span className="text-win98-dark-gray text-sm md:text-base">{contactInfo.phone}</span>
        </a>
        <a 
          href="https://linkedin.com/in/ivanelkin" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:text-win98-blue transition-colors cursor-pointer"
        >
          <Icon name="Linkedin" size={16} className="text-win98-blue flex-shrink-0" />
          <span className="text-win98-dark-gray text-sm md:text-base break-all">{contactInfo.linkedin}</span>
        </a>
        <a 
          href="https://github.com/ivan-elkin" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:text-win98-blue transition-colors cursor-pointer"
        >
          <Icon name="Github" size={16} className="text-win98-blue flex-shrink-0" />
          <span className="text-win98-dark-gray text-sm md:text-base break-all">{contactInfo.github}</span>
        </a>
      </div>

      <div className="border-2 border-win98-dark-gray p-4 md:p-6 space-y-4">
        <div className="text-win98-black font-bold text-sm md:text-base mb-4">
          {contactInfo.formTitle}
        </div>
        
        {formStatus === 'success' ? (
          <div className="text-win98-black text-center py-8">
            <div className="text-2xl mb-2">✓</div>
            <div className="font-bold">{contactInfo.successMessage}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder={contactInfo.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                minLength={2}
                className="w-full bg-win98-gray border-2 border-win98-dark-gray text-win98-black p-2 text-sm md:text-base focus:outline-none focus:border-win98-blue placeholder:text-win98-dark-gray"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={contactInfo.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-win98-gray border-2 border-win98-dark-gray text-win98-black p-2 text-sm md:text-base focus:outline-none focus:border-win98-blue placeholder:text-win98-dark-gray"
              />
            </div>
            <div>
              <textarea
                placeholder={contactInfo.messagePlaceholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                minLength={10}
                rows={4}
                className="w-full bg-win98-gray border-2 border-win98-dark-gray text-win98-black p-2 text-sm md:text-base focus:outline-none focus:border-win98-blue placeholder:text-win98-dark-gray resize-none"
              />
            </div>
            <div className="space-y-2">
              <div className="text-win98-black font-bold text-sm md:text-base">
                {contactInfo.captchaLabel}: {captcha.num1} + {captcha.num2} = ?
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={captcha.answer}
                onChange={(e) => {
                  setCaptcha({ ...captcha, answer: e.target.value });
                  setCaptchaError(false);
                }}
                required
                className={`w-full bg-win98-gray border-2 ${
                  captchaError ? 'border-destructive' : 'border-win98-dark-gray'
                } text-win98-black p-2 text-sm md:text-base focus:outline-none placeholder:text-win98-dark-gray`}
                placeholder="?"
              />
              {captchaError && (
                <div className="text-destructive text-xs">
                  {contactInfo.captchaError}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="win98-button w-full px-4 py-2 font-bold"
            >
              {formStatus === 'sending' ? '...' : contactInfo.sendButton}
            </button>
            {formStatus === 'error' && (
              <div className="text-destructive text-sm text-center">
                {contactInfo.errorMessage}
              </div>
            )}
          </form>
        )}
      </div>

      <button 
        onClick={onBack}
        className="win98-button px-4 py-2 mt-8 font-bold"
      >
        {backText}
      </button>
    </div>
  );
};

export default ContactsSection;