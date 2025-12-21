import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CalendarCheck, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import HeroParticles from './HeroParticles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for floating cards on scroll
      if (floatingCard1Ref.current) {
        gsap.to(floatingCard1Ref.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
      
      if (floatingCard2Ref.current) {
        gsap.to(floatingCard2Ref.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, heroSectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const features = [
    {
      icon: Clock,
      title: t.hero.features.lessWork.title,
      description: t.hero.features.lessWork.description,
    },
    {
      icon: CalendarCheck,
      title: t.hero.features.moreAppointments.title,
      description: t.hero.features.moreAppointments.description,
    },
    {
      icon: TrendingUp,
      title: t.hero.features.moreRevenue.title,
      description: t.hero.features.moreRevenue.description,
    },
  ];
  return <section ref={heroSectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects - Siri-like pulsating orbs */}
      <div className={`hero-glow bg-primary top-1/4 ${isRTL ? '-right-48' : '-left-48'}`} />
      <div className={`hero-glow hero-glow-secondary bg-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'}`} />
      
      {/* Floating Particles */}
      <HeroParticles />
      
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

          {/* Benefit Badges */}
          <div className={`flex flex-wrap justify-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`px-6 py-3 rounded-full border border-border/40 bg-background/5 backdrop-blur-sm flex items-center gap-3 hover:border-primary/40 transition-all duration-300 group ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <feature.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-foreground text-sm">{feature.title}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Cards with GSAP Parallax */}
        <div ref={floatingCard1Ref} className={`absolute bottom-10 ${isRTL ? 'right-10' : 'left-10'} hidden lg:block`}>
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

        <div ref={floatingCard2Ref} className={`absolute top-1/3 ${isRTL ? 'left-10' : 'right-10'} hidden lg:block`}>
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