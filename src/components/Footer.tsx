import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import LegalDialog from './LegalDialog';

// TikTok icon component (not available in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  // Only links to actual page sections
  const footerLinks = {
    navigation: [
      { label: t.nav.solutions, href: '#features' },
      { label: t.nav.demo, href: '#agents' },
      { label: t.nav.testimonials, href: '#testimonials' },
      { label: t.footer.links.contact, href: '#contact' },
      { label: t.footer.testLiveCall, href: '/calldemo', isRoute: true },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/antongoril?igsh=bmhqOXF3M2d1MnFn&utm_source=qr', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@antongoril?_r=1&_t=ZS-93S8q8lQPy5', label: 'TikTok', isCustom: true },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/antgors/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/channel/UCccOmXLiAuNSVvN1XQHmhDA?si=dmS7YB40T9iPBY85', label: 'YouTube' },
  ];

  return (
    <>
      <footer 
        className="bg-background border-t border-border/50 py-16"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="container mx-auto">
          <div className={`grid md:grid-cols-2 gap-12 mb-12 ${isRTL ? 'direction-rtl' : ''}`}>
            {/* Brand */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <a href="#" className={`mb-4 inline-block ${isRTL ? 'text-right' : ''}`}>
                <span className="text-xl font-bold">VoxOps</span>
              </a>
              <p className="text-muted-foreground mb-6 max-w-sm">
                {t.footer.description}
              </p>
              <div className={`flex items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h4 className="font-semibold mb-4">{t.nav.solutions}</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    {'isRoute' in link && link.isRoute ? (
                      <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className={`border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-sm text-muted-foreground">
              © {currentYear} VoxOps. {t.footer.copyright}
            </p>
            <div className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button 
                onClick={() => setPrivacyOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.footer.privacy}
              </button>
              <button 
                onClick={() => setTermsOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.footer.termsShort}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalDialog 
        open={privacyOpen} 
        onOpenChange={setPrivacyOpen} 
        type="privacy" 
      />
      <LegalDialog 
        open={termsOpen} 
        onOpenChange={setTermsOpen} 
        type="terms" 
      />
    </>
  );
};

export default Footer;
