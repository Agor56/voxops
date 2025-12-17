import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import sofiaRobot from '@/assets/sofia-robot.png';
import marcusRobot from '@/assets/marcus-robot.png';
import davidRobot from '@/assets/david-robot.png';

const AgentsSection = () => {
  const { t, isRTL } = useLanguage();

  const agents = [
    {
      key: 'sofia',
      image: sofiaRobot,
      data: t.agents.sofia,
      delay: 0,
    },
    {
      key: 'marcus',
      image: marcusRobot,
      data: t.agents.marcus,
      delay: 0.15,
    },
    {
      key: 'david',
      image: davidRobot,
      data: t.agents.david,
      delay: 0.3,
    },
  ];

  return (
    <section id="agents" className="py-24 relative bg-muted/30">
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
          {agents.map((agent) => (
            <motion.div
              key={agent.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: agent.delay, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 8px 12px rgba(0,0,0,0.15)" }}
              className="bg-card rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-8 flex flex-col h-full transition-all duration-200"
            >
              {/* Robot Image */}
              <div className="w-full aspect-square mb-6 rounded-lg overflow-hidden bg-black">
                <img 
                  src={agent.image} 
                  alt={agent.data.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className={`text-xl font-bold text-foreground mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {agent.data.name}
              </h3>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {agent.data.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;