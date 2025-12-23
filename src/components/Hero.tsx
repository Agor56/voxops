import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Count-up animation component
const CountUp = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(end * easeOutQuart));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};
const Hero = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  
  // Get current date formatted in Hebrew
  const currentDate = new Date().toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  const currentMonthYear = new Date().toLocaleDateString('he-IL', {
    month: 'long',
    year: 'numeric'
  });
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
            scrub: 1
          }
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
            scrub: 1.5
          }
        });
      }
    }, heroSectionRef);
    return () => ctx.revert();
  }, []);
  return <section ref={heroSectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects - Siri-like pulsating orbs */}
      <div className={`hero-glow top-1/4 ${isRTL ? '-right-48' : '-left-48'}`} />
      <div className={`hero-glow hero-glow-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'}`} />
      
      <div className="container mx-auto py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
        }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {t.hero.title}
          </motion.h1>
          
          <motion.h2 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 gradient-text glow-text">
            {t.hero.titleHighlight}
          </motion.h2>

          {/* Subtitle */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
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
          delay: 0.4
        }} className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#contact" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.hero.ctaPrimary}
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </a>
            </Button>
            <Button variant="glass" size="xl" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} asChild>
              <a href="#agents">
                <Phone className="w-5 h-5" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            {/* Appointments Saved Card */}
            <div className="glass-card px-8 py-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 min-w-[280px] relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:border-purple-500/30">
              {/* Purple glow overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'} ${isRTL ? 'sm:border-l sm:pl-6' : 'sm:border-r sm:pr-6'} border-border/30`}>
                <p className="text-sm text-muted-foreground mb-1">{t.hero.stats.appointments.label}</p>
                <p className="text-4xl font-bold text-foreground">
                  <CountUp end={1247} duration={2000} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{currentDate}</p>
              </div>
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'}`}>
                <p className="text-sm text-muted-foreground mb-1">{t.hero.stats.betaSpots.label}</p>
                <p className="text-4xl font-bold text-foreground">
                  <CountUp end={3} duration={1500} suffix={isRTL ? ' נותרו' : ' left'} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{currentMonthYear}</p>
              </div>
            </div>
          </motion.div>
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