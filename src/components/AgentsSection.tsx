import { motion } from 'framer-motion';
import { Bot, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import OrAgentCard from './OrAgentCard';
import AdamAgentCard from './AdamAgentCard';

const WHATSAPP_NUMBER = '972555197834';

const AgentsSection = () => {
  const { t, isRTL } = useLanguage();

  const handleSofiaClick = () => {
    const message = isRTL 
      ? 'שלום, אשמח לשמוע עוד על סוכני ה-AI שלכם' 
      : 'Hi, I would like to learn more about your AI agents';
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

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

        {/* Sofia - WhatsApp Agent (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="glass-card-hover p-8 rounded-2xl flex flex-col lg:flex-row lg:items-center gap-8 mb-6"
        >
          <div className="flex-1">
            <div className={`w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6 ${isRTL ? 'ml-auto lg:ml-0' : ''}`}>
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-xl font-bold text-foreground mb-3 ${isRTL ? 'text-right lg:text-right' : 'text-left'}`}>
              {t.agents.sofia.name}
            </h3>
            <p className={`text-muted-foreground mb-6 ${isRTL ? 'text-right lg:text-right' : 'text-left'}`}>
              {t.agents.sofia.description}
            </p>
          </div>
          <div className="flex-1">
            <ul className="space-y-3 mb-6">
              {t.agents.sofia.features.map((feature, i) => (
                <li key={i} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant="heroGlass" className="w-full lg:w-auto group" onClick={handleSofiaClick}>
              <span className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.agents.sofia.cta}
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </span>
            </Button>
          </div>
        </motion.div>

        {/* Voice Agents Row - Eve & Adam */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Eve - Voice Inbound Agent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <OrAgentCard className="h-full" />
          </motion.div>

          {/* Adam - Outbound Sales Agent */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            <AdamAgentCard className="h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;