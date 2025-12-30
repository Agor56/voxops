import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useEffect, useRef, useState } from 'react';

// Count-up animation for stats
const CountUp = ({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) => {
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

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const MetricsSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="metrics" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className={`absolute top-1/2 ${isRTL ? 'right-0' : 'left-0'} w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2`} />
      <div className={`absolute top-1/2 ${isRTL ? 'left-0' : 'right-0'} w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2`} />
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="label-micro">{t.metrics.badge}</span>
          </div>
          <h2 className="section-title mb-4 font-display">
            {t.metrics.title} <span className="gradient-text">{t.metrics.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {t.metrics.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid with glassmorphism cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.metrics.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card p-8 text-center group cursor-pointer relative overflow-hidden"
            >
              {/* Radial gradient spotlight on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(400px circle at 50% 50%, hsl(262 83% 58% / 0.12), transparent 40%)'
                }}
              />
              
              <div className="relative z-10">
                <div className="stat-number mb-2 font-mono">
                  <CountUp 
                    end={parseInt(stat.number.replace(/[^0-9]/g, ''))} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">{stat.label}</h3>
                <p className="text-sm text-muted-foreground font-light">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;