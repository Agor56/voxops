import { motion } from 'framer-motion';
import { Phone, MessageSquare, Mail, Calendar, Workflow } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const cards = [
  { n: '01', title: 'Voice', icon: Phone, text: 'Answers inbound calls, recovers missed calls, handles common admin questions, and routes interested patients toward booking while intent is still high.' },
  { n: '02', title: 'Text', icon: MessageSquare, text: 'Handles SMS, Instagram DMs, Facebook DMs, and WhatsApp follow-up so patients do not disappear after the first touch.' },
  { n: '03', title: 'Email', icon: Mail, text: 'Sends follow-up details, reminders, and booking links by email when patients need more context before scheduling.' },
  { n: '04', title: 'Calendar', icon: Calendar, text: 'Qualified patients get routed to your booking flow, calendar, or staff — with conversation notes captured automatically.' },
];

const HowItWorks = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(201,169,110,0.05)' }} />

      <div className="container mx-auto relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Workflow className="w-4 h-4" style={{ color: '#C9A96E' }} />
            <span className="text-sm text-muted-foreground">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 font-display">
            One agent. Every channel.
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 font-display" style={{ color: '#C9A96E' }}>
            Books like your best receptionist.
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Trained on your services, your prices, and your tone. It works every channel until the patient picks up.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-8 rounded-2xl h-full"
              >
                <div className="text-sm font-mono mb-4" style={{ color: 'rgba(201,169,110,0.6)' }}>{c.n}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(201,169,110,0.12)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#C9A96E' }} />
                </div>
                <h4 className="text-xl font-bold mb-3 font-display">{c.title}</h4>
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
