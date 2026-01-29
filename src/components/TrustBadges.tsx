import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

// Import logo images
import imessageLogo from '@/assets/logos/imessage.webp';
import onenoteLogo from '@/assets/logos/onenote.webp';
import notionLogo from '@/assets/logos/notion.webp';
import gmailLogo from '@/assets/logos/gmail.webp';
import obsidianLogo from '@/assets/logos/obsidian.webp';
import perplexityLogo from '@/assets/logos/perplexity.webp';
import figmaLogo from '@/assets/logos/figma.webp';
import outlookLogo from '@/assets/logos/outlook.webp';
import messengerLogo from '@/assets/logos/messenger.webp';

const platforms = [
  { name: 'iMessage', logo: imessageLogo },
  { name: 'Messenger', logo: messengerLogo },
  { name: 'OneNote', logo: onenoteLogo },
  { name: 'Notion', logo: notionLogo },
  { name: 'Gmail', logo: gmailLogo },
  { name: 'Obsidian', logo: obsidianLogo },
  { name: 'Perplexity', logo: perplexityLogo },
  { name: 'Figma', logo: figmaLogo },
  { name: 'Outlook', logo: outlookLogo },
];

const TrustBadges = () => {
  const { t } = useLanguage();
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [marqueeDistance, setMarqueeDistance] = useState(0);
  const isReady = marqueeDistance > 0;

  useEffect(() => {
    const update = () => {
      const w = firstSetRef.current?.getBoundingClientRect().width ?? 0;
      setMarqueeDistance(Math.max(0, Math.round(w)));
    };

    update();

    const ro = new ResizeObserver(update);
    if (firstSetRef.current) ro.observe(firstSetRef.current);
    window.addEventListener('resize', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const marqueeStyle = useMemo(() => {
    const style: Record<string, string> = {};
    if (isReady) style['--marquee-distance'] = `${marqueeDistance}px`;
    return style;
  }, [isReady, marqueeDistance]);

  return (
    <div className="mt-16 w-full">
      {/* Section Label */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] text-center mb-8 font-medium"
      >
        {t.hero.trustBadges}
      </motion.p>

      {/* Logo Scroll Container - Full viewport width */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="logo-scroll-container"
      >
        {/* Logo Track - contains two sets for seamless loop */}
        <div
          // Key forces a clean restart whenever the measured distance changes (initial load / resize)
          key={isReady ? marqueeDistance : 'pending'}
          className="logo-track"
          style={marqueeStyle as CSSProperties}
          data-ready={isReady ? 'true' : 'false'}
        >
          {/* First set of logos */}
          <div ref={firstSetRef} className="logo-set">
            {platforms.map((platform, index) => (
              <div key={`first-${platform.name}-${index}`} className="logo-item">
                <img src={platform.logo} alt={platform.name} />
              </div>
            ))}
          </div>

          {/* Second set of logos (duplicate for seamless loop) */}
          <div className="logo-set" aria-hidden="true">
            {platforms.map((platform, index) => (
              <div key={`second-${platform.name}-${index}`} className="logo-item">
                <img src={platform.logo} alt="" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrustBadges;
