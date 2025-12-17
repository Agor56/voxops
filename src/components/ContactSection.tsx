import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { useLanguage } from '@/i18n/LanguageContext';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinic: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success(t.contact.form.success);
    setFormData({
      name: '',
      email: '',
      clinic: '',
      phone: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
                    {t.contact.form.name}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.form.namePlaceholder}
                    required
                    className={isRTL ? 'text-right' : 'text-left'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.email}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.emailPlaceholder}
                    required
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.website}
                  </label>
                  <Input
                    name="clinic"
                    value={formData.clinic}
                    onChange={handleChange}
                    placeholder={t.contact.form.websitePlaceholder}
                    className={isRTL ? 'text-right' : 'text-left'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                <div>
                  <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.phone}
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.contact.form.phonePlaceholder}
                    dir="ltr"
                  />
                </div>
              </div>
              <div>
                <label className={`text-sm font-medium mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t.contact.form.message}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={4}
                  className={isRTL ? 'text-right' : 'text-left'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
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
