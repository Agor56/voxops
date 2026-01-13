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
import whatsappLogo from '@/assets/logos/whatsapp.jpeg';

const platforms = [
  { name: 'iMessage', logo: imessageLogo },
  { name: 'WhatsApp', logo: whatsappLogo },
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

  return (
    <div className="mt-16 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden">
      {/* Section Label */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em] text-center mb-8 font-medium"
      >
        {t.hero.trustBadges}
      </motion.p>

      {/* Marquee Container - Full viewport width */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative"
      >
        {/* Gradient Masks - Edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 lg:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 lg:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track - Seamless infinite loop */}
        <div className="flex animate-marquee">
          {[...platforms, ...platforms, ...platforms, ...platforms].map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="flex-shrink-0 px-5 md:px-8 lg:px-10 flex items-center justify-center"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="w-8 h-8 md:w-10 md:h-10 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TrustBadges;
