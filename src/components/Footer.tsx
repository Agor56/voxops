import { useLanguage } from '@/i18n/LanguageContext';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t.footer.links.features, href: '#features' },
      { label: t.footer.links.pricing, href: '#pricing' },
      { label: t.footer.links.integrations, href: '#integrations' },
      { label: t.footer.links.demo, href: '#demo' },
    ],
    company: [
      { label: t.footer.links.about, href: '#about' },
      { label: t.footer.links.blog, href: '#blog' },
      { label: t.footer.links.careers, href: '#careers' },
      { label: t.footer.links.press, href: '#press' },
    ],
    support: [
      { label: t.footer.links.helpCenter, href: '#help' },
      { label: t.footer.links.contact, href: '#contact' },
      { label: t.footer.links.privacyPolicy, href: '#privacy' },
      { label: t.footer.links.terms, href: '#terms' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer 
      className="bg-background border-t border-border/50 py-16"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto">
        <div className={`grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Brand */}
          <div className={`lg:col-span-2 ${isRTL ? 'text-right' : 'text-left'}`}>
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

          {/* Product Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-4">{t.footer.product}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-4">{t.footer.support}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
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
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.termsShort}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t.footer.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
