import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Characters for scramble effect - mix of symbols and letters
const SCRAMBLE_CHARS = 'אבגדהוזחטיכלמנסעפצקרשתABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

// Text scramble component with purple glitch effect
const TextScramble = ({ 
  text, 
  delay = 0, 
  duration = 1500,
  className = '' 
}: { 
  text: string; 
  delay?: number; 
  duration?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);
  const hasStarted = useRef(false);

  const scramble = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    
    const chars = text.split('');
    const totalChars = chars.length;
    const iterationsPerChar = 3;
    const totalIterations = totalChars * iterationsPerChar;
    const intervalTime = duration / totalIterations;
    
    let iteration = 0;
    
    const interval = setInterval(() => {
      const revealedCount = Math.floor(iteration / iterationsPerChar);
      
      const newText = chars.map((char, index) => {
        if (char === ' ') return ' ';
        if (index < revealedCount) return char;
        // Return random character for unrevealed positions
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join('');
      
      setDisplayText(newText);
      iteration++;
      
      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    const timer = setTimeout(scramble, delay);
    return () => clearTimeout(timer);
  }, [scramble, delay]);

  // Split text into characters for individual styling
  const renderText = () => {
    if (!displayText) {
      // Initial state - show scrambled placeholder
      return text.split('').map((char, i) => (
        <span 
          key={i} 
          className="text-primary inline-block"
          style={{ opacity: 0.3 }}
        >
          {char === ' ' ? '\u00A0' : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]}
        </span>
      ));
    }

    return displayText.split('').map((char, i) => {
      const isRevealed = !isScrambling || char === text[i];
      const isSpace = char === ' ';
      
      return (
        <span 
          key={i} 
          className={`inline-block transition-colors duration-100 ${
            isSpace ? '' : isRevealed ? 'text-foreground' : 'text-primary'
          }`}
          style={{
            textShadow: !isRevealed && !isSpace ? '0 0 8px hsl(262 83% 58% / 0.8)' : 'none',
          }}
        >
          {isSpace ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <span className={className}>
      {renderText()}
    </span>
  );
};

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
      {/* Background Effects - Siri-like pulsating orbs */}
      <div className={`hero-glow top-1/4 ${isRTL ? '-right-48' : '-left-48'}`} />
      <div className={`hero-glow hero-glow-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'}`} />
      
      <div className="container mx-auto py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline with Text Scramble Effect */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display"
          >
            <TextScramble text={t.hero.title} delay={300} duration={1200} />
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 font-display"
          >
            <span className="gradient-text glow-text">
              <TextScramble text={t.hero.titleHighlight} delay={600} duration={1000} />
            </span>
          </motion.h2>

          {/* Subtitle with lighter weight */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light"
          >
            {t.hero.subtitle}
          </motion.p>

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