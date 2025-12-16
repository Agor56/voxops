import { motion } from 'framer-motion';
import { Zap, MessageSquare, Rocket, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Quick Discovery Call',
    description: 'We learn about your clinic, current challenges, and goals in a 15-minute call.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Custom Setup',
    description: 'Our team configures your AI agents, integrates with your systems, and trains them on your services.',
    icon: Zap,
  },
  {
    number: '03',
    title: 'Launch & Optimize',
    description: 'Go live in days, not months. We continuously optimize based on real performance data.',
    icon: Rocket,
  },
];

const OnboardingSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Simple Onboarding</span>
          </div>
          <h2 className="section-title mb-4">
            Live in <span className="gradient-text">Days, Not Months</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We handle everything. You just show up for a quick call and watch your clinic transform.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-60px)] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="glass-card-hover p-8 rounded-2xl text-center h-full">
                {/* Step Number */}
                <div className="text-5xl font-bold gradient-text mb-4 opacity-50">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="feature-icon mx-auto mb-6">
                  <step.icon className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
