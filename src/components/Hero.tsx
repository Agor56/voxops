import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import TrustBadges from './TrustBadges';
import Hls from 'hls.js';

// HLS Video Background component
const HlsVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      autoPlay
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        marginLeft: '200px',
        transform: 'scale(1.2)',
        transformOrigin: 'left center',
        zIndex: 0,
      }}
    />
  );
};

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

// Split text into words for stagger animation
const SplitText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
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

// Blur-in animation variant
const blurIn = (delay: number) => ({
  initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

const Hero = () => {
  const { t, isRTL } = useLanguage();

  const currentDate = new Date().toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const currentMonthYear = new Date().toLocaleDateString('he-IL', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center"
      style={{ backgroundColor: '#070612' }}
    >
      {/* HLS Video Background at z-0 */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <HlsVideo />
      </div>

      {/* Bottom gradient fade overlay at z-10 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(to top, #070612, transparent)',
          zIndex: 10,
        }}
      />

      {/* Additional overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(7,6,18,0.85) 0%, rgba(7,6,18,0.5) 50%, rgba(7,6,18,0.1) 100%)',
          zIndex: 5,
        }}
      />

      {/* Content at z-20 */}
      <div
        className={`relative w-full max-w-7xl mx-auto px-6 lg:px-12 ${isRTL ? 'text-right' : 'text-left'}`}
        style={{ zIndex: 20 }}
      >
        <div className={`max-w-2xl ${isRTL ? 'mr-0 ml-auto' : ''}`}>
          {/* Badge - blur in */}
          <motion.div {...blurIn(0)} className="mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Sparkles className="w-3 h-3 text-white/80" />
              <span className="text-sm font-medium text-white/80">
                {isRTL ? 'מאומן על מאות שיחות אמיתיות מקליניקות אסתטיקה בישראל' : 'Trained on hundreds of real calls from aesthetic clinics in Israel'}
              </span>
            </div>
          </motion.div>

          {/* Heading - split text stagger */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2] text-white mb-4 font-display">
            <SplitText text={t.hero.title} delay={0.15} />
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2] text-white mb-8">
            <SplitText
              text={t.hero.titleHighlight}
              className="italic font-serif"
              delay={0.15 + (t.hero.title.split(' ').length) * 0.08}
            />
          </h2>

          {/* Subtitle - blur in */}
          <motion.p
            {...blurIn(0.4)}
            className="text-white/80 text-lg font-normal leading-relaxed max-w-xl mb-10"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons - blur in */}
          <motion.div
            {...blurIn(0.6)}
            className={`flex flex-col sm:flex-row gap-4 mb-12 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button
              className={`rounded-full px-5 py-3 h-auto bg-white text-[#070612] font-semibold hover:bg-white/90 transition-all duration-300 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              asChild
            >
              <a href="#contact">
                {t.hero.ctaPrimary}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </Button>
            <Button
              className={`rounded-full px-8 py-3 h-auto bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30 transition-all duration-300 flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
              asChild
            >
              <a href="#agents">
                <Phone className="w-5 h-5" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            {...blurIn(0.8)}
            className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <div className="px-6 py-4 rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5 flex flex-col sm:flex-row items-center gap-6">
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'} ${isRTL ? 'sm:border-l sm:pl-6' : 'sm:border-r sm:pr-6'} border-white/10`}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1">{t.hero.stats.appointments.label}</p>
                <p className="text-3xl font-bold text-white font-mono">
                  <CountUp end={1247} duration={2000} />
                </p>
                <p className="text-xs text-white/40 mt-1">{currentDate}</p>
              </div>
              <div className={`text-center sm:text-${isRTL ? 'right' : 'left'}`}>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1">{t.hero.stats.betaSpots.label}</p>
                <p className="text-3xl font-bold text-white font-mono">
                  <CountUp end={3} duration={1500} suffix={isRTL ? ' נותרו' : ' left'} />
                </p>
                <p className="text-xs text-white/40 mt-1">{currentMonthYear}</p>
              </div>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div {...blurIn(1.0)}>
            <TrustBadges />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
