import { motion } from 'framer-motion';
import { Send, ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div
        className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none`}
        style={{ background: 'rgba(201,169,110,0.06)' }}
      />

      <div className="container mx-auto relative z-10">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Send className="w-4 h-4" style={{ color: '#C9A96E' }} />
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.contact.badge}</span>
            </div>
            <h2 className="section-title mb-6">
              {t.contact.title} <span style={{ color: '#C9A96E' }}>{t.contact.titleHighlight}</span> {t.contact.titleEnd}
            </h2>
            <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {t.contact.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-14 h-14 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,169,110,0.12)' }}>
                <Calendar className="w-6 h-6" style={{ color: '#C9A96E' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {isRTL ? 'מוכנים להתחיל?' : 'Ready to get started?'}
              </h3>
              <p className="mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isRTL
                  ? 'קבעו שיחת היכרות חינם וגלו איך VoxOps יכול להגדיל לכם את העסק'
                  : 'Schedule a free discovery call and see how VoxOps can grow your business'}
              </p>
              <Button
                size="lg"
                asChild
                className="w-full hover:opacity-90 hover:-translate-y-px transition-all duration-300"
                style={{
                  background: '#C9A96E',
                  color: '#000',
                  boxShadow: '0 0 20px rgba(201,169,110,0.3), 0 0 50px rgba(201,169,110,0.12)',
                }}
              >
                <a href="/voxformhe" className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {isRTL ? 'קבעו שיחת גילוי' : 'Book a Discovery Call'}
                  {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
