import { motion } from 'framer-motion';
import { Bot, MessageSquare, Calendar, Bell, ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const AgentsSection = () => {
  const { t, isRTL } = useLanguage();

  const agents = [
    {
      name: t.agents.leadResponse.name,
      icon: MessageSquare,
      color: 'orange',
      description: t.agents.leadResponse.description,
      features: t.agents.leadResponse.features,
    },
    {
      name: t.agents.booking.name,
      icon: Calendar,
      color: 'blue',
      description: t.agents.booking.description,
      features: t.agents.booking.features,
    },
    {
      name: t.agents.followUp.name,
      icon: Bell,
      color: 'orange',
      description: t.agents.followUp.description,
      features: t.agents.followUp.features,
    },
  ];

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
            const isOrange = agent.color === 'orange';
            
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`glass-card-hover p-8 rounded-2xl h-full flex flex-col ${
                  isOrange ? 'hover:border-primary/30' : 'hover:border-secondary/30'
                }`}
              >
                {/* Icon */}
                <div className={`${isOrange ? 'feature-icon' : 'feature-icon-blue'} mb-6 ${isRTL ? 'self-end' : 'self-start'}`}>
                  <agent.icon className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>{agent.name}</h3>
                
                {/* Description */}
                <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>{agent.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {agent.features.map((feature, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isOrange ? 'bg-primary/20' : 'bg-secondary/20'
                      }`}>
                        <Check className={`w-3 h-3 ${isOrange ? 'text-primary' : 'text-secondary'}`} />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={isOrange ? "hero" : "heroBlue"} 
                  className="w-full group"
                  asChild
                >
                  <a href="#contact" className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {t.agents.learnMore}
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
