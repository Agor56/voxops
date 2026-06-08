import { motion } from 'framer-motion';
import { Droplet, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const TwoLeaks = () => {
  const { isRTL } = useLanguage();

  const blocks = [
    {
      icon: Clock,
      title: 'The new inquiries you answer too late',
      text: 'A patient asks about GLP-1, hormone therapy, or peptides after hours. Your front desk is closed. By morning, they may already be talking to another clinic. VoxOps responds in under 60 seconds, captures intent, answers basic process questions, and pushes the patient toward the next step.',
    },
    {
      icon: Users,
      title: 'The old inquiries sitting in your database',
      text: 'Past leads, no-shows, pricing shoppers, and unfinished consult requests often sit untouched in your CRM or spreadsheet. Many were interested, they just never got consistent follow-up. VoxOps reactivates old inquiries with calls, texts, WhatsApp, and email so interested patients can re-enter your booking flow.',
    },
  ];

  return (
    <section id="two-leaks" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.05)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Droplet className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-sm text-muted-foreground">The Problem</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display max-w-3xl mx-auto">
            Two leaks are costing GLP-1, HRT & peptide clinics <span style={{ color: '#C9A96E' }}>booked consults every day.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-8 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#C9A96E' }} />
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{b.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{b.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-lg md:text-xl max-w-2xl mx-auto font-light"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          You don't have a marketing problem. You have a follow-up problem.{' '}
          <span style={{ color: '#C9A96E' }}>We fix both.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default TwoLeaks;
