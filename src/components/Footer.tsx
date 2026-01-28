import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Linkedin, Twitter } from 'lucide-react';
import LegalDialog from './LegalDialog';

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
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
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
              <div className={`flex gap-4 ${isRTL ? 'justify-end' : ''}`}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
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
                    <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
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
