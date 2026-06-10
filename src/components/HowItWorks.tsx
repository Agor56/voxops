import { motion } from 'framer-motion';
import { Inbox, Zap, ClipboardCheck, CalendarCheck, Workflow } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const cards = [
  { n: '01', title: 'Capture', icon: Inbox, text: 'New leads, missed calls, DMs, SMS, WhatsApp, and forms enter one workflow.' },
  { n: '02', title: 'Respond', icon: Zap, text: 'Patients get a reply in under 60 seconds while intent is still high.' },
  { n: '03', title: 'Qualify', icon: ClipboardCheck, text: 'VoxOps collects treatment interest, booking intent, and preferred contact method.' },
  { n: '04', title: 'Book', icon: CalendarCheck, text: 'Qualified patients are routed to your calendar, staff, or booking flow.' },
];

const HowItWorks = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.05)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Workflow className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-display leading-tight">
            One system to <span style={{ color: '#C9A96E' }}>answer, qualify, follow up, and book.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            VoxOps connects your patient inquiry channels into one workflow so every lead gets a fast response and a clear next step.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass-card-hover p-6 rounded-2xl h-full"
              >
                <div className="text-xs font-mono mb-3" style={{ color: 'rgba(201,169,110,0.6)' }}>{c.n}</div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#C9A96E' }} />
                </div>
                <h4 className="text-base font-bold mb-2 font-display">{c.title}</h4>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{c.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
