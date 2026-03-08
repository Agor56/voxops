import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import TrustBadges from './TrustBadges';
import HeroVideo from './HeroVideo';

const ease = [0.16, 1, 0.3, 1] as const;

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref} className="font-mono">{count.toLocaleString()}{suffix}</span>;
};

const Hero = () => {
  const { t, isRTL } = useLanguage();
  
  const currentDate = new Date().toLocaleDateString('he-IL', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  const currentMonthYear = new Date().toLocaleDateString('he-IL', {
    month: 'long', year: 'numeric'
  });

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* HLS Video Background */}
      <HeroVideo />

      {/* Animated Pulsing Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: 11 }}>
        <div 
          className="absolute w-[200px] h-[200px] rounded-full blur-3xl animate-hero-glow max-sm:w-[120px] max-sm:h-[120px]"
          style={{ background: 'rgba(201,169,110,0.06)' }}
        />
        {[0, 1.33, 2.66].map((delay) => (
          <div
            key={delay}
            className="absolute w-[400px] h-[400px] rounded-full animate-hero-ring max-sm:w-[300px] max-sm:h-[300px]"
            style={{ 
              border: '1px solid rgba(201,169,110,0.15)',
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      {/* Background glow orbs */}
      <div className={`hero-glow top-1/4 ${isRTL ? '-right-48' : '-left-48'}`} />
      <div className={`hero-glow hero-glow-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'}`} />
      
      <div className="container mx-auto py-20 relative" style={{ zIndex: 20 }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.12, ease }} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display"
          >
            {t.hero.title}
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.24, ease }} 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 font-display"
            style={{ color: '#C9A96E', textShadow: '0 0 40px rgba(201,169,110,0.4)' }}
          >
            {t.hero.titleHighlight}
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.36, ease }} 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-6 font-light"
            style={{ color: 'rgba(255,255,255,0.6)', textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)' }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease }}
            className="flex justify-center mb-10"
          >
            <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: 'rgba(255,255,255,0.35)', textShadow: '0 0 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.6)' }}>
              <span className="text-xs">🎓</span>
              <span>{isRTL ? 'מאומן על מאות שיחות אמיתיות מעסקים בישראל' : 'Trained on hundreds of real calls from businesses in Israel'}</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.6, ease }} 
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
                <Phone className="w-5 h-5" style={{ color: '#C9A96E' }} />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7, delay: 0.72, ease }} 
            className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <div className="stat-card px-8 py-6 flex flex-col sm:flex-row items-center gap-6 min-w-[280px] relative overflow-hidden group cursor-pointer">
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'} ${isRTL ? 'sm:border-l sm:pl-6' : 'sm:border-r sm:pr-6'} border-[rgba(255,255,255,0.08)] relative z-10`}>
                <p className="label-micro mb-2">{t.hero.stats.appointments.label}</p>
                <p className="text-4xl font-bold text-foreground font-mono">
                  <CountUp end={1247} duration={2000} />
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{currentDate}</p>
              </div>
              
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'} relative z-10`}>
                <p className="label-micro mb-2">{t.hero.stats.betaSpots.label}</p>
                <p className="text-4xl font-bold text-foreground font-mono">
                  <CountUp end={3} duration={1500} suffix={isRTL ? ' נותרו' : ' left'} />
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{currentMonthYear}</p>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <TrustBadges />
        </div>

        {/* Floating Cards */}
        <div className={`absolute bottom-10 ${isRTL ? 'right-10' : 'left-10'} hidden lg:block`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="glass-card p-4 rounded-xl max-w-[200px] animate-float"
          >
            <div className={`flex items-center gap-3 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ background: 'rgba(201,169,110,0.15)' }}>
                <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: '#C9A96E' }} />
              </div>
              <span className="label-micro">{t.hero.floatingCards.newLead}</span>
            </div>
            <p className="text-sm font-medium">{t.hero.floatingCards.respondedIn}</p>
          </motion.div>
        </div>

        <div className={`absolute top-1/3 ${isRTL ? 'left-10' : 'right-10'} hidden lg:block`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }} 
            className="glass-card p-4 rounded-xl max-w-[200px] animate-float" 
            style={{ animationDelay: '3s' }}
          >
            <div className="text-2xl font-bold mb-1 font-mono" style={{ color: '#C9A96E' }}>+40%</div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.hero.floatingCards.noShowReduction}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
