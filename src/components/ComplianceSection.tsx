import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ComplianceSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="compliance" className="py-12 relative overflow-hidden">
      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto glass-card p-6 md:p-7 rounded-2xl"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ background: 'rgba(201,169,110,0.08)' }}>
            <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#C9A96E' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A96E' }}>Trust</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-3 font-display">
            Built for admin, intake, and booking <span style={{ color: '#C9A96E' }}>— not medical advice.</span>
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            VoxOps does not diagnose, recommend treatment, adjust medication, or determine eligibility. The system handles front-end inquiry response, basic intake, scheduling, reminders, follow-up, and routing. Medical questions are escalated to your licensed team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;
