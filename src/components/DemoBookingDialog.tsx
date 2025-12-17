import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useLanguage } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Calendar } from 'lucide-react';

interface DemoBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoBookingDialog = ({ open, onOpenChange }: DemoBookingDialogProps) => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return /^05\d{8}$/.test(cleanPhone);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = isRTL ? 'שדה חובה' : 'Required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'שדה חובה' : 'Required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = isRTL ? 'מספר טלפון לא תקין (05XXXXXXXX)' : 'Invalid phone (05XXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('contact-form', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone.replace(/\D/g, ''),
          email: '', // No email for demo requests
          website: '',
        },
      });

      if (error) throw error;

      toast.success(isRTL ? 'תודה! ניצור קשר בקרוב.' : 'Thanks! We\'ll contact you soon.');
      setFormData({ name: '', phone: '' });
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className="w-5 h-5 text-primary" />
            {isRTL ? 'קבעו שיחת הדגמה' : 'Book Your Demo Call'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'שם מלא' : 'Full Name'} <span className="text-primary">*</span>
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={isRTL ? 'ישראל ישראלי' : 'John Smith'}
              className={`${isRTL ? 'text-right' : 'text-left'} ${errors.name ? 'border-red-500' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'טלפון' : 'Phone'} <span className="text-primary">*</span>
            </label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0501234567"
              className={errors.phone ? 'border-red-500' : ''}
              dir="ltr"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
            {isSubmitting 
              ? (isRTL ? 'שולח...' : 'Sending...') 
              : (isRTL ? 'קבעו שיחה' : 'Book Call')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoBookingDialog;
