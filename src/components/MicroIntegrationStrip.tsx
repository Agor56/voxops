import { motion } from 'framer-motion';
import { Phone, MessageSquare, Calendar, Mail, MessageCircle, Globe } from 'lucide-react';

const items = [
  { Icon: Phone, label: 'Phone' },
  { Icon: MessageCircle, label: 'WhatsApp' },
  { Icon: MessageSquare, label: 'SMS / DMs' },
  { Icon: Calendar, label: 'Calendar' },
  { Icon: Mail, label: 'Email' },
  { Icon: Globe, label: 'Web forms' },
];

const MicroIntegrationStrip = () => {
  return (
    <section className="py-10 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p
            className="text-xs md:text-sm font-light mb-5"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Works with your existing phone system, CRM, calendar, website forms, SMS, WhatsApp, DMs, and ad lead sources.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {items.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#C9A96E', opacity: 0.7 }} />
                <span className="text-xs font-medium tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MicroIntegrationStrip;
