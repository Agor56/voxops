import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import TrustBadges from './TrustBadges';
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

// SplitText animation - each word animates independently
const SplitTextHeading = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block"
          style={{ marginInlineEnd: '0.3em' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
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
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        style={{ marginLeft: '200px', transform: 'scale(1.2)', transformOrigin: 'left' }}
      >
        <source src="https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8" type="application/x-mpegURL" />
      </video>
      
      {/* Video gradient overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 z-[5]"
        style={{ background: 'linear-gradient(to top, #070612, transparent)' }}
      />

      {/* Animated Pulsing Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: 10 }}>
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
      <div className={`hero-glow top-1/4 ${isRTL ? '-right-48' : '-left-48'}`} style={{ zIndex: 10 }} />
      <div className={`hero-glow hero-glow-secondary top-1/3 ${isRTL ? '-left-48' : '-right-48'}`} style={{ zIndex: 10 }} />
      
      <div className="container mx-auto py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline with SplitText animation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 font-display">
            <SplitTextHeading text={t.hero.title} delay={0.1} />
          </h1>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 gradient-text glow-text font-display">
            <SplitTextHeading text={t.hero.titleHighlight} delay={0.3} />
          </h2>

          {/* Subtitle with blur-in effect */}
          <motion.p 
            initial={{ opacity: 0, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, filter: 'blur(0px)' }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mb-10"
          >
            <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground/60 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="text-xs">🎓</span>
              <span>{isRTL ? 'מאומן על מאות שיחות אמיתיות מקליניקות אסתטיקה בישראל' : 'Trained on hundreds of real calls from aesthetic clinics in Israel'}</span>
            </div>
          </motion.div>

          {/* CTAs with blur-in */}
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }} 
            animate={{ opacity: 1, filter: 'blur(0px)' }} 
            transition={{ duration: 0.6, delay: 0.6 }} 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button size="xl" className="group bg-white text-[#070612] hover:bg-white/90 rounded-full shadow-[0_0_30px_hsl(0_0%_100%/0.2)] hover:shadow-[0_0_50px_hsl(0_0%_100%/0.3)] hover:scale-[1.02] transition-all duration-300" asChild>
              <a href="#contact" className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {t.hero.ctaPrimary}
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
              </a>
            </Button>
            <Button size="xl" className={`flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white rounded-full border-0 hover:bg-white/30 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`} asChild>
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
            transition={{ duration: 0.6, delay: 0.7 }} 
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

          {/* Trust Badges */}
          <TrustBadges />
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
