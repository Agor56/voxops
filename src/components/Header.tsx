import { useState, useEffect } from 'react';
import { Menu, X, Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.solutions, href: '#agents' },
    { label: t.nav.demo, href: '#demo' },
    { label: t.nav.results, href: '#metrics' },
    { label: t.nav.testimonials, href: '#testimonials' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className={`container mx-auto flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Logo */}
        <a href="#" className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="feature-icon">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">VidLeads</span>
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Language Toggle */}
        <div className={`hidden md:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={toggleLanguage}
            className="glass-card p-2 rounded-lg hover:border-primary/30 transition-colors flex items-center gap-2"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'en' ? 'עב' : 'EN'}</span>
          </button>
          <Button variant="hero" size="lg" asChild>
            <a href="#contact">{t.nav.bookDemo}</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-3 mx-4 rounded-xl overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={toggleLanguage}
                className="glass-card p-3 rounded-lg hover:border-primary/30 transition-colors flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'עברית' : 'English'}</span>
              </button>
              <Button variant="hero" className="w-full mt-2" asChild>
                <a href="#contact">{t.nav.bookDemo}</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
