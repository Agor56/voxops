import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Phone, PhoneOutgoing, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import VoiceAgentDialog from './VoiceAgentDialog';

const WHATSAPP_NUMBER = '972555197834';

const AgentsSection = () => {
  const { t, isRTL } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<'marcus' | 'david'>('marcus');

  const handleSofiaClick = () => {
    const message = isRTL 
      ? 'שלום, אשמח לשמוע עוד על סוכני ה-AI שלכם' 
      : 'Hi, I would like to learn more about your AI agents';
    const link = document.createElement('a');
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVoiceAgentClick = (agent: 'marcus' | 'david') => {
    setSelectedAgent(agent);
    setDialogOpen(true);
  };

  const agents = [
    {
      key: 'sofia',
      icon: MessageSquare,
      variant: 'orange' as const,
      data: t.agents.sofia,
      delay: 0,
      onClick: handleSofiaClick,
    },
    {
      key: 'marcus',
      icon: Phone,
      variant: 'blue' as const,
      data: t.agents.marcus,
      delay: 0.15,
      onClick: () => handleVoiceAgentClick('marcus'),
    },
    {
      key: 'david',
      icon: PhoneOutgoing,
      variant: 'orangeOutline' as const,
      data: t.agents.david,
      delay: 0.3,
      onClick: () => handleVoiceAgentClick('david'),
    },
  ];

  const variantStyles = {
    orange: {
      iconBg: 'bg-primary',
      iconColor: 'text-white',
      checkBg: 'bg-primary/20',
      checkColor: 'text-primary',
      buttonVariant: 'hero' as const,
    },
    blue: {
      iconBg: 'bg-secondary',
      iconColor: 'text-white',
      checkBg: 'bg-secondary/20',
      checkColor: 'text-secondary',
      buttonVariant: 'heroBlue' as const,
    },
    orangeOutline: {
      iconBg: 'bg-primary/10 border border-primary',
      iconColor: 'text-primary',
      checkBg: 'bg-primary/20',
      checkColor: 'text-primary',
      buttonVariant: 'hero' as const,
    },
  };

  return (
    <>
      <section id="agents" className="py-24 relative">
        {/* Background */}
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
            <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t.agents.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t.agents.title} <span className="gradient-text">{t.agents.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.agents.subtitle}
            </p>
          </motion.div>

          {/* Agent Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              const styles = variantStyles[agent.variant];
              
              return (
                <motion.div
                  key={agent.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: agent.delay, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="glass-card-hover p-8 rounded-2xl flex flex-col h-full"
                >
                  {/* Icon - Top Left */}
                  <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center mb-6 ${isRTL ? 'self-end' : 'self-start'}`}>
                    <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold text-foreground mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {agent.data.name}
                  </h3>

                  {/* Description */}
                  <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {agent.data.description}
                  </p>

                  {/* Features with checkmarks */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {agent.data.features.map((feature, i) => (
                      <li 
                        key={i} 
                        className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <div className={`w-5 h-5 rounded-full ${styles.checkBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className={`w-3 h-3 ${styles.checkColor}`} />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    variant={styles.buttonVariant}
                    className="w-full group"
                    onClick={agent.onClick}
                  >
                    <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {agent.data.cta}
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voice Agent Dialog */}
      <VoiceAgentDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        agentName={selectedAgent}
      />
    </>
  );
};

export default AgentsSection;