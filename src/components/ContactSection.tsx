import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

declare global {
  interface Window {
    Cal?: any;
  }
}

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [showCalendar, setShowCalendar] = useState(false);
  const [businessType, setBusinessType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (showCalendar) {
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.head.appendChild(d.createElement("script"));
            script.src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      window.Cal("init", "callback", { origin: "https://app.cal.com" });
      window.Cal.ns.callback("inline", {
        elementOrSelector: "#my-cal-inline-callback",
        config: { layout: "month_view" },
        calLink: "vidleads/callback",
      });
      window.Cal.ns.callback("ui", { hideEventTypeDetails: false, layout: "month_view" });
    }
  }, [showCalendar]);

  const handleSubmit = () => {
    if (!businessType.trim()) {
      setError(t.contact.form.required);
      return;
    }
    const host = window.location.hostname;
    if (host === "voxops.space" || host === "www.voxops.space") {
      window.location.href = "/voxformhe";
      return;
    }
    setShowCalendar(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none`} style={{ background: 'rgba(201,169,110,0.06)' }} />
      
      <div className="container mx-auto relative z-10">
        {showCalendar ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h2 className="section-title mb-4">
                {isRTL ? 'בחרו זמן לשיחה' : 'Choose a Time to Talk'}
              </h2>
              <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isRTL ? 'בחרו את הזמן הנוח לכם לשיחת ההיכרות' : 'Select a convenient time for your discovery call'}
              </p>
            </div>
            <div className="glass-card p-4 rounded-2xl">
              <div id="my-cal-inline-callback" style={{ width: '100%', height: '600px', overflow: 'auto' }} />
            </div>
          </motion.div>
        ) : (
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? 'direction-rtl' : ''}`}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={isRTL ? 'text-right' : 'text-left'}
            >
              <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Send className="w-4 h-4" style={{ color: '#C9A96E' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.contact.badge}</span>
              </div>
              <h2 className="section-title mb-6">
                {t.contact.title} <span style={{ color: '#C9A96E' }}>{t.contact.titleHighlight}</span> {t.contact.titleEnd}
              </h2>
              <p className="text-lg mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {t.contact.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="space-y-4">
                  <label className={`text-lg font-medium block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.form.step1Question}
                  </label>
                  <input
                    value={businessType}
                    onChange={(e) => { setBusinessType(e.target.value); if (error) setError(''); }}
                    placeholder={t.contact.form.step1Placeholder}
                    className={`w-full text-lg py-3 px-4 rounded-lg outline-none transition-all duration-300 ${isRTL ? 'text-right' : 'text-left'} ${error ? 'border-red-500' : ''}`}
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {error && (
                    <p className={`text-red-500 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{error}</p>
                  )}
                </div>

                <div className={`mt-6 ${isRTL ? 'flex flex-row-reverse' : 'flex'}`}>
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleSubmit}
                    className="flex-1"
                    style={{ background: '#C9A96E', color: '#000' }}
                  >
                    {t.contact.form.continue}
                    {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
