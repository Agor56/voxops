import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { Phone, User, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface VoiceAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: 'marcus' | 'david';
}

const VoiceAgentDialog = ({ open, onOpenChange, agentName }: VoiceAgentDialogProps) => {
  const { isRTL } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', businessType: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      marcus: {
        title: 'Talk to Ben',
        subtitle: 'Enter your details and Ben will call you right away',
      },
      david: {
        title: 'Talk to Bar',
        subtitle: 'Enter your details and Bar will call you to qualify your needs',
      },
      name: 'Your Name',
      namePlaceholder: 'John Doe',
      phone: 'Phone Number',
      phonePlaceholder: '0501234567',
      businessType: 'Type of Business',
      businessTypePlaceholder: 'e.g., Med Spa, Dental Clinic...',
      submit: 'Call Me Now',
      submitting: 'Submitting...',
      success: 'We will call you shortly!',
      errors: {
        nameRequired: 'Name is required',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Enter a valid Israeli phone (05XXXXXXXX)',
        businessTypeRequired: 'Business type is required',
      },
    },
    he: {
      marcus: {
        title: 'דברו עם בן',
        subtitle: 'הזינו את הפרטים שלכם ובן יתקשר אליכם מיד',
      },
      david: {
        title: 'דברו עם בר',
        subtitle: 'הזינו את הפרטים שלכם ובר יתקשר אליכם להסמכת הצרכים שלכם',
      },
      name: 'השם שלך',
      namePlaceholder: 'ישראל ישראלי',
      phone: 'מספר טלפון',
      phonePlaceholder: '0501234567',
      businessType: 'סוג העסק',
      businessTypePlaceholder: 'למשל: מרפאת ספא, מרפאת שיניים...',
      submit: 'התקשרו אליי עכשיו',
      submitting: 'שולח...',
      success: 'ניצור קשר בהקדם!',
      errors: {
        nameRequired: 'שדה חובה',
        phoneRequired: 'שדה חובה',
        phoneInvalid: 'הזינו מספר טלפון תקין (05XXXXXXXX)',
        businessTypeRequired: 'שדה חובה',
      },
    },
  };

  const t = translations[isRTL ? 'he' : 'en'];
  const agentT = t[agentName];

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return /^05\d{8}$/.test(cleanPhone);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.errors.phoneRequired;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t.errors.phoneInvalid;
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = t.errors.businessTypeRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await supabase.functions.invoke('contact-form', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          businessType: formData.businessType.trim(),
          agent: agentName,
          type: 'voice_callback',
        },
      });

      toast.success(t.success);
      setFormData({ name: '', phone: '', businessType: '' });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(isRTL ? 'שגיאה בשליחה. נסו שוב.' : 'Error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
            {agentT.title}
          </DialogTitle>
          <DialogDescription className={`text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
            {agentT.subtitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.name} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.namePlaceholder}
                className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} ${errors.name ? 'border-red-500' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.businessType} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Building2 className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder={t.businessTypePlaceholder}
                className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} ${errors.businessType ? 'border-red-500' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
          </div>

          <div>
            <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.phone} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.phonePlaceholder}
                className={`${isRTL ? 'pr-10' : 'pl-10'} ${errors.phone ? 'border-red-500' : ''}`}
                dir="ltr"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? t.submitting : t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceAgentDialog;
