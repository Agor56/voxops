import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const ComplianceSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="compliance" className="py-20 relative overflow-hidden">
      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto glass-card p-8 md:p-10 rounded-2xl"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ShieldCheck className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-sm text-muted-foreground">Compliance</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">
            Built for admin, intake, and booking <span style={{ color: '#C9A96E' }}>— not medical advice.</span>
          </h2>
          <p className="text-muted-foreground font-light leading-relaxed mb-3">
            VoxOps does not diagnose, recommend treatment, adjust medication, determine eligibility, or give medical advice.
          </p>
          <p className="text-muted-foreground font-light leading-relaxed">
            The system handles front-end inquiry response, basic intake, scheduling, reminders, follow-up, and routing. Medical questions are escalated to your licensed team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;
