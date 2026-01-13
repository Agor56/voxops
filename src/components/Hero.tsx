import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Count-up animation component with GSAP
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

  return <span ref={ref} className="font-mono">{count.toLocaleString()}{suffix}</span>;
};

const Hero = () => {
  const { t, isRTL } = useLanguage();
  
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

  return (
    <section ref={heroSectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Pulsing Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {/* Central glowing orb */}
        <div 
          className="absolute w-[200px] h-[200px] rounded-full blur-3xl animate-hero-glow max-sm:w-[120px] max-sm:h-[120px]"
          style={{ background: 'hsl(var(--primary) / 0.1)' }}
        />
        
        {/* Pulsing rings */}
        <div 
          className="absolute w-[400px] h-[400px] rounded-full animate-hero-ring max-sm:w-[300px] max-sm:h-[300px]"
          style={{ 
            border: '1px solid hsl(var(--primary) / 0.2)',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full animate-hero-ring max-sm:w-[300px] max-sm:h-[300px]"
          style={{ 
            border: '1px solid hsl(var(--primary) / 0.2)',
            animationDelay: '1.33s',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full animate-hero-ring max-sm:w-[300px] max-sm:h-[300px]"
          style={{ 
            border: '1px solid hsl(var(--primary) / 0.2)',
            animationDelay: '2.66s',
          }}
        />
      </div>

      {/* Background Effects - Siri-like pulsating orbs */}
      <div className={`hero-glow top-1/4 ${isRTL ? '-right-48' : '-left-48'}`} />
      <div className={`hero-glow hero-glow-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'}`} />
      
      <div className="container mx-auto py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline with Space Grotesk */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display"
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 gradient-text glow-text font-display"
          >
            {t.hero.titleHighlight}
          </motion.h2>

          {/* Subtitle with lighter weight */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className={`flex flex-col gap-3 max-w-xl mx-auto mb-10 ${isRTL ? 'items-end' : 'items-start'}`}
          >
            {t.hero.valueProps.map((prop, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 text-sm md:text-base text-foreground/90 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>{prop}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs with new button variants */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#contact" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.hero.ctaPrimary}
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </a>
            </Button>
            <Button variant="heroGlass" size="xl" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} asChild>
              <a href="#agents">
                <Phone className="w-5 h-5" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>

          {/* Stats Cards with enhanced glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.5 }} 
            className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            {/* Appointments Saved Card - Glassmorphism style */}
            <div className="stat-card px-8 py-6 flex flex-col sm:flex-row items-center gap-6 min-w-[280px] relative overflow-hidden group cursor-pointer">
              {/* Purple spotlight on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(600px circle at 50% 50%, hsl(262 83% 58% / 0.15), transparent 40%)'
                }}
              />
              
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'} ${isRTL ? 'sm:border-l sm:pl-6' : 'sm:border-r sm:pr-6'} border-primary/20 relative z-10`}>
                <p className="label-micro mb-2">{t.hero.stats.appointments.label}</p>
                <p className="text-4xl font-bold text-foreground font-mono">
                  <CountUp end={1247} duration={2000} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{currentDate}</p>
              </div>
              
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'} relative z-10`}>
                <p className="label-micro mb-2">{t.hero.stats.betaSpots.label}</p>
                <p className="text-4xl font-bold text-foreground font-mono">
                  <CountUp end={3} duration={1500} suffix={isRTL ? ' נותרו' : ' left'} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">{currentMonthYear}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards with GSAP Parallax */}
        <div ref={floatingCard1Ref} className={`absolute bottom-10 ${isRTL ? 'right-10' : 'left-10'} hidden lg:block`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="glass-card p-4 rounded-xl max-w-[200px] animate-float"
          >
            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center relative">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              </div>
              <span className="label-micro">{t.hero.floatingCards.newLead}</span>
            </div>
            <p className="text-sm font-medium">{t.hero.floatingCards.respondedIn}</p>
          </motion.div>
        </div>

        <div ref={floatingCard2Ref} className={`absolute top-1/3 ${isRTL ? 'left-10' : 'right-10'} hidden lg:block`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }} 
            className="glass-card p-4 rounded-xl max-w-[200px] animate-float" 
            style={{ animationDelay: '3s' }}
          >
            <div className="text-2xl font-bold gradient-text mb-1 font-mono">+40%</div>
            <p className="text-xs text-muted-foreground">{t.hero.floatingCards.noShowReduction}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;