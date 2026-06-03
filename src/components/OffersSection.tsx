import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Zap, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const offers = [
  {
    icon: Gift,
    title: 'Reactivation Pilot',
    text: 'Your next 40,000 dollars is already in your contacts. A 30-day AI campaign that calls, texts, and emails your old clients and books them back in. 1,000 dollars. I run it for 30 days, and if you\'re not happy, you get your money back.',
  },
  {
    icon: Zap,
    title: 'Speed-to-Lead System',
    text: 'Answer every lead in under a minute, automatically, before your competitor wakes up. 1,000 dollars. I run it for 30 days, and if you\'re not happy, you get your money back.',
  },
];

const OffersSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="offers" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.06)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-sm text-muted-foreground">The Offers</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
            Start with one pilot. <span style={{ color: '#C9A96E' }}>Zero risk.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {offers.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-8 rounded-2xl flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#C9A96E' }} />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display">{o.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">{o.text}</p>
                <Button
                  asChild
                  className="w-full hover:opacity-90 hover:-translate-y-px transition-all duration-300"
                  style={{
                    background: '#C9A96E',
                    color: '#000',
                    boxShadow: '0 0 20px rgba(201,169,110,0.3), 0 0 50px rgba(201,169,110,0.12)',
                  }}
                >
                  <a href="#contact" className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    Book a Call
                    {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
