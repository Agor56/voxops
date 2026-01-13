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

const LogoTrack = () => (
  <div className="flex shrink-0">
    {platforms.map((platform, index) => (
      <div
        key={`${platform.name}-${index}`}
        className="flex-shrink-0 px-6 md:px-8 lg:px-10 flex items-center justify-center"
      >
        <img
          src={platform.logo}
          alt={platform.name}
          className="w-10 h-10 md:w-12 md:h-12 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        />
      </div>
    ))}
  </div>
);

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

      {/* Marquee Container - Break out of container to full viewport */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative -mx-[50vw] left-1/2 right-1/2 w-screen overflow-hidden"
      >
        {/* Seamless infinite scroll - two identical tracks side by side */}
        <div className="flex animate-marquee-infinite">
          <LogoTrack />
          <LogoTrack />
        </div>
      </motion.div>
    </div>
  );
};

export default TrustBadges;
