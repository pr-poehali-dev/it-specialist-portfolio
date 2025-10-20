import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        playBeep(400, 200);
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      setFormStatus('error');
      playBeep(400, 200);
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-dos-green text-sm md:text-base">
        {showContent && <TypingText text={contactInfo.title} speed={20} />}
      </div>
      <div className="space-y-3 md:pl-4">
        <div className="flex items-center gap-3 hover:text-dos-green transition-colors cursor-pointer">
          <Icon name="Mail" size={16} className="text-dos-green flex-shrink-0" />
          <span className="text-dos-green-dark text-sm md:text-base break-all">{contactInfo.email}</span>
        </div>
        <div className="flex items-center gap-3 hover:text-dos-green transition-colors cursor-pointer">
          <Icon name="Phone" size={16} className="text-dos-green flex-shrink-0" />
          <span className="text-dos-green-dark text-sm md:text-base">{contactInfo.phone}</span>
        </div>
        <div className="flex items-center gap-3 hover:text-dos-green transition-colors cursor-pointer">
          <Icon name="Linkedin" size={16} className="text-dos-green flex-shrink-0" />
          <span className="text-dos-green-dark text-sm md:text-base break-all">{contactInfo.linkedin}</span>
        </div>
        <div className="flex items-center gap-3 hover:text-dos-green transition-colors cursor-pointer">
          <Icon name="Github" size={16} className="text-dos-green flex-shrink-0" />
          <span className="text-dos-green-dark text-sm md:text-base break-all">{contactInfo.github}</span>
        </div>
      </div>

      <div className="border-2 border-dos-green-dark p-4 md:p-6 space-y-4">
        <div className="text-dos-green text-sm md:text-base mb-4">
          {contactInfo.formTitle}
        </div>
        
        {formStatus === 'success' ? (
          <div className="text-dos-green text-center py-8">
            <div className="text-2xl mb-2">✓</div>
            <div>{contactInfo.successMessage}</div>
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
                className="w-full bg-dos-black border-2 border-dos-green text-dos-green p-2 text-sm md:text-base focus:outline-none focus:border-dos-green placeholder:text-dos-green-dark"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={contactInfo.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-dos-black border-2 border-dos-green text-dos-green p-2 text-sm md:text-base focus:outline-none focus:border-dos-green placeholder:text-dos-green-dark"
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
                className="w-full bg-dos-black border-2 border-dos-green text-dos-green p-2 text-sm md:text-base focus:outline-none focus:border-dos-green placeholder:text-dos-green-dark resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={formStatus === 'sending'}
              className="w-full bg-dos-green text-dos-black hover:bg-dos-green-dark border-2 border-dos-green"
            >
              {formStatus === 'sending' ? '...' : contactInfo.sendButton}
            </Button>
            {formStatus === 'error' && (
              <div className="text-destructive text-sm text-center">
                {contactInfo.errorMessage}
              </div>
            )}
          </form>
        )}
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

export default ContactsSection;