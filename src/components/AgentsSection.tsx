import { motion } from 'framer-motion';
import { Bot, MessageSquare, Phone, PhoneOutgoing, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const AgentsSection = () => {
  const { t, isRTL } = useLanguage();

  const agents = [
    {
      key: 'sofia',
      icon: MessageSquare,
      color: 'green' as const,
      data: t.agents.sofia,
    },
    {
      key: 'marcus',
      icon: Phone,
      color: 'blue' as const,
      data: t.agents.marcus,
    },
    {
      key: 'david',
      icon: PhoneOutgoing,
      color: 'orange' as const,
      data: t.agents.david,
    },
  ];

  const colorStyles = {
    green: {
      icon: 'bg-green-500',
      check: 'bg-green-500/20 text-green-500',
      border: 'hover:border-green-500/30',
    },
    blue: {
      icon: 'bg-secondary',
      check: 'bg-secondary/20 text-secondary',
      border: 'hover:border-secondary/30',
    },
    orange: {
      icon: 'bg-primary',
      check: 'bg-primary/20 text-primary',
      border: 'hover:border-primary/30',
    },
  };

  return (
    <section id="agents" className="py-24 relative">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t.agents.badge}</span>
          </div>
          <h2 className="section-title mb-4">
            {t.agents.title} <span className="gradient-text">{t.agents.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.agents.subtitle}
          </p>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => {
            const styles = colorStyles[agent.color];
            
            return (
              <motion.div
                key={agent.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`glass-card-hover p-8 rounded-2xl h-full flex flex-col ${styles.border}`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${styles.icon} ${isRTL ? 'self-end' : 'self-start'}`}>
                  <agent.icon className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{agent.data.name}</h3>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {agent.data.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${styles.check.split(' ')[0]}`}>
                        <Check className={`w-3 h-3 ${styles.check.split(' ')[1]}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant="hero" 
                  className="w-full group"
                  asChild
                >
                  <a href="#contact" className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {agent.data.cta}
                    <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
