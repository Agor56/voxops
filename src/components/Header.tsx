import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import ThemeToggle from "./ThemeToggle";

const BOOKING_URL = "https://cal.com/vidleads/callback";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.solutions, href: "#features" },
    { label: t.nav.demo, href: "#agents" },
    { label: t.nav.testimonials, href: "#testimonials" },
    { label: t.nav.results, href: "#contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
        }}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className={`container mx-auto flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <a href="/" className="group">
            <span className="text-xl font-bold opacity-90 font-display transition-colors duration-300" style={{ color: '#C9A96E' }}>
              VoxOps
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              <Globe className="w-5 h-5" />
            </Button>
            <Button size="sm" asChild style={{ background: '#C9A96E', color: '#000', boxShadow: '0 0 15px rgba(201,169,110,0.25), 0 0 40px rgba(201,169,110,0.1)' }} className="hover:opacity-90 hover:shadow-[0_0_20px_rgba(201,169,110,0.4),0_0_50px_rgba(201,169,110,0.15)] hover:-translate-y-px transition-all duration-300 ease-in-out">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {t.nav.bookDemo}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-foreground">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              className="md:hidden"
            >
              <div className="container mx-auto py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} className="text-foreground py-2">
                    {item.label}
                  </a>
                ))}
                <div
                  className={`flex items-center gap-3 pt-4 ${isRTL ? "flex-row-reverse" : ""}`}
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {language === "en" ? "עברית" : "English"}
                  </Button>
                  <Button size="sm" className="flex-1" asChild style={{ background: '#C9A96E', color: '#000' }}>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                      {t.nav.bookDemo}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
