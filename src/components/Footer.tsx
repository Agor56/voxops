import { Activity, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
const Footer = () => {
  const {
    t,
    isRTL
  } = useLanguage();
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    product: [{
      label: t.footer.links.features,
      href: '#agents'
    }, {
      label: t.footer.links.pricing,
      href: '#'
    }, {
      label: t.footer.links.demo,
      href: '#contact'
    }, {
      label: t.footer.links.integrations,
      href: '#'
    }],
    company: [{
      label: t.footer.links.about,
      href: '#'
    }, {
      label: t.footer.links.careers,
      href: '#'
    }, {
      label: t.footer.links.blog,
      href: '#'
    }, {
      label: t.footer.links.press,
      href: '#'
    }],
    support: [{
      label: t.footer.links.helpCenter,
      href: '#'
    }, {
      label: t.footer.links.contact,
      href: '#contact'
    }, {
      label: t.footer.links.privacyPolicy,
      href: '#'
    }, {
      label: t.footer.links.terms,
      href: '#'
    }]
  };
  const socialLinks = [{
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: Instagram,
    href: '#',
    label: 'Instagram'
  }];
  return <footer className="border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className={`grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Brand */}
          <div className={`lg:col-span-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <a href="#" className={`flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <div className="feature-icon">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">VidLeads</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t.footer.description}
            </p>
            <div className={`flex gap-4 ${isRTL ? 'justify-end' : ''}`}>
              {socialLinks.map(social => <a key={social.label} href={social.href} className="glass-card p-2 rounded-lg hover:border-primary/30 transition-colors" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          {/* Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-4">{t.footer.product}</h4>
            <ul className="space-y-3">
              {footerLinks.product.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.label}>
                  
                </li>)}
            </ul>
          </div>

          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="font-semibold mb-4">{t.footer.support}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => <li key={link.label}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={`border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-sm text-muted-foreground">
            © {currentYear} VidLeads. {t.footer.copyright}
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
    </footer>;
};
export default Footer;