import { motion } from 'framer-motion';
import { BarChart3, Clock, PhoneMissed, Users, CheckCircle2, CalendarCheck, RotateCcw, Timer, Sparkles } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const metrics = [
  { icon: Clock, label: 'Average response time before vs. after' },
  { icon: PhoneMissed, label: 'Missed calls recovered' },
  { icon: Users, label: 'Leads contacted' },
  { icon: CheckCircle2, label: 'Qualified inquiries' },
  { icon: CalendarCheck, label: 'Consults booked' },
  { icon: RotateCcw, label: 'No-shows followed up' },
  { icon: Sparkles, label: 'Old leads reactivated' },
  { icon: Timer, label: 'Staff time saved' },
];

const TestimonialsSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="pilot-metrics" className="py-24 relative overflow-hidden">
      <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2`} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Pilot Metrics</span>
          </div>
          <h2 className="section-title mb-4 font-display">
            What we measure during <span className="gradient-text">your pilot</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Instead of vague promises, we track the numbers that matter.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className="glass-card-hover p-6 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <Icon className="w-4 h-4" style={{ color: '#C9A96E' }} />
                </div>
                <p className="text-sm font-medium leading-snug">{m.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
