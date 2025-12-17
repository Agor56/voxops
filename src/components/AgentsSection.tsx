import { motion } from 'framer-motion';
import { Bot, MessageSquare, Phone, PhoneOutgoing } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const AgentsSection = () => {
  const { t, isRTL } = useLanguage();

  const agents = [
    {
      key: 'sofia',
      icon: MessageSquare,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      bgGlow: 'bg-green-500/20',
      data: t.agents.sofia,
      delay: 0,
    },
    {
      key: 'marcus',
      icon: Phone,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      bgGlow: 'bg-blue-500/20',
      data: t.agents.marcus,
      delay: 0.15,
    },
    {
      key: 'david',
      icon: PhoneOutgoing,
      color: 'orange',
      gradient: 'from-primary to-orange-600',
      bgGlow: 'bg-primary/20',
      data: t.agents.david,
      delay: 0.3,
    },
  ];

  return (
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
            
            return (
              <motion.div
                key={agent.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: agent.delay, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-8 rounded-2xl flex flex-col h-full transition-all duration-200"
              >
                {/* Icon Container */}
                <div className={`relative w-20 h-20 mx-auto mb-8 ${isRTL ? 'self-center' : 'self-center'}`}>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 ${agent.bgGlow} rounded-2xl blur-xl`} />
                  {/* Icon box */}
                  <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold text-foreground mb-4 text-center`}>
                  {agent.data.name}
                </h3>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {agent.data.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  variant="hero" 
                  className="w-full font-bold"
                  asChild
                >
                  <a href="#contact">
                    {agent.data.cta}
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