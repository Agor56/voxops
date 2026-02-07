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

      {/* Logos - stationary centered row with staggered pulse */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-wrap justify-center items-center gap-10"
      >
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className="logo-pulse-item w-12 h-12 flex items-center justify-center"
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <img
              src={platform.logo}
              alt={platform.name}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrustBadges;
