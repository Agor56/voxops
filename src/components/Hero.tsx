import { motion } from 'framer-motion';
import { ArrowRight, Bot, MessageSquare, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
const Hero = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const features = [{
    icon: Bot,
    label: t.hero.features.leadResponse
  }, {
    icon: Calendar,
    label: t.hero.features.autoScheduling
  }, {
    icon: MessageSquare,
    label: t.hero.features.whatsapp
  }];
  return <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className={`hero-glow bg-primary top-1/4 ${isRTL ? '-right-48' : '-left-48'} animate-pulse-glow`} />
      <div className={`hero-glow bg-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'} animate-pulse-glow`} style={{
      animationDelay: '1.5s'
    }} />
      
      <div className="container mx-auto py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-2 h-2 rounded-full animate-pulse bg-lime-300" />
            <span className="text-sm text-muted-foreground">{t.hero.badge}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="section-title mb-6">
            {t.hero.title}{' '}
            <span className="gradient-text glow-text">{t.hero.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#contact" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.hero.ctaPrimary}
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#agents">{t.hero.ctaSecondary}</a>
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {features.map((feature, index) => <div key={index} className={`glass-card px-5 py-3 rounded-full flex items-center gap-3 hover:border-primary/30 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{feature.label}</span>
              </div>)}
          </motion.div>
        </div>

        {/* Floating Cards */}
        <div className={`absolute bottom-10 ${isRTL ? 'right-10' : 'left-10'} hidden lg:block`}>
          <motion.div initial={{
          opacity: 0,
          x: isRTL ? 30 : -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="glass-card p-4 rounded-xl max-w-[200px] animate-float">
            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-muted-foreground">{t.hero.floatingCards.newLead}</span>
            </div>
            <p className="text-sm font-medium">{t.hero.floatingCards.respondedIn}</p>
          </motion.div>
        </div>

        <div className={`absolute top-1/3 ${isRTL ? 'left-10' : 'right-10'} hidden lg:block`}>
          <motion.div initial={{
          opacity: 0,
          x: isRTL ? -30 : 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="glass-card p-4 rounded-xl max-w-[200px] animate-float" style={{
          animationDelay: '3s'
        }}>
            <div className="text-2xl font-bold gradient-text mb-1">+40%</div>
            <p className="text-xs text-muted-foreground">{t.hero.floatingCards.noShowReduction}</p>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;