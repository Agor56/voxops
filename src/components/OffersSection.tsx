import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, PhoneIncoming, RotateCcw, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const pilots = [
  {
    icon: Zap,
    title: 'Speed-to-Lead Pilot',
    text: 'New inquiries get answered in under 60 seconds and routed toward booking.',
  },
  {
    icon: PhoneIncoming,
    title: 'Missed Call Recovery Pilot',
    text: 'Missed calls get instant follow-up, intent capture, and booking handoff.',
  },
  {
    icon: RotateCcw,
    title: 'Old Lead Reactivation Pilot',
    text: 'Old leads, no-shows, pricing shoppers, and past inquiries get re-engaged.',
  },
];

const tracked = [
  'Average response time before vs. after',
  'Missed calls recovered',
  'Leads contacted',
  'Qualified inquiries',
  'Consults booked',
  'No-shows followed up',
  'Old leads reactivated',
  'Staff time saved',
];

const OffersSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="offers" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.06)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Pilot</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 leading-tight">
            Start with one leak.{' '}
            <span style={{ color: '#C9A96E' }}>Prove it in 30 days.</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light mb-4">
            Choose one pilot: speed-to-lead, missed-call recovery, or old lead reactivation. We install the workflow, connect your booking process, and track the numbers that matter.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)' }}>
            <span className="text-sm font-semibold" style={{ color: '#C9A96E' }}>30-Day Revenue Leak Recovery Pilot — $1,000</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-10">
          {pilots.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
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
                <h3 className="text-base font-bold font-display mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* What we track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-8"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#C9A96E' }}>
            What we track
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {tracked.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(201,169,110,0.15)' }}>
                  <Check className="w-2.5 h-2.5" style={{ color: '#C9A96E' }} />
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center">
          <Button
            asChild
            size="xl"
            className="group hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            style={{
              background: '#C9A96E',
              color: '#000',
              boxShadow: '0 0 20px rgba(201,169,110,0.3), 0 0 50px rgba(201,169,110,0.12)',
            }}
          >
            <a href="#book-demo" className="flex items-center">
              Book Free Audit
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
