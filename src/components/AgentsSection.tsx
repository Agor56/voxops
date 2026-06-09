import { motion } from 'framer-motion';
import { MessageSquare, Phone, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const demos = [
  {
    icon: MessageSquare,
    title: 'Messaging Inquiry Agent',
    description:
      'Responds to patient inquiries across WhatsApp, SMS, and DMs in under 60 seconds — then qualifies interest, answers basic process questions, and routes ready patients toward booking.',
    bullets: [
      'Handles WhatsApp, SMS, Instagram & Facebook DMs',
      'Qualifies treatment interest and booking intent',
      'Sends booking links and follow-up prompts',
      'Escalates medical questions to your team',
    ],
  },
  {
    icon: Phone,
    title: 'Voice Reception Agent',
    description:
      'Answers inbound calls, recovers missed calls, captures why the patient called, and routes interested patients toward the next step.',
    bullets: [
      'Answers common admin and pricing questions',
      'Recovers missed calls before leads go cold',
      'Captures call reason and patient intent',
      'Sends booking handoff or staff notification',
    ],
  },
];

const AgentsSection = () => {
  const { isRTL } = useLanguage();

  return (
    <section id="agents" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${
              isRTL ? 'flex-row-reverse' : ''
            }`}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#C9A96E' }}
            >
              Live Demos
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            See how VoxOps handles{' '}
            <span className="gradient-text">patient inquiries</span>.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Test the two workflows clinics use most: instant messaging follow-up
            and AI voice reception for calls, missed calls, questions, and booking
            handoff.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {demos.map((demo, i) => {
            const Icon = demo.icon;
            return (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="glass-card-hover rounded-2xl p-8 flex flex-col h-full"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    isRTL ? 'ml-auto' : ''
                  }`}
                  style={{ background: 'rgba(201,169,110,0.12)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#C9A96E' }} />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {demo.title}
                </h3>

                <p className="text-muted-foreground mb-6">
                  {demo.description}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {demo.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-3 ${
                        isRTL ? 'flex-row-reverse text-right' : ''
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'rgba(201,169,110,0.15)' }}
                      >
                        <Check
                          className="w-3 h-3"
                          style={{ color: '#C9A96E' }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full group hover:opacity-90 hover:-translate-y-px transition-all duration-300"
                  style={{
                    background: '#C9A96E',
                    color: '#000',
                    boxShadow: '0 0 15px rgba(201,169,110,0.25)',
                  }}
                >
                  <a
                    href="#book-demo"
                    className={`flex items-center justify-center ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    See It Live
                    <ArrowRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        isRTL
                          ? 'mr-2 rotate-180 group-hover:-translate-x-1'
                          : 'ml-2'
                      }`}
                    />
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm mt-10"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Book a free audit and we&apos;ll show the workflow for your clinic.
        </motion.p>
      </div>
    </section>
  );
};

export default AgentsSection;
