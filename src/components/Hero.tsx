import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import HeroVideo from './HeroVideo';

const ease = [0.16, 1, 0.3, 1] as const;

const Hero = () => {
  const { isRTL } = useLanguage();

  return (
    <section className="relative min-h-[88vh] flex items-center pt-24 pb-16 overflow-hidden">
      <HeroVideo />

      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" style={{ zIndex: 11 }}>
        <div
          className="absolute w-[280px] h-[280px] rounded-full blur-3xl animate-hero-glow"
          style={{ background: 'rgba(201,169,110,0.05)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative" style={{ zIndex: 20 }}>
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="text-xs md:text-sm uppercase tracking-[0.2em] mb-6 font-medium"
            style={{ color: '#C9A96E' }}
          >
            VOXOPS // PATIENT INQUIRY RECOVERY SYSTEM
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display leading-[1.05]"
          >
            Turn patient inquiries into{' '}
            <span style={{ color: '#C9A96E', textShadow: '0 0 40px rgba(201,169,110,0.4)' }}>
              booked consults
            </span>{' '}
            in under 60 seconds.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="text-base md:text-lg max-w-[640px] mx-auto mb-6 font-light leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', textShadow: '0 0 40px rgba(0,0,0,0.9)' }}
          >
            For GLP-1, HRT/TRT &amp; peptide clinics: VoxOps responds, qualifies, and follows up automatically — without adding front-desk staff.
          </motion.p>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
            className="text-xs md:text-sm mb-10 font-light"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Custom-built around your services, pricing, FAQs, and booking flow. Live in 72 hours.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className={`flex flex-col sm:flex-row gap-3 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button
              size="xl"
              asChild
              className="group hover:opacity-90 hover:-translate-y-px transition-all duration-300"
              style={{
                background: '#C9A96E',
                color: '#000',
                boxShadow: '0 0 20px rgba(201,169,110,0.3), 0 0 50px rgba(201,169,110,0.12)',
              }}
            >
              <a href="#book-demo" className="flex items-center">
                Get a Free Lost Lead Audit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="heroGlass"
              size="xl"
              asChild
              className="flex items-center gap-2"
            >
              <a href="#how-it-works">
                <Play className="w-4 h-4" style={{ color: '#C9A96E' }} />
                Watch 3-Min Demo
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
