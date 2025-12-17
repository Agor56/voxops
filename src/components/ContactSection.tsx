import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone: string): boolean => {
    // Israeli phone: 10 digits starting with 05
    const cleanPhone = phone.replace(/\D/g, '');
    return /^05\d{8}$/.test(cleanPhone);
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = isRTL ? 'שדה חובה' : 'Required';
    }

    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'שדה חובה' : 'Required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = isRTL ? 'אימייל לא תקין' : 'Invalid email';
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
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          website: formData.website.trim() || undefined,
          phone: formData.phone.replace(/\D/g, ''),
        },
      });

      if (error) {
        throw error;
      }

      toast.success(t.contact.form.success);
      setFormData({
        name: '',
        email: '',
        website: '',
        phone: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(isRTL ? 'שגיאה בשליחת הטופס. נסו שוב.' : 'Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />
      <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none`} />
      <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none`} />
      
      <div className="container mx-auto relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t.contact.badge}</span>
            </div>
            <h2 className="section-title mb-6">
              {t.contact.title} <span className="gradient-text">{t.contact.titleHighlight}</span> {t.contact.titleEnd}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.contact.subtitle}
            </p>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.name} <span className="text-primary">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.form.namePlaceholder}
                    className={`${isRTL ? 'text-right' : 'text-left'} ${errors.name ? 'border-red-500' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.email} <span className="text-primary">*</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.emailPlaceholder}
                    className={errors.email ? 'border-red-500' : ''}
                    dir="ltr"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.website}
                  </label>
                  <Input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder={t.contact.form.websitePlaceholder}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.phone} <span className="text-primary">*</span>
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.contact.form.phonePlaceholder}
                    className={errors.phone ? 'border-red-500' : ''}
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                <Send className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {t.contact.form.privacy}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
