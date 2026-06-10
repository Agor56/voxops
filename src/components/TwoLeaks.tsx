import { motion } from 'framer-motion';
import { PhoneMissed, MessageSquare, MoonStar, RotateCcw, Database, Droplet } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const leaks = [
  {
    icon: PhoneMissed,
    title: 'Missed calls',
    text: 'Patients call while intent is high, but no one answers or follows up fast enough.',
  },
  {
    icon: MessageSquare,
    title: 'Slow DMs and texts',
    text: 'Instagram, Facebook, SMS, and WhatsApp inquiries sit too long before getting a reply.',
  },
  {
    icon: MoonStar,
    title: 'After-hours inquiries',
    text: 'Your clinic closes, but patients keep asking about GLP-1, HRT/TRT, and peptides.',
  },
  {
    icon: RotateCcw,
    title: 'One-and-done follow-up',
    text: 'Staff follows up once, then the lead disappears into the pipeline.',
  },
  {
    icon: Database,
    title: 'Old leads sitting untouched',
    text: 'No-shows, pricing shoppers, and past inquiries stay buried in your CRM.',
  },
];

const TwoLeaks = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="two-leaks" className="py-20 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.04)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Droplet className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>The Leak</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display max-w-3xl mx-auto mb-4 leading-tight">
            Most clinics don't lose patients at the ad.{' '}
            <span style={{ color: '#C9A96E' }}>They lose them after the inquiry.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Every missed call, slow reply, ignored DM, and forgotten follow-up gives patients time to book somewhere else.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {leaks.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass-card-hover p-6 rounded-2xl flex flex-col h-full"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#C9A96E' }} />
                </div>
                <h3 className="text-base font-bold mb-2 font-display">{b.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{b.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TwoLeaks;
